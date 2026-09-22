import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

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
    .nav{height:100%;display:flex;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:9px;font-weight:700;font-size:1.18rem;color:#0d2740}
    .mark{font-family:Arial,sans-serif;color:#b88a4a;font-size:1.35rem}.menu{display:none;border:0;background:none;font-size:1.55rem;color:#0d2740;cursor:pointer}
    nav{display:flex;align-items:center;gap:22px}nav a{font-family:Inter,"Segoe UI",Arial,sans-serif;font-weight:650;color:#536071;font-size:.9rem;position:relative}
    nav>a:not(.join):not(.dashboard-link).active::after{content:"";position:absolute;left:0;right:0;bottom:-24px;height:2px;background:#0d2740}
    .active{color:#0d2740!important}.login{color:#0d2740!important}.join{background:#d5ad72;color:#172435!important;padding:9px 14px;border-radius:7px}
    .dashboard-link{background:#0d2740;color:#fff!important;padding:9px 14px;border-radius:7px}.logout{border:1px solid #d6dbe1;background:#fff;color:#0d2740;padding:8px 12px;border-radius:7px;font-weight:700;cursor:pointer}
    @media(max-width:900px){.menu{display:block}nav{display:none;position:absolute;top:70px;left:0;right:0;background:#fff;border-bottom:1px solid #e5e8ee;padding:16px 20px;flex-direction:column;align-items:stretch;gap:6px;box-shadow:0 12px 25px rgba(13,39,64,.08)}nav.open{display:flex}nav a,.logout{padding:11px;border-radius:7px}nav>a.active::after{display:none}.join,.dashboard-link{text-align:center}}
  `]
})
export class HeaderComponent { open=false; constructor(public auth: AuthService){} }
