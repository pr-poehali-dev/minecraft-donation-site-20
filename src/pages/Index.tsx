import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function Index() {
  const [activeTab, setActiveTab] = useState('home');

  const privileges = [
    {
      name: 'KNIGHT',
      price: '79₽',
      color: 'text-slate-400',
      features: [
        'Цветной ник',
        'Приватный варп',
        'Кит каждые 12 часов',
        '5 точек дома',
        'Доступ к /fly на 30 минут'
      ]
    },
    {
      name: 'PRINCE',
      price: '149₽',
      color: 'text-purple-400',
      features: [
        'Всё из KNIGHT',
        'Уникальный префикс',
        'Кит каждые 6 часов',
        '10 точек дома',
        'Доступ к /fly на 1 час',
        'Бессмертие 1 раз в день'
      ],
      popular: true
    },
    {
      name: 'LEGEND',
      price: '219₽',
      color: 'text-primary',
      features: [
        'Всё из PRINCE',
        'Эксклюзивный префикс',
        'Кит каждые 3 часа',
        '20 точек дома',
        'Безлимитный /fly',
        'Бессмертие 3 раза в день',
        'Доступ к креативу'
      ]
    }
  ];

  const news = [
    {
      date: '20.10.2024',
      title: 'Обновление сервера до 1.20.2',
      description: 'Добавлены новые биомы и мобы! Ждём всех на сервере.'
    },
    {
      date: '15.10.2024',
      title: 'Новая система донатов',
      description: 'Теперь привилегии выдаются автоматически сразу после оплаты!'
    },
    {
      date: '10.10.2024',
      title: 'Хэллоуин ивент',
      description: 'С 25 октября стартует хэллоуинское событие с уникальными наградами!'
    }
  ];

  const rules = [
    'Запрещен читерский софт и любые модификации, дающие преимущество',
    'Уважайте других игроков, запрещены оскорбления и токсичное поведение',
    'Запрещен гриф чужих построек без разрешения владельца',
    'Нельзя использовать баги и дюпы для получения преимущества',
    'Запрещена реклама других серверов',
    'Запрещен спам в чате и флуд',
    'Администрация имеет право изменять правила без предупреждения'
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded">
                <span className="text-2xl">⛏️</span>
              </div>
              <h1 className="text-2xl font-heading font-bold">CRAFTMINE</h1>
            </div>
            <div className="hidden md:flex gap-6">
              <button 
                onClick={() => setActiveTab('home')}
                className={`hover:text-primary transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveTab('donate')}
                className={`hover:text-primary transition-colors ${activeTab === 'donate' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Привилегии
              </button>
              <button 
                onClick={() => setActiveTab('rules')}
                className={`hover:text-primary transition-colors ${activeTab === 'rules' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Правила
              </button>
              <button 
                onClick={() => setActiveTab('news')}
                className={`hover:text-primary transition-colors ${activeTab === 'news' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Новости
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeTab === 'home' && (
          <div className="space-y-16">
            <section className="text-center space-y-6 py-12">
              <h2 className="text-5xl md:text-7xl font-heading font-black">
                ДОБРО ПОЖАЛОВАТЬ
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Лучший Minecraft сервер с уникальными режимами и приятным комьюнити
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-lg border border-border">
                  <Icon name="Users" className="text-primary" size={24} />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Онлайн</p>
                    <p className="text-xl font-bold">247 игроков</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-lg border border-border">
                  <Icon name="Server" className="text-primary" size={24} />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">IP сервера</p>
                    <p className="text-xl font-bold">tcp.cloudpub.ru:47378</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-heading font-bold mb-2">ПОЧЕМУ МЫ?</h3>
                <p className="text-muted-foreground">Преимущества нашего сервера</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:border-primary transition-all hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Zap" className="text-primary" size={24} />
                    </div>
                    <CardTitle>Без лагов</CardTitle>
                    <CardDescription>Мощное железо и оптимизация</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:border-primary transition-all hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Shield" className="text-primary" size={24} />
                    </div>
                    <CardTitle>Защита</CardTitle>
                    <CardDescription>Античит и защита от гриферов</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:border-primary transition-all hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Heart" className="text-primary" size={24} />
                    </div>
                    <CardTitle>Комьюнити</CardTitle>
                    <CardDescription>Дружелюбные игроки и адекватная администрация</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'donate' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-heading font-black">ПРИВИЛЕГИИ</h2>
              <p className="text-muted-foreground text-lg">
                Поддержи сервер и получи крутые возможности!
              </p>
              <div className="bg-card border border-primary/50 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="flex items-center justify-center gap-2 text-primary font-semibold">
                  <Icon name="Sparkles" size={20} />
                  Автоматическая выдача сразу после оплаты
                  <Icon name="Sparkles" size={20} />
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {privileges.map((privilege, index) => (
                <Card 
                  key={index}
                  className={`relative hover:scale-105 transition-all ${privilege.popular ? 'border-primary shadow-lg shadow-primary/20' : ''}`}
                >
                  {privilege.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Популярный</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className={`text-3xl font-heading font-black ${privilege.color}`}>
                      {privilege.name}
                    </CardTitle>
                    <CardDescription className="text-4xl font-bold text-foreground mt-2">
                      {privilege.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {privilege.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg">
                      Купить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-black">НОВОСТИ</h2>
              <p className="text-muted-foreground mt-2">Последние обновления сервера</p>
            </div>
            
            <div className="space-y-4">
              {news.map((item, index) => (
                <Card key={index} className="hover:border-primary transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        {item.date}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-black">ПРАВИЛА</h2>
              <p className="text-muted-foreground mt-2">Соблюдай правила и играй с удовольствием</p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-bold">{index + 1}</span>
                      </div>
                      <p className="text-foreground pt-1">{rule}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 CRAFTMINE. Все права защищены.</p>
          <p className="text-sm mt-2">Не является официальным продуктом Mojang</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;