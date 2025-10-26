import json
import os
from typing import Dict, Any, List
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram bot для продажи привилегий Minecraft сервера с корзиной
    Args: event - dict с httpMethod, body
          context - объект с request_id
    Returns: HTTP response dict
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
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Bot token not configured'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    update_data = body_data.get('update', {})
    
    application = Application.builder().token(bot_token).build()
    
    application.add_handler(CommandHandler('start', start_command))
    application.add_handler(CommandHandler('shop', shop_command))
    application.add_handler(CommandHandler('cart', cart_command))
    application.add_handler(CallbackQueryHandler(handle_callback))
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'status': 'webhook_configured'})
    }

PRIVILEGES = [
    {
        'id': 'vip',
        'name': 'VIP',
        'price': 149,
        'features': ['Приватная территория 20×20', 'Цветной ник', '/hat - любой блок как шляпа']
    },
    {
        'id': 'premium',
        'name': 'PREMIUM',
        'price': 349,
        'features': ['Приватная территория 40×40', 'Радужный ник', '/hat + /fly навсегда']
    },
    {
        'id': 'legend',
        'name': 'LEGEND',
        'price': 699,
        'features': ['Приватная территория 60×60', 'Анимированный ник', 'Все возможности VIP и Premium']
    }
]

user_carts: Dict[int, List[Dict[str, Any]]] = {}

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("🛍️ Магазин привилегий", callback_data='show_shop')],
        [InlineKeyboardButton("🛒 Моя корзина", callback_data='show_cart')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        '👋 Привет! Я бот для покупки привилегий на сервере CLOY 2.0\n\n'
        '🎮 Здесь ты можешь:\n'
        '• Выбрать привилегии\n'
        '• Добавить их в корзину\n'
        '• Оплатить одним платежом\n\n'
        'Используй кнопки ниже или команды:\n'
        '/shop - открыть магазин\n'
        '/cart - посмотреть корзину',
        reply_markup=reply_markup
    )

async def shop_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = []
    for priv in PRIVILEGES:
        keyboard.append([
            InlineKeyboardButton(
                f"{priv['name']} - {priv['price']}₽",
                callback_data=f"view_{priv['id']}"
            )
        ])
    keyboard.append([InlineKeyboardButton("🛒 Корзина", callback_data='show_cart')])
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        '🛍️ *МАГАЗИН ПРИВИЛЕГИЙ*\n\n'
        'Выбери привилегию для просмотра:',
        parse_mode='Markdown',
        reply_markup=reply_markup
    )

