import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector:'app-sobre', standalone:true, imports:[RouterLink],
  template:`
  <section class="about-hero">
    <div class="container about-grid">
      <div>
        <div class="eyebrow">SOBRE O JUSACESSO</div>
        <h1>Conectando pessoas aos seus direitos.</h1>
        <p>O JusAcesso é uma plataforma criada para aproximar pessoas e profissionais do Direito, facilitando a busca por área de atuação e localização.</p>
      </div>
      <div class="symbol">⚖</div>
    </div>
  </section>

  <section class="section"><div class="container story-grid">
    <div><h2 class="section-title">Quem somos</h2></div>
    <div class="copy"><p>Encontrar um profissional jurídico pode ser difícil quando não sabemos qual área procurar ou onde começar. O JusAcesso organiza essa busca para tornar o primeiro passo mais simples.</p><p>A plataforma reúne perfis profissionais com especialidades, qualificações, localização e formas de atendimento. O usuário pode salvar perfis, conversar pelo chat e solicitar um horário de atendimento diretamente pelo JusAcesso.</p></div>
  </div></section>

  <section class="section soft"><div class="container">
    <div class="center"><div class="eyebrow">O QUE NOS MOVE</div><h2 class="section-title">Uma experiência clara e acessível.</h2></div>
    <div class="values">
      <article class="card"><span>◎</span><h3>Nossa missão</h3><p>Facilitar o encontro entre pessoas e profissionais do Direito por meio de uma experiência simples.</p></article>
      <article class="card"><span>◇</span><h3>Nossa visão</h3><p>Tornar o acesso à informação jurídica e à busca por profissionais mais organizado e compreensível.</p></article>
      <article class="card"><span>♡</span><h3>Nossos valores</h3><p>Clareza, respeito, privacidade, acessibilidade e responsabilidade na apresentação das informações.</p></article>
    </div>
  </div></section>

  <section class="section"><div class="container steps-wrap">
    <div><div class="eyebrow">COMO FUNCIONA</div><h2 class="section-title">Do problema ao primeiro contato.</h2><p>O JusAcesso não substitui o trabalho do advogado. Ele ajuda o usuário a encontrar profissionais compatíveis com sua necessidade e conhecer seus perfis.</p><a class="btn btn-primary" routerLink="/advogados">Conhecer profissionais</a></div>
    <div class="steps">
      <div><b>1</b><span><strong>Pesquise</strong><small>Escolha uma área ou cidade.</small></span></div>
      <div><b>2</b><span><strong>Compare perfis</strong><small>Veja qualificações e modalidades de atendimento.</small></span></div>
      <div><b>3</b><span><strong>Converse e agende</strong><small>Use o chat e envie uma solicitação de atendimento.</small></span></div>
    </div>
  </div></section>`,
  styles:[`
    .about-hero{background:linear-gradient(115deg,#f7f2e9,#f4f7f9);padding:72px 0}.about-grid{display:grid;grid-template-columns:1.25fr .75fr;align-items:center;gap:60px}.about-hero h1{font-size:clamp(2.8rem,5vw,4.8rem);line-height:1.02;color:#0d2740;margin:0 0 18px}.about-hero p,.copy p,.steps-wrap>div>p{color:#657285;line-height:1.75;font-size:1.02rem}.symbol{height:280px;border-radius:12px;background:#0d2740;color:#d7af75;display:grid;place-items:center;font-size:7rem;position:relative}.symbol::after{content:"JusAcesso";position:absolute;bottom:24px;font-family:Georgia,serif;font-size:1.1rem;color:#fff}.story-grid{display:grid;grid-template-columns:.7fr 1.3fr;gap:70px}.copy p:first-child{margin-top:0}.soft{background:#f5f6f7}.center{text-align:center;margin-bottom:28px}.values{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.values article{padding:24px;box-shadow:none}.values span{font-size:1.65rem;color:#b88a4a}.values h3{color:#0d2740;margin:14px 0 8px}.values p{color:#6e7988;line-height:1.65;margin:0}.steps-wrap{display:grid;grid-template-columns:.9fr 1.1fr;gap:70px;align-items:center}.steps{display:grid;gap:12px}.steps>div{display:flex;gap:15px;align-items:center;border-bottom:1px solid #e3e6ea;padding:18px 0}.steps b{width:38px;height:38px;border-radius:50%;background:#e9ddca;color:#77562b;display:grid;place-items:center}.steps span{display:flex;flex-direction:column;gap:3px}.steps strong{color:#0d2740}.steps small{color:#758092}
    @media(max-width:800px){.about-grid,.story-grid,.steps-wrap{grid-template-columns:1fr}.values{grid-template-columns:1fr}.symbol{height:220px}}
  `]
})
export class SobreComponent{}
