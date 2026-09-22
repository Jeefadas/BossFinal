import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector:'app-carousel',standalone:true,imports:[RouterLink],
  template:`
  <div class="wrap">
    <button class="arrow" (click)="prev()" aria-label="Anterior">‹</button>
    <div class="track">
      @for(item of areas; track item.nome) {
        <a class="slide" routerLink="/advogados" [queryParams]="{area:item.nome}">
          <span class="icon">{{item.icone}}</span>
          <strong>{{item.curto}}</strong>
          <small>{{item.texto}}</small>
        </a>
      }
    </div>
    <button class="arrow" (click)="next()" aria-label="Próximo">›</button>
  </div>`,
  styles:[`
    .wrap{display:grid;grid-template-columns:38px 1fr 38px;gap:12px;align-items:center}.track{display:flex;gap:12px;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;padding:4px}.track::-webkit-scrollbar{display:none}
    .slide{min-width:190px;background:#fff;border:1px solid #e2e5e9;border-radius:10px;padding:20px 16px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;transition:.18s}.slide:hover{border-color:#b88a4a;transform:translateY(-2px);box-shadow:0 10px 24px rgba(13,39,64,.07)}
    .icon{font-size:1.7rem}.slide strong{font-family:Inter,"Segoe UI",Arial,sans-serif;color:#0d2740;font-size:.9rem}.slide small{color:#738092;line-height:1.4;font-size:.78rem}.arrow{height:38px;width:38px;border:1px solid #d7dce2;border-radius:50%;background:#fff;color:#0d2740;font-size:1.5rem;cursor:pointer}
    @media(max-width:600px){.wrap{grid-template-columns:1fr}.arrow{display:none}.slide{min-width:76%}}
  `]
})
export class CarouselComponent{
  areas=[
    {nome:'Direito do Consumidor',curto:'Consumidor',icone:'♙',texto:'Compras e serviços'},
    {nome:'Direito de Família',curto:'Família',icone:'♧',texto:'Questões familiares'},
    {nome:'Direito Trabalhista',curto:'Trabalhista',icone:'▣',texto:'Relações de trabalho'},
    {nome:'Direito Penal',curto:'Penal',icone:'⚖',texto:'Demandas da área penal'},
    {nome:'Direito Previdenciário',curto:'Previdenciário',icone:'⌂',texto:'Benefícios e aposentadoria'},
    {nome:'Direito Civil',curto:'Civil',icone:'◇',texto:'Relações e contratos civis'}
  ];
  next(){document.querySelector('.track')?.scrollBy({left:205,behavior:'smooth'})}
  prev(){document.querySelector('.track')?.scrollBy({left:-205,behavior:'smooth'})}
}
