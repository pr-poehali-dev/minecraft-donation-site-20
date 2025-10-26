import json
import os
import urllib.request
from typing import Dict, Any
from mcrcon import MCRcon

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Автоматическая обработка покупок из LeadTex: выдача привилегий и уведомления в Telegram
    Args: event - dict с httpMethod, body содержащим данные о покупке
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict со статусом отправки
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
    
    nickname: str = body_data.get('nickname', body_data.get('player', 'Неизвестный'))
    privilege: str = body_data.get('privilege', body_data.get('product', 'Неизвестно'))
    amount: str = body_data.get('amount', body_data.get('price', ''))
    order_id: str = body_data.get('order_id', body_data.get('id', ''))
    
    rcon_response = ''
    grant_status = ''
    
    rcon_host = os.environ.get('MINECRAFT_RCON_HOST', '')
    rcon_port = int(os.environ.get('MINECRAFT_RCON_PORT', '25575'))
    rcon_password = os.environ.get('MINECRAFT_RCON_PASSWORD', '')
    
    if rcon_host and rcon_password and nickname != 'Неизвестный' and privilege != 'Неизвестно':
        try:
            with MCRcon(rcon_host, rcon_password, rcon_port) as mcr:
                rcon_response = mcr.command(f'lp user {nickname} parent set {privilege}')
            grant_status = '✅ Привилегия выдана автоматически'
        except Exception as e:
            grant_status = f'⚠️ Ошибка выдачи: {str(e)}'
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
    
    if bot_token and chat_id:
        message = f"🎮 <b>Новая покупка!</b>\n\n"
        message += f"👤 Игрок: <code>{nickname}</code>\n"
        message += f"💎 Привилегия: <b>{privilege}</b>\n"
        if amount:
            message += f"💰 Сумма: {amount} руб.\n"
        if order_id:
            message += f"📋 Заказ: #{order_id}\n"
        if grant_status:
            message += f"\n{grant_status}"
        if rcon_response:
            message += f"\n<code>{rcon_response}</code>"
        message += f"\n\n✅ Спасибо за поддержку сервера!"
        
        try:
            url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
            data = json.dumps({
                'chat_id': chat_id,
                'text': message,
                'parse_mode': 'HTML'
            }).encode('utf-8')
            
            req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
            urllib.request.urlopen(req)
        except:
            pass
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'nickname': nickname,
            'privilege': privilege,
            'grant_status': grant_status
        })
    }