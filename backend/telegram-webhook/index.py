import json
import os
from typing import Dict, Any
from mcrcon import MCRcon

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обработка webhook от Telegram бота для автоматической выдачи привилегий Minecraft
    Args: event - dict с httpMethod, body, headers
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Telegram-Bot-Api-Secret-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    message = body_data.get('message', {})
    text = message.get('text', '')
    chat_id = message.get('chat', {}).get('id')
    
    if not text.startswith('/buy'):
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'ok': True})
        }
    
    try:
        parts = text.split()
        if len(parts) < 3:
            return send_telegram_message(chat_id, 'Используйте: /buy <привилегия> <ник>')
        
        privilege = parts[1].upper()
        nickname = parts[2]
        
        rcon_host = os.environ.get('MINECRAFT_RCON_HOST', '')
        rcon_port = int(os.environ.get('MINECRAFT_RCON_PORT', '25575'))
        rcon_password = os.environ.get('MINECRAFT_RCON_PASSWORD', '')
        
        with MCRcon(rcon_host, rcon_password, rcon_port) as mcr:
            response = mcr.command(f'lp user {nickname} parent set {privilege}')
        
        return send_telegram_message(
            chat_id, 
            f'✅ Привилегия {privilege} успешно выдана игроку {nickname}!\n\nОтвет сервера: {response}'
        )
        
    except Exception as e:
        return send_telegram_message(chat_id, f'❌ Ошибка: {str(e)}')

def send_telegram_message(chat_id: int, text: str) -> Dict[str, Any]:
    import urllib.request
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    
    if bot_token:
        url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        
        data = json.dumps({
            'chat_id': chat_id,
            'text': text,
            'parse_mode': 'HTML'
        }).encode('utf-8')
        
        try:
            req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
            urllib.request.urlopen(req)
        except:
            pass
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({'ok': True})
    }