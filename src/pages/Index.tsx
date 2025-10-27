import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const teamSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeTab === 'team') {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeTab]);

  const calculateRotation = (imgElement: HTMLElement | null) => {
    if (!imgElement) return { rotateX: 0, rotateY: 0 };
    
    const rect = imgElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;
    
    const maxRotation = 25;
    const rotateY = (deltaX / window.innerWidth) * maxRotation;
    const rotateX = -(deltaY / window.innerHeight) * maxRotation;
    
    return { rotateX, rotateY };
  };

  const handleBuyClick = () => {
    window.open('https://t.me/cloy2ru_bot', '_blank');
  };

  const privileges = [
    {
      name: 'KNIGHT',
      price: '79₽',
      color: 'text-yellow-400',
      features: [
        '/fireball - стрельнуть огненным шаром',
        '/setwarp - установить варп',
        '/ec - открыть эндер сундук',
        '/itemname - переименовать предмет',
        '2 точки дома',
        '4 слота на аукционе',
        '3 привата'
      ]
    },
    {
      name: 'PRINCE',
      price: '149₽',
      color: 'text-orange-400',
      features: [
        '/feed - покормить себя',
        '/fly - летать безлимитно',
        '/lightning - ударить молнией',
        '/ci - очистить инвентарь',
        '3 точки дома',
        '6 слотов аукциона',
        '4 привата'
      ]
    },
    {
      name: 'LEGEND',
      price: '219₽',
      color: 'text-cyan-400',
      features: [
        'Всё из PRINCE',
        'Эксклюзивный префикс',
        'Кит каждые 3 часа',
        '20 точек дома',
        'Безлимитный /fly',
        'Бессмертие 3 раза в день',
        'Доступ к креативу'
      ],
      popular: true
    },
    {
      name: 'LORD',
      price: '349₽',
      color: 'text-blue-400',
      features: [
        'Всё из LEGEND',
        'Легендарный префикс',
        'Кит каждый час',
        '30 точек дома',
        'Приоритет входа на сервер',
        'Возможность создавать варпы'
      ]
    },
    {
      name: 'DELUXE',
      price: '419₽',
      color: 'text-pink-400',
      features: [
        'Всё из LORD',
        'Королевский префикс',
        'Эксклюзивный кит',
        '50 точек дома',
        'Доступ к эндер-сундуку',
        'Персональный NPC'
      ]
    },
    {
      name: 'GLAVA',
      price: '549₽',
      color: 'text-green-400',
      features: [
        'Всё из DELUXE',
        'Императорский префикс',
        'VIP поддержка',
        '100 точек дома',
        'Уникальные эффекты',
        'Доступ ко всем командам'
      ]
    }
  ];

  const news = [
    {
      date: '27.10.2025',
      title: 'Сервер обновлен до 1.18.2',
      description: 'Обновили версию сервера до 1.18.2! Новые возможности и улучшенная стабильность.'
    },
    {
      date: '15.10.2024',
      title: 'Новая система донатов',
      description: 'Теперь привилегии выдаются автоматически сразу после оплаты!'
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
              <h1 className="text-2xl font-heading font-bold">CLOUDY WORLD</h1>
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
                Магазин
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
              <button 
                onClick={() => setActiveTab('team')}
                className={`hover:text-primary transition-colors ${activeTab === 'team' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Команда
              </button>
              <button 
                onClick={() => window.location.href = '/support'}
                className="hover:text-primary transition-colors text-muted-foreground"
              >
                Поддержка
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeTab === 'home' && (
          <div className="space-y-16">
            <section className="text-center space-y-6 py-12 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-3xl blur-3xl"></div>
              <h2 className="text-5xl md:text-7xl font-heading font-black relative bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-pulse">
                ДОБРО ПОЖАЛОВАТЬ
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto relative">
                Лучший Minecraft сервер с уникальными режимами и приятным комьюнити
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <div className="flex items-center gap-3 bg-gradient-to-br from-card to-card/50 px-6 py-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/10 backdrop-blur-sm hover:shadow-primary/20 transition-all hover:scale-105">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Users" className="text-primary" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Онлайн</p>
                    <p className="text-xl font-bold text-primary">1 игрок</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-br from-card to-card/50 px-6 py-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/10 backdrop-blur-sm hover:shadow-primary/20 transition-all hover:scale-105">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Server" className="text-primary" size={24} />
                  </div>
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
                <Card className="hover:border-primary transition-all hover:scale-105 bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-lg shadow-primary/5 group">
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon name="Zap" className="text-primary" size={28} />
                    </div>
                    <CardTitle className="text-xl">Без лагов</CardTitle>
                    <CardDescription className="text-base">Мощное железо и оптимизация</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:border-primary transition-all hover:scale-105 bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-lg shadow-primary/5 group">
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon name="Shield" className="text-primary" size={28} />
                    </div>
                    <CardTitle className="text-xl">Защита</CardTitle>
                    <CardDescription className="text-base">Античит и защита от гриферов</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:border-primary transition-all hover:scale-105 bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-lg shadow-primary/5 group">
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon name="Heart" className="text-primary" size={28} />
                    </div>
                    <CardTitle className="text-xl">Комьюнити</CardTitle>
                    <CardDescription className="text-base">Дружелюбные игроки и адекватная администрация</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'donate' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-heading font-black bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">МАГАЗИН</h2>
              <p className="text-muted-foreground text-lg">
                Поддержи сервер и получи крутые возможности!
              </p>
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/50 rounded-xl p-4 max-w-2xl mx-auto shadow-lg shadow-primary/10">
                <p className="flex items-center justify-center gap-2 text-primary font-semibold">
                  <Icon name="Sparkles" size={20} className="animate-pulse" />
                  Автоматическая выдача сразу после оплаты
                  <Icon name="Sparkles" size={20} className="animate-pulse" />
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {privileges.map((privilege, index) => (
                <Card 
                  key={index}
                  className={`relative hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-primary/30 shadow-xl shadow-primary/10 hover:shadow-primary/20 group overflow-hidden ${privilege.popular ? 'border-2 border-primary shadow-2xl shadow-primary/30 md:col-span-2 lg:col-span-1 lg:row-span-1' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {privilege.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-primary to-blue-500 text-primary-foreground shadow-lg shadow-primary/50 animate-pulse">⭐ Популярный</Badge>
                    </div>
                  )}
                  <CardHeader className="relative z-10">
                    <CardTitle className={`text-3xl font-heading font-black ${privilege.color} drop-shadow-lg flex items-center gap-2`}>
                      <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-500 rounded-full"></div>
                      {privilege.name}
                    </CardTitle>
                    <CardDescription className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mt-2">
                      {privilege.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <ul className="space-y-3">
                      {privilege.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 group/item">
                          <div className="p-1 bg-primary/10 rounded-md group-hover/item:bg-primary/20 transition-colors">
                            <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                          </div>
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="relative z-10">
                    <Button 
                      className="w-full font-bold bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all" 
                      size="lg"
                      onClick={handleBuyClick}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
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
              <h2 className="text-4xl md:text-5xl font-heading font-black bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">НОВОСТИ</h2>
              <p className="text-muted-foreground mt-2">Последние обновления сервера</p>
            </div>
            
            <div className="space-y-4">
              {news.map((item, index) => (
                <Card key={index} className="hover:border-primary transition-all hover:scale-[1.01] bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-lg shadow-primary/5 group">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-primary to-blue-500 rounded-full"></div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">{item.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0 border-primary/30 bg-primary/5">
                        <Icon name="Calendar" size={14} className="mr-1 text-primary" />
                        {item.date}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-black bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">НАША КОМАНДА</h2>
              <p className="text-muted-foreground mt-2">Администраторы сервера</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:border-primary transition-all hover:scale-105 bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-xl shadow-primary/10 hover:shadow-primary/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 relative group" style={{ perspective: '1000px' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-blue-500/20 to-primary/30 rounded-xl blur-2xl group-hover:blur-3xl transition-all"></div>
                    <img 
                      ref={(el) => {
                        if (el && activeTab === 'team') {
                          const { rotateX, rotateY } = calculateRotation(el);
                          el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                        }
                      }}
                      src="https://mc-heads.net/head/sendeu/100" 
                      alt="sendeu"
                      className="w-28 h-28 rounded-xl border-4 border-primary shadow-2xl shadow-primary/50 relative z-10 pixelated transition-transform duration-100"
                      style={{ imageRendering: 'pixelated', transformStyle: 'preserve-3d' }}
                    />
                  </div>
                  <CardTitle className="text-2xl font-heading bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">sendeu</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-1 mt-2">
                    <Icon name="Shield" size={16} className="text-primary" />
                    Администратор
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="hover:border-primary transition-all hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 relative group" style={{ perspective: '1000px' }}>
                    <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                    <img 
                      ref={(el) => {
                        if (el && activeTab === 'team') {
                          const { rotateX, rotateY } = calculateRotation(el);
                          el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                        }
                      }}
                      src="https://mc-heads.net/head/fleymich/100" 
                      alt="fleymich"
                      className="w-24 h-24 rounded-lg border-4 border-primary shadow-lg shadow-primary/50 relative z-10 pixelated transition-transform duration-100"
                      style={{ imageRendering: 'pixelated', transformStyle: 'preserve-3d' }}
                    />
                  </div>
                  <CardTitle className="text-2xl font-heading">fleymich</CardTitle>
                  <CardDescription>Основатель сервера</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="hover:border-primary transition-all hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 relative group" style={{ perspective: '1000px' }}>
                    <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                    <img 
                      ref={(el) => {
                        if (el && activeTab === 'team') {
                          const { rotateX, rotateY } = calculateRotation(el);
                          el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                        }
                      }}
                      src="https://mc-heads.net/head/deffix1488/100" 
                      alt="deffix1488"
                      className="w-24 h-24 rounded-lg border-4 border-primary shadow-lg shadow-primary/50 relative z-10 pixelated transition-transform duration-100"
                      style={{ imageRendering: 'pixelated', transformStyle: 'preserve-3d' }}
                    />
                  </div>
                  <CardTitle className="text-2xl font-heading">deffix1488</CardTitle>
                  <CardDescription>Строитель</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-black bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">ПРАВИЛА</h2>
              <p className="text-muted-foreground mt-2">Соблюдай правила и играй с удовольствием</p>
            </div>
            
            <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-xl shadow-primary/10">
              <CardContent className="pt-6">
                <ul className="space-y-5">
                  {rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-4 pb-5 border-b border-primary/10 last:border-0 last:pb-0 group hover:bg-primary/5 -mx-4 px-4 py-3 rounded-lg transition-all">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-primary font-bold text-lg">{index + 1}</span>
                      </div>
                      <p className="text-foreground pt-2 leading-relaxed">{rule}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-primary/20 mt-16 py-8 bg-gradient-to-b from-transparent to-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground space-y-2">
          <p className="font-semibold">© 2024 CLOUDY WORLD. Все права защищены.</p>
          <p className="text-sm">Не является официальным продуктом Mojang</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;