import json
import os
from typing import Dict, Any
import psycopg2
from mcrcon import MCRcon

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Automatically grant Minecraft privilege when payment is confirmed
    Args: event - dict with httpMethod, body containing payment_id, nickname, privilege
          context - object with request_id attribute
    Returns: HTTP response dict with privilege grant status
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Payment-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    payment_id: str = body_data.get('payment_id')
    nickname: str = body_data.get('nickname')
    privilege: str = body_data.get('privilege')
    price: str = body_data.get('price', '0₽')
    
    if not all([payment_id, nickname, privilege]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields: payment_id, nickname, privilege'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    rcon_host = os.environ.get('MINECRAFT_RCON_HOST', 'localhost')
    rcon_port = int(os.environ.get('MINECRAFT_RCON_PORT', '25575'))
    rcon_password = os.environ.get('MINECRAFT_RCON_PASSWORD', '')
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    cursor.execute(
        "SELECT id, status FROM purchases WHERE payment_id = %s",
        (payment_id,)
    )
    existing = cursor.fetchone()
    
    if existing and existing[1] == 'completed':
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Privilege already granted',
                'already_processed': True
            })
        }
    
    if not existing:
        cursor.execute(
            "INSERT INTO purchases (payment_id, nickname, privilege, price, status) VALUES (%s, %s, %s, %s, 'processing')",
            (payment_id, nickname, privilege, price)
        )
        conn.commit()
    else:
        cursor.execute(
            "UPDATE purchases SET status = 'processing' WHERE payment_id = %s",
            (payment_id,)
        )
        conn.commit()
    
    error_message = None
    success = False
    
    try:
        with MCRcon(rcon_host, rcon_password, rcon_port) as mcr:
            command = f"lp user {nickname} parent add {privilege}"
            response = mcr.command(command)
            
            broadcast_cmd = f"say §6§l[DONATE] §f{nickname} §aполучил привилегию §6{privilege}§a! Спасибо за поддержку!"
            mcr.command(broadcast_cmd)
            
            success = True
            
            cursor.execute(
                "UPDATE purchases SET status = 'completed', processed_at = CURRENT_TIMESTAMP WHERE payment_id = %s",
                (payment_id,)
            )
            conn.commit()
            
    except Exception as e:
        error_message = str(e)
        cursor.execute(
            "UPDATE purchases SET status = 'failed', error_message = %s WHERE payment_id = %s",
            (error_message, payment_id)
        )
        conn.commit()
    
    cursor.close()
    conn.close()
    
    if success:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': f'Privilege {privilege} granted to {nickname}',
                'nickname': nickname,
                'privilege': privilege
            })
        }
    else:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': error_message,
                'message': 'Failed to grant privilege'
            })
        }
