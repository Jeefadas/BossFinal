import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MensagemService } from '../../core/services/mensagem.service';
import { NotificacaoService } from '../../core/services/notificacao.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
  <header class="topbar">
    <div class="container nav">
      <a routerLink="/" class="brand"><span class="mark">⚖</span><span>JusAcesso</span></a>
      <button class="menu" (click)="open=!open" aria-label="Abrir menu">☰</button>
      <nav [class.open]="open">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="open=false">Início</a>
        <a routerLink="/advogados" routerLinkActive="active" (click)="open=false">Advogados</a>
        <a routerLink="/sobre" routerLinkActive="active" (click)="open=false">Sobre</a>
        <a routerLink="/lgpd" routerLinkActive="active" (click)="open=false">LGPD</a>

        @if(auth.isLoggedIn()) {
          <span class="nav-separator"></span>
          <a routerLink="/mensagens" routerLinkActive="active" class="utility-link" (click)="open=false">
            <span class="utility-icon">✉</span><span class="mobile-label">Mensagens</span>
            @if(unreadMessages){<b class="badge">{{unreadMessages}}</b>}
          </a>
          <a routerLink="/agendamentos" routerLinkActive="active" class="utility-link" (click)="open=false"><span class="utility-icon">☑</span><span class="mobile-label">Agendamentos</span></a>
          @if(!auth.isAdvogado()) {
            <a routerLink="/favoritos" routerLinkActive="active" class="utility-link" (click)="open=false"><span class="utility-icon">♡</span><span class="mobile-label">Favoritos</span></a>
          }
          <a routerLink="/notificacoes" routerLinkActive="active" class="utility-link" (click)="open=false">
            <span class="utility-icon">☐</span><span class="mobile-label">Notificações</span>
            @if(unreadNotifications){<b class="badge">{{unreadNotifications}}</b>}
          </a>
          @if(auth.isAdvogado()) {
            <a routerLink="/painel-advogado" routerLinkActive="active" class="dashboard-link" (click)="open=false">Meu painel</a>
          } @else {
            <a routerLink="/perfil" class="login" (click)="open=false">Meu perfil</a>
          }
          <button class="logout" (click)="auth.logout(); open=false">Sair</button>
        } @else {
          <a routerLink="/login" class="login" (click)="open=false">Entrar</a>
          <a routerLink="/cadastro" class="join" (click)="open=false">Cadastrar</a>
        }
      </nav>
    </div>
  </header>`,
  styles: [`
    .topbar{height:70px;background:rgba(255,255,255,.97);border-bottom:1px solid #e5e7eb;position:sticky;top:0;z-index:50;backdrop-filter:blur(10px)}
    .nav{height:100%;display:flex;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:9px;font-weight:700;font-size:1.18rem;color:#0d2740}.mark{font-family:Arial,sans-serif;color:#b88a4a;font-size:1.35rem}.menu{display:none;border:0;background:none;font-size:1.55rem;color:#0d2740;cursor:pointer}
    nav{display:flex;align-items:center;gap:17px}nav a{font-family:Inter,"Segoe UI",Arial,sans-serif;font-weight:650;color:#536071;font-size:.86rem;position:relative}nav>a:not(.join):not(.dashboard-link):not(.utility-link).active::after{content:"";position:absolute;left:0;right:0;bottom:-25px;height:2px;background:#0d2740}.active{color:#0d2740!important}.login{color:#0d2740!important}.join{background:#d5ad72;color:#172435!important;padding:9px 14px;border-radius:7px}.dashboard-link{background:#0d2740;color:#fff!important;padding:9px 13px;border-radius:7px}.logout{border:1px solid #d6dbe1;background:#fff;color:#0d2740;padding:8px 11px;border-radius:7px;font-weight:700;cursor:pointer}.nav-separator{width:1px;height:24px;background:#e0e4e8}.utility-link{display:flex;align-items:center;gap:4px;min-height:34px}.utility-icon{font-size:1rem;line-height:1}.mobile-label{display:none}.badge{position:absolute;right:-9px;top:-5px;background:#b88a4a;color:#fff;min-width:17px;height:17px;padding:0 4px;border-radius:999px;display:grid;place-items:center;font-size:.6rem;border:2px solid #fff}
    @media(max-width:1050px){nav{gap:12px}.nav-separator{display:none}.utility-link{padding:6px}.dashboard-link{padding:8px 10px}}
    @media(max-width:900px){.menu{display:block}nav{display:none;position:absolute;top:70px;left:0;right:0;background:#fff;border-bottom:1px solid #e5e8ee;padding:16px 20px;flex-direction:column;align-items:stretch;gap:6px;box-shadow:0 12px 25px rgba(13,39,64,.08);max-height:calc(100vh - 70px);overflow:auto}nav.open{display:flex}nav a,.logout{padding:11px;border-radius:7px}nav>a.active::after{display:none}.join,.dashboard-link{text-align:center}.utility-link{display:flex!important;gap:9px}.mobile-label{display:inline}.badge{position:static;margin-left:auto;border:0;min-width:20px;height:20px}}
  `]
})
export class HeaderComponent {
  open = false;
  constructor(public auth: AuthService, private mensagens: MensagemService, private notificacoes: NotificacaoService) {}
  get unreadMessages(): number { const u = this.auth.currentUser(); return u ? this.mensagens.unreadCount(u.email) : 0; }
  get unreadNotifications(): number { const u = this.auth.currentUser(); return u ? this.notificacoes.unreadCount(u.email) : 0; }
}