async def cart_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    cart = user_carts.get(user_id, [])
    
    if not cart:
        keyboard = [[InlineKeyboardButton("🛍️ В магазин", callback_data='show_shop')]]
        await update.message.reply_text(
            '🛒 Корзина пуста\n\nДобавьте привилегии из магазина!',
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
        return
    
    total = sum(item['price'] for item in cart)
    items_text = '\n'.join([f"• {item['name']} - {item['price']}₽" for item in cart])
    
    keyboard = [
        [InlineKeyboardButton("✅ Оформить заказ", callback_data='checkout')],
        [InlineKeyboardButton("🗑️ Очистить корзину", callback_data='clear_cart')],
        [InlineKeyboardButton("🛍️ Продолжить покупки", callback_data='show_shop')]
    ]
    
    await update.message.reply_text(
        f'🛒 *ТВОЯ КОРЗИНА*\n\n{items_text}\n\n'
        f'💰 *Итого: {total}₽*',
        parse_mode='Markdown',
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def handle_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    
    user_id = update.effective_user.id
    data = query.data
    
    if data == 'show_shop':
        keyboard = []
        for priv in PRIVILEGES:
            keyboard.append([
                InlineKeyboardButton(
                    f"{priv['name']} - {priv['price']}₽",
                    callback_data=f"view_{priv['id']}"
                )
            ])
        keyboard.append([InlineKeyboardButton("🛒 Корзина", callback_data='show_cart')])
        
        await query.edit_message_text(
            '🛍️ *МАГАЗИН ПРИВИЛЕГИЙ*\n\n'
            'Выбери привилегию для просмотра:',
            parse_mode='Markdown',
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
    
    elif data.startswith('view_'):
        priv_id = data.replace('view_', '')
        privilege = next((p for p in PRIVILEGES if p['id'] == priv_id), None)
        
        if privilege:
            features_text = '\n'.join([f"✓ {f}" for f in privilege['features']])
            keyboard = [
                [InlineKeyboardButton("➕ Добавить в корзину", callback_data=f"add_{priv_id}")],
                [InlineKeyboardButton("◀️ Назад в магазин", callback_data='show_shop')]
            ]
            
            await query.edit_message_text(
                f"*{privilege['name']}*\n\n"
                f"💰 Цена: *{privilege['price']}₽*\n\n"
                f"📋 Что входит:\n{features_text}",
                parse_mode='Markdown',
                reply_markup=InlineKeyboardMarkup(keyboard)
            )
    
    elif data.startswith('add_'):
        priv_id = data.replace('add_', '')
        privilege = next((p for p in PRIVILEGES if p['id'] == priv_id), None)
        
        if privilege:
            if user_id not in user_carts:
                user_carts[user_id] = []
            
            if any(item['id'] == priv_id for item in user_carts[user_id]):
                await query.answer('⚠️ Эта привилегия уже в корзине!', show_alert=True)
            else:
                user_carts[user_id].append({
                    'id': privilege['id'],
                    'name': privilege['name'],
                    'price': privilege['price']
                })
                await query.answer(f'✅ {privilege["name"]} добавлен в корзину!', show_alert=True)
                
                keyboard = [
                    [InlineKeyboardButton("🛒 Перейти в корзину", callback_data='show_cart')],
                    [InlineKeyboardButton("🛍️ Продолжить покупки", callback_data='show_shop')]
                ]
                
                await query.edit_message_text(
                    f"✅ *{privilege['name']}* добавлен в корзину!\n\n"
                    f"Что дальше?",
                    parse_mode='Markdown',
                    reply_markup=InlineKeyboardMarkup(keyboard)
                )
    
    elif data == 'show_cart':
        cart = user_carts.get(user_id, [])
        
        if not cart:
            keyboard = [[InlineKeyboardButton("🛍️ В магазин", callback_data='show_shop')]]
            await query.edit_message_text(
                '🛒 Корзина пуста\n\nДобавьте привилегии из магазина!',
                reply_markup=InlineKeyboardMarkup(keyboard)
            )
            return
        
        total = sum(item['price'] for item in cart)
        items_text = '\n'.join([f"• {item['name']} - {item['price']}₽" for item in cart])
        
        keyboard = [
            [InlineKeyboardButton("✅ Оформить заказ", callback_data='checkout')],
            [InlineKeyboardButton("🗑️ Очистить корзину", callback_data='clear_cart')],
            [InlineKeyboardButton("🛍️ Продолжить покупки", callback_data='show_shop')]
        ]
        
        await query.edit_message_text(
            f'🛒 *ТВОЯ КОРЗИНА*\n\n{items_text}\n\n'
            f'💰 *Итого: {total}₽*',
            parse_mode='Markdown',
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
    
    elif data == 'clear_cart':
        user_carts[user_id] = []
        
        keyboard = [[InlineKeyboardButton("🛍️ В магазин", callback_data='show_shop')]]
        
        await query.edit_message_text(
            '🗑️ Корзина очищена!',
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
    
    elif data == 'checkout':
        cart = user_carts.get(user_id, [])
        
        if not cart:
            await query.answer('⚠️ Корзина пуста!', show_alert=True)
            return
        
        total = sum(item['price'] for item in cart)
        items_text = '\n'.join([f"• {item['name']}" for item in cart])
        
        await query.edit_message_text(
            f'📝 *ОФОРМЛЕНИЕ ЗАКАЗА*\n\n'
            f'Твой заказ:\n{items_text}\n\n'
            f'💰 К оплате: *{total}₽*\n\n'
            f'Напиши свой игровой ник в следующем сообщении:',
            parse_mode='Markdown'
        )
