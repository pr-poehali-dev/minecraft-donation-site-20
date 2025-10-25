import json
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send notification to Minecraft chat when privilege is purchased
    Args: event - dict with httpMethod, body containing nickname and privilege info
          context - object with request_id, function_name attributes
    Returns: HTTP response dict with success status
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
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
    nickname: str = body_data.get('nickname', 'Unknown')
    privilege: str = body_data.get('privilege', 'Unknown')
    
    message = f"§6§l[DONATE] §f{nickname} §aкупил привилегию §6{privilege}§a! Спасибо за поддержку сервера!"
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'message': message,
            'nickname': nickname,
            'privilege': privilege
        })
    }
