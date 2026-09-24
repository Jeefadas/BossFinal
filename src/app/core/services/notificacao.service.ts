import { Injectable } from '@angular/core';
import { Notificacao, TipoNotificacao } from '../../models/notificacao.model';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
  private readonly key = 'jusacesso_notificacoes';

  getAll(): Notificacao[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getFor(email: string): Notificacao[] {
    return this.getAll()
      .filter(n => n.usuarioEmail.toLowerCase() === email.toLowerCase())
      .sort((a, b) => b.data.localeCompare(a.data));
  }

  unreadCount(email: string): number {
    return this.getFor(email).filter(n => !n.lida).length;
  }

  add(usuarioEmail: string, tipo: TipoNotificacao, titulo: string, texto: string, link?: string): Notificacao {
    const items = this.getAll();
    const item: Notificacao = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      usuarioEmail,
      tipo,
      titulo,
      texto,
      data: new Date().toISOString(),
      lida: false,
      link
    };
    items.push(item);
    localStorage.setItem(this.key, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('jusacesso-notifications-changed'));
    return item;
  }

  markRead(id: number): void {
    const items = this.getAll();
    const i = items.findIndex(n => n.id === id);
    if (i >= 0) {
      items[i].lida = true;
      localStorage.setItem(this.key, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('jusacesso-notifications-changed'));
    }
  }

  markAllRead(email: string): void {
    const items = this.getAll().map(n => n.usuarioEmail.toLowerCase() === email.toLowerCase() ? { ...n, lida: true } : n);
    localStorage.setItem(this.key, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('jusacesso-notifications-changed'));
  }
}
