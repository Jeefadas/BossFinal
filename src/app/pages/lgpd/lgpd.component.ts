import { Component } from '@angular/core';
@Component({
  selector:'app-lgpd',standalone:true,
  template:`
  <section class="page-hero"><div class="container"><div class="eyebrow">PRIVACIDADE</div><h1>Política de Privacidade (LGPD)</h1><p>Transparência sobre quais dados são utilizados e como esta versão da plataforma funciona.</p></div></section>
  <section class="section"><div class="container legal">
    <article class="card"><span>01</span><div><h2>Quais dados são utilizados?</h2><p>Nome, e-mail, cidade, tipo de conta e, para advogados, informações profissionais como OAB, áreas de atuação, qualificações e contato.</p></div></article>
    <article class="card"><span>02</span><div><h2>Por que esses dados são utilizados?</h2><p>Para permitir cadastro, login, personalização dos perfis, busca de profissionais e funcionamento das funcionalidades da plataforma.</p></div></article>
    <article class="card"><span>03</span><div><h2>Onde os dados ficam armazenados?</h2><p>Nesta versão, os dados são armazenados somente no <strong>localStorage</strong> do navegador. Não há envio para API ou servidor externo.</p></div></article>
    <article class="card"><span>04</span><div><h2>Seus direitos</h2><p>O usuário deve ter transparência sobre o uso de seus dados e, em uma aplicação completa, acesso a mecanismos para consulta, correção e exclusão.</p></div></article>
  </div></section>`,
  styles:[`
    .legal{max-width:900px;display:grid;gap:12px}.legal article{padding:22px;display:grid;grid-template-columns:50px 1fr;gap:16px;box-shadow:none}.legal>article>span{width:42px;height:42px;border-radius:50%;background:#f0e5d5;color:#7f5d2f;display:grid;place-items:center;font-weight:900}.legal h2{font-family:Inter,"Segoe UI",Arial,sans-serif;color:#0d2740;font-size:1.05rem;margin:2px 0 8px}.legal p{color:#687487;line-height:1.7;margin:0}@media(max-width:520px){.legal article{grid-template-columns:1fr}}
  `]
})
export class LgpdComponent{}
