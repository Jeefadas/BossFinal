import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MensagemService } from '../../core/services/mensagem.service';
import { NotificacaoService } from '../../core/services/notificacao.service';
import { FavoritoService } from '../../core/services/favorito.service';

@Component({
  selector:'app-perfil',standalone:true,imports:[RouterLink],
  template:`
  <section class="page-hero"><div class="container"><div class="eyebrow">MINHA CONTA</div><h1>Meu perfil</h1><p>Confira suas informações e acesse os recursos da sua conta.</p></div></section>
  <section class="section"><div class="container profile-container">
    <div class="quick-grid">
      <a class="card quick" routerLink="/mensagens"><span>💬</span><div><strong>Mensagens</strong><small>{{mensagensNaoLidas ? mensagensNaoLidas + ' nova(s)' : 'Conversas com advogados'}}</small></div>@if(mensagensNaoLidas){<b>{{mensagensNaoLidas}}</b>}</a>
      <a class="card quick" routerLink="/agendamentos"><span>📅</span><div><strong>Agendamentos</strong><small>Acompanhe seus atendimentos</small></div></a>
      <a class="card quick" routerLink="/favoritos"><span>♡</span><div><strong>Favoritos</strong><small>{{favoritosCount}} profissional(is) salvo(s)</small></div></a>
      <a class="card quick" routerLink="/notificacoes"><span>🔔</span><div><strong>Notificações</strong><small>{{notificacoesNaoLidas ? notificacoesNaoLidas + ' não lida(s)' : 'Tudo em dia'}}</small></div>@if(notificacoesNaoLidas){<b>{{notificacoesNaoLidas}}</b>}</a>
    </div>
    <div class="card profile">
      <div class="avatar">{{iniciais}}</div>
      <div class="body"><h2>{{user?.nome}}</h2><p>{{user?.email}}</p>
        <div class="rows"><div><span>Tipo de conta</span><strong>{{user?.tipo === 'advogado' ? 'Advogado' : 'Cliente'}}</strong></div><div><span>Localização</span><strong>{{user?.cidade || 'Não informada'}}{{user?.uf ? ' - ' + user.uf : ''}}</strong></div><div><span>Privacidade</span><strong>Consentimento LGPD registrado</strong></div></div>
        <div class="actions">@if(auth.isAdvogado()){<a class="btn btn-primary" routerLink="/painel-advogado">Abrir painel do advogado</a>}<a class="btn btn-outline" routerLink="/advogados">Encontrar advogados</a><button class="btn btn-outline" (click)="auth.logout()">Sair da conta</button></div>
      </div>
    </div>
  </div></section>`,
  styles:[`
    .profile-container{max-width:900px}.quick-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}.quick{padding:16px;display:grid;grid-template-columns:42px 1fr auto;gap:11px;align-items:center;box-shadow:none}.quick>span{width:40px;height:40px;border-radius:9px;background:#f2eee7;display:grid;place-items:center}.quick>div{display:flex;flex-direction:column;gap:3px}.quick strong{color:#0d2740}.quick small{color:#788492}.quick b{background:#b88a4a;color:#fff;border-radius:99px;min-width:22px;height:22px;display:grid;place-items:center;font-size:.7rem}.profile{padding:28px;display:grid;grid-template-columns:90px 1fr;gap:22px;box-shadow:none}.avatar{width:78px;height:78px;border-radius:10px;background:#e7ebef;color:#0d2740;display:grid;place-items:center;font-weight:900;font-size:1.2rem}.body h2{color:#0d2740;margin:0 0 5px}.body>p{color:#748092;margin:0}.rows{margin:24px 0}.rows div{display:flex;justify-content:space-between;gap:16px;padding:13px 0;border-bottom:1px solid #e7e9ec}.rows span{color:#758092}.rows strong{color:#0d2740;text-align:right}.actions{display:flex;gap:10px;flex-wrap:wrap}
    @media(max-width:700px){.quick-grid{grid-template-columns:1fr}.profile{grid-template-columns:1fr}.rows div{flex-direction:column}.rows strong{text-align:left}.actions .btn{width:100%}}
  `]
})
export class PerfilComponent {
  user: any;
  constructor(public auth:AuthService, private mensagens:MensagemService, private notificacoes:NotificacaoService, private favoritos:FavoritoService){ this.user=this.auth.currentUser(); }
  get iniciais(){return this.user?.nome?.split(' ').slice(0,2).map((x:string)=>x[0]).join('').toUpperCase()||'US'}
  get mensagensNaoLidas(){return this.user ? this.mensagens.unreadCount(this.user.email) : 0}
  get notificacoesNaoLidas(){return this.user ? this.notificacoes.unreadCount(this.user.email) : 0}
  get favoritosCount(){return this.user ? this.favoritos.getIds(this.user.email).length : 0}
}
