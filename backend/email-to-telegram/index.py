import json
import os
import urllib.request
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Пересылка писем от LeadTex из почты в Telegram канал
    Args: event - dict с httpMethod, body содержащим данные письма
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict со статусом пересылки
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
    
    subject: str = body_data.get('subject', 'Без темы')
    from_email: str = body_data.get('from', body_data.get('sender', ''))
    text: str = body_data.get('text', body_data.get('body', ''))
    html: str = body_data.get('html', '')
    
    if 'leadtex' not in from_email.lower() and 'leadtex' not in subject.lower():
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Not from LeadTex, skipped'})
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
    
    if bot_token and chat_id:
        message = f"📧 <b>Письмо от LeadTex</b>\n\n"
        message += f"📌 Тема: <b>{subject}</b>\n"
        if from_email:
            message += f"✉️ От: <code>{from_email}</code>\n"
        message += f"\n{text[:800]}"
        if len(text) > 800:
            message += "..."
        
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
            'forwarded': True
        })
    }
