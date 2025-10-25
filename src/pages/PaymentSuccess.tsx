import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const paymentId = searchParams.get('payment_id');
  const nickname = searchParams.get('nickname');
  const privilege = searchParams.get('privilege');
  const price = searchParams.get('price');

  useEffect(() => {
    if (!paymentId || !nickname || !privilege) {
      setStatus('error');
      setMessage('Недостаточно данных для обработки платежа');
      return;
    }

    const grantPrivilege = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/864c0939-bade-4ed4-961d-cf489492d292', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment_id: paymentId,
            nickname: nickname,
            privilege: privilege,
            price: price || '0₽'
          })
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage(data.already_processed 
            ? 'Привилегия уже была выдана ранее' 
            : 'Привилегия успешно выдана! Заходи на сервер и проверяй.');
        } else {
          setStatus('error');
          setMessage(data.error || 'Не удалось выдать привилегию. Обратитесь к администрации.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Ошибка подключения. Обратитесь к администрации с номером платежа.');
      }
    };

    grantPrivilege();
  }, [paymentId, nickname, privilege, price]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Loader2" className="text-primary animate-spin" size={32} />
              </div>
              <CardTitle>Обработка платежа...</CardTitle>
              <CardDescription>Выдаём привилегию на сервере</CardDescription>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" className="text-green-500" size={32} />
              </div>
              <CardTitle>Оплата успешна!</CardTitle>
              <CardDescription>{message}</CardDescription>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
                <Icon name="XCircle" className="text-red-500" size={32} />
              </div>
              <CardTitle>Ошибка</CardTitle>
              <CardDescription>{message}</CardDescription>
            </>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {(status === 'success' || status === 'error') && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Игрок:</span>
                <span className="font-medium">{nickname}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Привилегия:</span>
                <span className="font-medium">{privilege}</span>
              </div>
              {price && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Сумма:</span>
                  <span className="font-medium">{price}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID платежа:</span>
                <span className="font-mono text-xs">{paymentId?.slice(0, 20)}...</span>
              </div>
            </div>
          )}
          
          <div className="pt-4">
            <Link to="/">
              <Button className="w-full">
                <Icon name="Home" className="mr-2" size={16} />
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccess;
