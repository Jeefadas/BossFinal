import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector:'app-perfil',standalone:true,imports:[RouterLink],
  template:`
  <section class="page-hero"><div class="container"><div class="eyebrow">MINHA CONTA</div><h1>Meu perfil</h1><p>Confira suas informações e acesse os recursos da sua conta.</p></div></section>
  <section class="section"><div class="container profile-container"><div class="card profile">
    <div class="avatar">{{iniciais}}</div>
    <div class="body"><h2>{{user?.nome}}</h2><p>{{user?.email}}</p>
      <div class="rows"><div><span>Tipo de conta</span><strong>{{user?.tipo === 'advogado' ? 'Advogado' : 'Cliente'}}</strong></div><div><span>Localização</span><strong>{{user?.cidade || 'Não informada'}}{{user?.uf ? ' - ' + user.uf : ''}}</strong></div><div><span>Privacidade</span><strong>Consentimento LGPD registrado</strong></div></div>
      <div class="actions">@if(auth.isAdvogado()){<a class="btn btn-primary" routerLink="/painel-advogado">Abrir painel do advogado</a>}<button class="btn btn-outline" (click)="auth.logout()">Sair da conta</button></div>
    </div>
  </div></div></section>`,
  styles:[`
    .profile-container{max-width:760px}.profile{padding:28px;display:grid;grid-template-columns:90px 1fr;gap:22px;box-shadow:none}.avatar{width:78px;height:78px;border-radius:10px;background:#e7ebef;color:#0d2740;display:grid;place-items:center;font-weight:900;font-size:1.2rem}.body h2{color:#0d2740;margin:0 0 5px}.body>p{color:#748092;margin:0}.rows{margin:24px 0}.rows div{display:flex;justify-content:space-between;gap:16px;padding:13px 0;border-bottom:1px solid #e7e9ec}.rows span{color:#758092}.rows strong{color:#0d2740;text-align:right}.actions{display:flex;gap:10px;flex-wrap:wrap}@media(max-width:600px){.profile{grid-template-columns:1fr}.rows div{flex-direction:column}.rows strong{text-align:left}.actions .btn{width:100%}}
  `]
})
export class PerfilComponent {
  user: any;
  constructor(public auth:AuthService){ this.user=this.auth.currentUser(); }
  get iniciais(){return this.user?.nome?.split(' ').slice(0,2).map((x:string)=>x[0]).join('').toUpperCase()||'US'}
}
