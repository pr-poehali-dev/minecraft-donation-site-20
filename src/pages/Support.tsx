import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function Support() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded">
                <span className="text-2xl">⛏️</span>
              </div>
              <h1 className="text-2xl font-heading font-bold">CLOUDY WORLD</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-black">ТЕХ. ПОДДЕРЖКА</h2>
            <p className="text-muted-foreground text-lg">
              Нужна помощь? Мы всегда на связи!
            </p>
          </div>

          <Card className="border-primary/50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Info" className="text-primary" size={24} />
                </div>
                <CardTitle className="text-2xl">Информация о сервере</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-border">
                <Icon name="Server" className="text-primary" size={24} />
                <div>
                  <p className="text-sm text-muted-foreground">IP адрес</p>
                  <p className="text-lg font-bold">tcp.cloudpub.ru:47378</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-border">
                <Icon name="Package" className="text-primary" size={24} />
                <div>
                  <p className="text-sm text-muted-foreground">Версия Minecraft</p>
                  <p className="text-lg font-bold">1.18.2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-all hover:scale-105 max-w-md mx-auto">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="MessageCircle" className="text-primary" size={24} />
              </div>
              <CardTitle>Telegram</CardTitle>
              <CardDescription>Свяжитесь с нами в Telegram для быстрой помощи</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => window.open('https://t.me/cloudy_support', '_blank')}
              >
                <Icon name="Send" size={16} className="mr-2" />
                Написать в Telegram
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="HelpCircle" className="text-primary" size={24} />
                </div>
                <CardTitle className="text-2xl">Частые вопросы</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Icon name="ChevronRight" className="text-primary" size={16} />
                  Как зайти на сервер?
                </h4>
                <p className="text-muted-foreground ml-6">
                  Скачайте Minecraft версии 1.18.2 и подключитесь к серверу tcp.cloudpub.ru:47378
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Icon name="ChevronRight" className="text-primary" size={16} />
                  Как купить привилегию?
                </h4>
                <p className="text-muted-foreground ml-6">
                  Перейдите в раздел "Магазин" на главной странице и выберите нужную привилегию. После оплаты привилегия выдается автоматически.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Icon name="ChevronRight" className="text-primary" size={16} />
                  Что делать если меня забанили?
                </h4>
                <p className="text-muted-foreground ml-6">
                  Свяжитесь с администрацией через Telegram и опишите ситуацию. Мы рассмотрим вашу жалобу.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Icon name="ChevronRight" className="text-primary" size={16} />
                  Можно ли вернуть деньги за привилегию?
                </h4>
                <p className="text-muted-foreground ml-6">
                  Да, но вещи из привилегии и другие полученные бонусы мы забираем. Свяжитесь с поддержкой для оформления возврата.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Icon name="Clock" className="text-primary mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2">Время работы поддержки</h3>
            <p className="text-muted-foreground">
              Мы отвечаем на обращения ежедневно с 10:00 до 21:00 по МСК
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Support;