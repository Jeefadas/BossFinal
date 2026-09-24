import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificacaoService } from '../../core/services/notificacao.service';
import { Notificacao } from '../../models/notificacao.model';

@Component({
  selector: 'app-notificacoes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <section class="page-hero"><div class="container"><div class="eyebrow">ATUALIZAÇÕES</div><h1>Notificações</h1><p>Acompanhe novas mensagens, solicitações e mudanças nos seus atendimentos.</p></div></section>
  <section class="section notification-section"><div class="container notification-wrap">
    <div class="notification-head"><div><h2>Central de notificações</h2><p>{{naoLidas}} não lida(s)</p></div><button class="btn btn-outline" *ngIf="naoLidas" (click)="marcarTodas()">Marcar todas como lidas</button></div>
    <div class="notification-list" *ngIf="items.length; else vazio">
      <button class="card notification" *ngFor="let n of items" [class.new]="!n.lida" (click)="abrir(n)">
        <span class="icon">{{n.tipo==='mensagem' ? '💬' : n.tipo==='agendamento' ? '📅' : '🔔'}}</span>
        <span class="copy"><span class="title-row"><strong>{{n.titulo}}</strong><i *ngIf="!n.lida"></i></span><span>{{n.texto}}</span><small>{{n.data | date:'dd/MM/yyyy · HH:mm'}}</small></span>
        <span class="arrow">→</span>
      </button>
    </div>
    <ng-template #vazio><div class="card empty"><span>🔔</span><h3>Tudo em dia</h3><p>Quando houver novidades, elas aparecerão aqui.</p></div></ng-template>
  </div></section>`,
  styles: [`
    .notification-section{background:#f7f8f9}.notification-wrap{max-width:820px}.notification-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.notification-head h2{color:#0d2740;margin:0 0 4px}.notification-head p{margin:0;color:#7d8793;font-size:.84rem}.notification-list{display:grid;gap:10px}.notification{width:100%;padding:16px;display:grid;grid-template-columns:44px 1fr auto;gap:13px;text-align:left;align-items:center;box-shadow:none;cursor:pointer;background:#fff}.notification.new{border-left:3px solid #b88a4a;background:#fffdf9}.icon{width:42px;height:42px;border-radius:10px;background:#f1f3f5;display:grid;place-items:center}.copy{display:flex;flex-direction:column;gap:4px;min-width:0}.title-row{display:flex;align-items:center;gap:7px}.title-row strong{color:#0d2740}.title-row i{width:7px;height:7px;border-radius:50%;background:#b88a4a}.copy>span:not(.title-row){color:#657284;font-size:.86rem}.copy small{color:#9099a4;font-size:.72rem}.arrow{color:#87919d}.empty{text-align:center;padding:58px 20px;box-shadow:none}.empty>span{font-size:2.3rem}.empty h3{color:#0d2740;margin:12px 0 5px}.empty p{color:#7d8793;margin:0}
    @media(max-width:600px){.notification-head{align-items:flex-start;flex-direction:column;gap:12px}.notification-head .btn{width:100%}.notification{grid-template-columns:40px 1fr}.arrow{display:none}}
  `]
})
export class NotificacoesComponent {
  user: any;
  items: Notificacao[] = [];
  constructor(private auth: AuthService, private service: NotificacaoService, private router: Router) {
    this.user = this.auth.currentUser();
    this.reload();
  }
  get naoLidas(): number { return this.items.filter(n => !n.lida).length; }
  abrir(n: Notificacao): void { this.service.markRead(n.id); this.reload(); if (n.link) this.router.navigateByUrl(n.link); }
  marcarTodas(): void { this.service.markAllRead(this.user.email); this.reload(); }
  private reload(): void { this.items = this.service.getFor(this.user.email); }
}
