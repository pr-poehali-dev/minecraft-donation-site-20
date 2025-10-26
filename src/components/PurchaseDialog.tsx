import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  privilege: {
    name: string;
    price: string;
  };
  onConfirm: (nickname: string) => void;
}

export default function PurchaseDialog({ isOpen, onClose, privilege, onConfirm }: PurchaseDialogProps) {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      return;
    }
    
    onConfirm(nickname.trim());
    setNickname('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Покупка привилегии {privilege.name}</DialogTitle>
          <DialogDescription>
            Цена: {privilege.price}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nickname">Игровой ник</Label>
              <Input
                id="nickname"
                placeholder="Введите ваш ник в игре"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                autoFocus
                required
              />
              <p className="text-sm text-muted-foreground">
                Укажите точный ник, под которым вы играете на сервере
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={!nickname.trim()}>
              Продолжить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
