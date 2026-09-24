import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MensagemService } from '../../core/services/mensagem.service';
import { AdvogadoService } from '../../core/services/advogado.service';
import { ConversaResumo, Mensagem } from '../../models/mensagem.model';

@Component({
  selector: 'app-mensagens',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <section class="page-hero compact"><div class="container"><div class="eyebrow">CONVERSAS</div><h1>Mensagens</h1><p>Converse pela própria plataforma e combine os próximos passos do atendimento.</p></div></section>
  <section class="messages-section"><div class="container chat-shell card">
    <aside class="conversation-list" [class.hide-mobile]="selectedEmail">
      <div class="list-head"><div><strong>Conversas</strong><span>{{conversas.length}} contato(s)</span></div><span class="unread" *ngIf="totalNaoLidas">{{totalNaoLidas}}</span></div>
      <div class="conversation-scroll">
        <button class="conversation" *ngFor="let c of conversas" [class.active]="c.participanteEmail===selectedEmail" (click)="select(c.participanteEmail)">
          <span class="avatar">{{iniciais(c.participanteNome)}}</span>
          <span class="conversation-copy">
            <span class="name-row"><strong>{{c.participanteNome}}</strong><small>{{c.ultimaData | date:'HH:mm'}}</small></span>
            <span class="last-row"><span>{{c.ultimaMensagem}}</span><b *ngIf="c.naoLidas">{{c.naoLidas}}</b></span>
          </span>
        </button>
        <div class="empty-list" *ngIf="!conversas.length">
          <span>💬</span><strong>Nenhuma conversa ainda</strong>
          <p *ngIf="user.tipo==='cliente'">Abra o perfil de um advogado e clique em “Conversar”.</p>
          <p *ngIf="user.tipo==='advogado'">Novos clientes interessados aparecerão aqui.</p>
          <a *ngIf="user.tipo==='cliente'" class="btn btn-outline" routerLink="/advogados">Encontrar advogado</a>
        </div>
      </div>
    </aside>

    <main class="chat" *ngIf="selectedEmail; else noChat">
      <header class="chat-head">
        <button class="back-mobile" (click)="selectedEmail=''; mensagens=[]">←</button>
        <span class="avatar">{{iniciais(selectedName)}}</span>
        <div><strong>{{selectedName}}</strong><span>{{selectedSubtitle}}</span></div>
        <a *ngIf="selectedAdvogadoId" class="profile-link" [routerLink]="['/advogado', selectedAdvogadoId]">Ver perfil</a>
      </header>

      <div class="messages" #messageArea>
        <div class="day-label">Conversa pelo JusAcesso</div>
        <div class="bubble-row" *ngFor="let m of mensagens" [class.mine]="isMine(m)">
          <div class="bubble">
            <p>{{m.texto}}</p>
            <small>{{m.data | date:'dd/MM · HH:mm'}} <span *ngIf="isMine(m)">{{m.lida ? '✓✓' : '✓'}}</span></small>
          </div>
        </div>
        <div class="empty-chat" *ngIf="!mensagens.length">Envie uma mensagem para iniciar a conversa.</div>
      </div>

      <div class="chat-actions" *ngIf="user.tipo==='cliente' && selectedAdvogadoId">
        <a class="schedule-shortcut" [routerLink]="['/agendamentos']" [queryParams]="{advogado:selectedAdvogadoId}">📅 Solicitar agendamento</a>
      </div>
      <form class="composer" (ngSubmit)="send()">
        <textarea name="texto" [(ngModel)]="texto" maxlength="600" rows="1" placeholder="Digite sua mensagem..." (keydown.enter)="onEnter($event)"></textarea>
        <button class="send" type="submit" [disabled]="!texto.trim()" aria-label="Enviar mensagem">➤</button>
      </form>
    </main>

    <ng-template #noChat>
      <main class="no-chat">
        <div><span>⚖</span><h2>Selecione uma conversa</h2><p>Suas mensagens ficam organizadas aqui.</p></div>
      </main>
    </ng-template>
  </div></section>`,
  styles: [`
    .compact{padding:36px 0}.messages-section{padding:28px 0 60px;background:#f5f6f7;min-height:650px}.chat-shell{height:650px;display:grid;grid-template-columns:330px 1fr;overflow:hidden;box-shadow:none}.conversation-list{border-right:1px solid #e3e6ea;background:#fff;min-width:0}.list-head{height:76px;padding:18px 20px;border-bottom:1px solid #e6e8eb;display:flex;justify-content:space-between;align-items:center}.list-head>div{display:flex;flex-direction:column;gap:4px}.list-head strong{color:#0d2740;font-size:1.04rem}.list-head span{color:#7b8694;font-size:.78rem}.unread{background:#0d2740!important;color:#fff!important;min-width:24px;height:24px;border-radius:99px;display:grid;place-items:center;font-weight:800}.conversation-scroll{height:calc(100% - 76px);overflow:auto}.conversation{width:100%;border:0;border-bottom:1px solid #edf0f2;background:#fff;padding:14px 16px;display:grid;grid-template-columns:46px 1fr;gap:12px;text-align:left;cursor:pointer}.conversation:hover,.conversation.active{background:#f5f7f9}.avatar{width:44px;height:44px;border-radius:10px;background:#e8edf1;color:#0d2740;display:grid;place-items:center;font-weight:900;flex:0 0 auto}.conversation-copy{min-width:0;display:flex;flex-direction:column;gap:5px}.name-row,.last-row{display:flex;align-items:center;justify-content:space-between;gap:10px;min-width:0}.name-row strong{color:#0d2740;font-size:.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.name-row small{color:#8993a0;font-size:.7rem}.last-row>span{font-size:.78rem;color:#75808f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.last-row b{background:#b88a4a;color:#fff;border-radius:99px;font-size:.68rem;min-width:20px;height:20px;display:grid;place-items:center}.empty-list{text-align:center;padding:50px 24px;color:#7b8694}.empty-list>span{font-size:2rem}.empty-list strong{display:block;color:#0d2740;margin:12px 0 6px}.empty-list p{font-size:.85rem;line-height:1.5}.empty-list .btn{margin-top:10px}.chat{display:grid;grid-template-rows:76px 1fr auto auto;min-width:0;background:#f8f9fa}.chat-head{background:#fff;border-bottom:1px solid #e5e8eb;padding:14px 20px;display:flex;gap:12px;align-items:center}.chat-head>div{display:flex;flex-direction:column;gap:4px;min-width:0}.chat-head strong{color:#0d2740}.chat-head span{color:#7b8694;font-size:.78rem}.profile-link{margin-left:auto;font-size:.8rem;font-weight:800;color:#0d2740}.back-mobile{display:none;border:0;background:none;font-size:1.2rem;color:#0d2740}.messages{padding:22px;overflow:auto;background:linear-gradient(#f6f7f8,#f8f9fa)}.day-label{text-align:center;font-size:.72rem;color:#8993a0;margin:2px 0 18px}.bubble-row{display:flex;margin:8px 0}.bubble-row.mine{justify-content:flex-end}.bubble{max-width:min(72%,560px);padding:10px 12px;border-radius:13px 13px 13px 4px;background:#fff;border:1px solid #e1e5e9;box-shadow:0 2px 6px rgba(13,39,64,.04)}.mine .bubble{background:#0d2740;color:#fff;border-color:#0d2740;border-radius:13px 13px 4px 13px}.bubble p{margin:0 0 6px;line-height:1.48;white-space:pre-wrap;word-break:break-word;font-size:.9rem}.bubble small{display:block;text-align:right;color:#87919e;font-size:.68rem}.mine .bubble small{color:#bfcbd5}.empty-chat{text-align:center;color:#87919e;margin-top:90px}.chat-actions{padding:0 18px 8px;background:#fff}.schedule-shortcut{display:inline-flex;background:#f3eadc;color:#795725;padding:7px 11px;border-radius:999px;font-size:.76rem;font-weight:800}.composer{padding:12px 16px 16px;background:#fff;border-top:1px solid #e5e8eb;display:grid;grid-template-columns:1fr 44px;gap:10px;align-items:end}.composer textarea{resize:none;min-height:44px;max-height:110px}.send{height:44px;width:44px;border:0;border-radius:9px;background:#0d2740;color:#fff;font-size:1rem;cursor:pointer}.send:disabled{opacity:.45}.no-chat{display:grid;place-items:center;background:#f8f9fa;color:#7a8695;text-align:center}.no-chat span{font-size:3rem;color:#b88a4a}.no-chat h2{color:#0d2740;margin:14px 0 6px}.no-chat p{margin:0}
    @media(max-width:760px){.messages-section{padding:0}.container.chat-shell{width:100%;border-radius:0;border-left:0;border-right:0;height:calc(100vh - 70px);min-height:620px;grid-template-columns:1fr}.conversation-list{border-right:0}.conversation-list.hide-mobile{display:none}.chat{grid-column:1}.no-chat{display:none}.back-mobile{display:block}.bubble{max-width:85%}.page-hero{display:none}}
  `]
})
export class MensagensComponent {
  user: any;
  conversas: ConversaResumo[] = [];
  mensagens: Mensagem[] = [];
  selectedEmail = '';
  selectedName = '';
  selectedSubtitle = '';
  selectedAdvogadoId?: number;
  texto = '';

  constructor(
    public auth: AuthService,
    private service: MensagemService,
    private advogados: AdvogadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = this.auth.currentUser();
    this.reloadConversations();
    const com = this.route.snapshot.queryParamMap.get('com');
    if (com && com.toLowerCase() !== this.user.email.toLowerCase()) this.select(com);
    else if (this.conversas.length && window.innerWidth > 760) this.select(this.conversas[0].participanteEmail, false);
  }

  get totalNaoLidas(): number { return this.service.unreadCount(this.user.email); }

  select(email: string, updateUrl = true): void {
    this.selectedEmail = email;
    this.selectedName = this.service.displayName(email);
    const adv = this.advogados.getByEmail(email);
    this.selectedAdvogadoId = adv?.id;
    this.selectedSubtitle = adv ? `${adv.especialidade} · ${adv.cidade} - ${adv.uf}` : 'Cliente JusAcesso';
    this.service.markConversationRead(this.user.email, email);
    this.mensagens = this.service.getConversation(this.user.email, email);
    this.reloadConversations();
    if (updateUrl) this.router.navigate([], { relativeTo: this.route, queryParams: { com: email }, replaceUrl: true });
    setTimeout(() => this.scrollBottom(), 0);
  }

  send(): void {
    if (!this.selectedEmail || !this.texto.trim()) return;
    const msg = this.service.send(this.user.email, this.selectedEmail, this.texto);
    if (!msg) return;
    this.texto = '';
    this.mensagens = this.service.getConversation(this.user.email, this.selectedEmail);
    this.reloadConversations();
    setTimeout(() => this.scrollBottom(), 0);
  }

  onEnter(event: Event): void {
    const e = event as KeyboardEvent;
    if (!e.shiftKey) {
      e.preventDefault();
      this.send();
    }
  }

  isMine(m: Mensagem): boolean { return m.remetenteEmail.toLowerCase() === this.user.email.toLowerCase(); }
  iniciais(nome: string): string { return nome.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase() || 'US'; }

  private reloadConversations(): void { this.conversas = this.service.getConversations(this.user.email); }
  private scrollBottom(): void {
    const el = document.querySelector('.messages');
    if (el) el.scrollTop = el.scrollHeight;
  }
}
