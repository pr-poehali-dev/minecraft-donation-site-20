import json
import os
import urllib.request
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка уведомлений о покупках из LeadTex в Telegram канал
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
        message += f"\n✅ Спасибо за поддержку сервера!"
        
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
            'privilege': privilege
        })
    }
