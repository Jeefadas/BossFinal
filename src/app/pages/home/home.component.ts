import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { AdvogadoService } from '../../core/services/advogado.service';
import { Advogado } from '../../models/advogado.model';

@Component({
  selector:'app-home',
  standalone:true,
  imports:[RouterLink,CarouselComponent],
  template:`
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <div class="eyebrow">CONEXÃO · DIREITO · ACESSO</div>
        <h1>A justiça mais perto de você.</h1>
        <p>Encontre profissionais por área de atuação e localização, conheça seus perfis e escolha com mais clareza quem pode atender sua necessidade.</p>
        <div class="actions">
          <a class="btn btn-primary" routerLink="/advogados">Encontrar um advogado →</a>
          <a class="btn btn-outline" routerLink="/cadastro">Sou advogado</a>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="art-badge">JusAcesso</div>
        <div class="scale">⚖</div>
        <p>Informação e conexão de forma simples.</p>
      </div>
    </div>
    <div class="container benefits">
      <div><span>⌕</span><strong>Busca por especialidade</strong></div>
      <div><span>◇</span><strong>Perfis organizados</strong></div>
      <div><span>💬</span><strong>Chat pela plataforma</strong></div>
      <div><span>📅</span><strong>Solicite atendimento</strong></div>
    </div>
  </section>

  <section class="section areas-section">
    <div class="container">
      <div class="center-title">
        <h2 class="section-title">Em qual área você precisa de ajuda?</h2>
        <p class="section-subtitle">Escolha uma área para ver profissionais com atuação relacionada.</p>
      </div>
      <app-carousel/>
    </div>
  </section>

  <section class="section help-section">
    <div class="container help-card">
      <div>
        <div class="eyebrow">ACESSO À JUSTIÇA</div>
        <h2>Não pode pagar um advogado?</h2>
        <p>Existem formas gratuitas de assistência jurídica, como a Defensoria Pública. O JusAcesso também ajuda a encontrar informações sobre onde buscar orientação.</p>
      </div>
      <a class="btn btn-gold" routerLink="/sobre">Saiba mais</a>
    </div>
  </section>

  <section class="section featured">
    <div class="container">
      <div class="section-heading-row">
        <div>
          <h2 class="section-title">Profissionais em destaque</h2>
          <p class="section-subtitle">Perfis demonstrativos de Salvador e Região Metropolitana.</p>
        </div>
        <a class="btn btn-outline" routerLink="/advogados">Ver todos</a>
      </div>
      <div class="lawyers">
        @for(a of destaques; track a.id) {
          <article class="lawyer card">
            <div class="avatar">{{a.iniciais}}</div>
            <div class="lawyer-info">
              <span class="tag">{{a.especialidade}}</span>
              <h3>{{a.nome}}</h3>
              <p>{{a.cidade}} - {{a.uf}}</p>
              <a [routerLink]="['/advogado',a.id]">Ver perfil →</a>
            </div>
          </article>
        }
      </div>
    </div>
  </section>
  `,
  styles:[`
    .hero{background:linear-gradient(120deg,#f7f2e9 0%,#fbfbfa 56%,#f0f4f7 100%);padding:62px 0 0}.hero-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:60px;align-items:center}.hero-copy{padding:28px 0 58px}.hero h1{font-size:clamp(3rem,6vw,5.6rem);line-height:.98;letter-spacing:-.035em;margin:0 0 20px;color:#0d2740;max-width:700px}.hero-copy>p{font-size:1.05rem;line-height:1.75;color:#5f6b7b;max-width:610px}.actions{display:flex;gap:12px;margin-top:28px}.hero-art{min-height:390px;background:linear-gradient(145deg,#e9dfd0,#cdbba1);border-radius:0 0 0 90px;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 18px 50px rgba(13,39,64,.09)}.hero-art::before{content:"";position:absolute;width:260px;height:260px;border:1px solid rgba(13,39,64,.15);border-radius:50%}.hero-art::after{content:"";position:absolute;inset:24px;border:1px solid rgba(255,255,255,.45)}.scale{font-size:8.5rem;color:#0d2740;line-height:1;z-index:2}.art-badge{position:absolute;top:38px;left:38px;background:#fff;color:#0d2740;padding:8px 12px;border-radius:999px;font-size:.76rem;font-weight:800;letter-spacing:.08em}.hero-art p{z-index:2;color:#31465b;font-weight:700;margin:18px 0 0}.benefits{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(13,39,64,.08);background:rgba(255,255,255,.68)}.benefits div{display:flex;align-items:center;justify-content:center;gap:10px;padding:22px 12px;border-right:1px solid rgba(13,39,64,.08)}.benefits div:last-child{border-right:0}.benefits span{font-size:1.35rem;color:#b88a4a}.benefits strong{font-size:.83rem;color:#0d2740}.center-title{text-align:center}.center-title .section-subtitle{margin-left:auto;margin-right:auto}.areas-section{padding-top:64px}.help-section{padding-top:12px;padding-bottom:40px}.help-card{background:#0d2740;color:#fff;border-radius:12px;padding:34px 38px;display:flex;align-items:center;justify-content:space-between;gap:30px}.help-card h2{font-size:2rem;margin:0 0 10px}.help-card p{margin:0;color:#d5dde5;line-height:1.7;max-width:760px}.featured{padding-top:42px}.section-heading-row{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:24px}.section-heading-row .section-subtitle{margin-bottom:0}.lawyers{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.lawyer{padding:18px;display:flex;gap:14px;align-items:center;box-shadow:none}.avatar{width:58px;height:58px;border-radius:10px;background:#e9edf1;color:#0d2740;display:grid;place-items:center;font-weight:800;flex:0 0 auto}.tag{font-size:.72rem;color:#8a642f;font-weight:800}.lawyer h3{font-size:1.05rem;margin:5px 0 3px;color:#0d2740}.lawyer p{margin:0 0 8px;color:#748091;font-size:.86rem}.lawyer a{font-weight:800;color:#0d2740;font-size:.85rem}
    @media(max-width:900px){.hero-grid{grid-template-columns:1fr}.hero-copy{padding-bottom:16px}.hero-art{min-height:300px;border-radius:18px}.benefits{grid-template-columns:1fr 1fr}.benefits div:nth-child(2){border-right:0}.benefits div:nth-child(-n+2){border-bottom:1px solid rgba(13,39,64,.08)}.lawyers{grid-template-columns:1fr}.help-card,.section-heading-row{align-items:flex-start;flex-direction:column}}
    @media(max-width:540px){.hero{padding-top:36px}.hero h1{font-size:3rem}.actions{flex-direction:column}.actions .btn{width:100%}.hero-art{min-height:240px}.scale{font-size:6rem}.benefits{grid-template-columns:1fr}.benefits div{border-right:0!important;border-bottom:1px solid rgba(13,39,64,.08)!important;justify-content:flex-start}.help-card{padding:28px 22px}.section-heading-row .btn{width:100%}}
  `]
})
export class HomeComponent{
  destaques: Advogado[];
  constructor(service: AdvogadoService){
    const todos = service.getAll();
    this.destaques = todos.filter(a => a.destaque).slice(0,3);
  }
}
