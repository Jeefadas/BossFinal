import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector:'app-footer', standalone:true, imports:[RouterLink],
  template:`
  <footer>
    <div class="container grid">
      <div><div class="logo">⚖ JusAcesso</div><p>Conectando pessoas a profissionais do Direito de forma simples, clara e acessível.</p></div>
      <div><strong>Navegação</strong><a routerLink="/advogados">Advogados</a><a routerLink="/sobre">Sobre</a><a routerLink="/lgpd">Privacidade</a></div>
      <div><strong>Importante</strong><p>O JusAcesso facilita a busca e o contato com profissionais. A plataforma não fornece aconselhamento jurídico automático.</p></div>
    </div>
    <div class="container copy">© 2026 JusAcesso · Todos os direitos reservados.</div>
  </footer>`,
  styles:[`
    footer{background:#0b2238;color:#dbe4ed;padding:46px 0 18px;margin-top:48px}.grid{display:grid;grid-template-columns:1.4fr .7fr 1fr;gap:40px}.logo{font-family:Georgia,"Times New Roman",serif;font-size:1.2rem;font-weight:700;color:#fff}.grid p{line-height:1.65;color:#b8c5d1;font-size:.92rem}.grid a{display:block;margin-top:9px;color:#dbe4ed;font-size:.92rem}.grid strong{color:#fff}.copy{border-top:1px solid rgba(255,255,255,.12);margin-top:30px;padding-top:16px;text-align:center;color:#9fb0c1;font-size:.86rem}@media(max-width:760px){.grid{grid-template-columns:1fr}}
  `]
})
export class FooterComponent{}
