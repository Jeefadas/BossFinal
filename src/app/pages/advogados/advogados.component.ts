import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Advogado } from '../../models/advogado.model';
import { AdvogadoService } from '../../core/services/advogado.service';

@Component({
  selector:'app-advogados', standalone:true, imports:[FormsModule,RouterLink],
  template:`
  <section class="page-hero"><div class="container"><div class="eyebrow">PROFISSIONAIS</div><h1>Encontre um advogado</h1><p>Busque por nome, especialidade ou cidade e conheça profissionais de Salvador e região.</p></div></section>
  <section class="section"><div class="container search-layout">
    <div class="filters card">
      <div class="search-field"><span>⌕</span><input [(ngModel)]="busca" placeholder="Nome do advogado..."></div>
      <select [(ngModel)]="area"><option value="">Área do Direito</option>@for(item of areas;track item){<option [value]="item">{{item}}</option>}</select>
      <select [(ngModel)]="cidade"><option value="">Todas as cidades</option>@for(item of cidades;track item){<option [value]="item">{{item}}</option>}</select>
      <button class="btn btn-primary" type="button">Buscar</button>
    </div>

    <div class="result-head"><span><strong>{{filtrados.length}}</strong> profissionais encontrados</span>@if(area || cidade || busca){<button (click)="limpar()">Limpar filtros</button>}</div>

    <div class="list">
      @for(a of filtrados; track a.id){
        <article class="card lawyer-row">
          <div class="avatar">{{a.iniciais}}</div>
          <div class="body">
            <h3>{{a.nome}}</h3>
            <strong class="specialty">{{a.especialidade}}</strong>
            <p>{{a.cidade}} - {{a.uf}} · {{a.oab}}</p>
            <div class="extras">
              @if(a.atendimentoOnline){<span>Online</span>}
              @if(a.atendimentoPresencial){<span>Presencial</span>}
              @if(a.anosExperiencia){<span>{{a.anosExperiencia}} anos de experiência</span>}
            </div>
          </div>
          <a class="btn btn-outline" [routerLink]="['/advogado',a.id]">Ver perfil</a>
        </article>
      } @empty {
        <div class="empty card">Nenhum profissional encontrado com esses filtros.</div>
      }
    </div>
    <p class="demo-note">Os perfis exibidos nesta versão são demonstrativos.</p>
  </div></section>`,
  styles:[`
    .search-layout{max-width:940px}.filters{padding:14px;display:grid;grid-template-columns:1.4fr 1fr 1fr auto;gap:10px;box-shadow:none}.search-field{position:relative}.search-field span{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#7b8795}.search-field input{padding-left:34px}.result-head{display:flex;justify-content:space-between;align-items:center;margin:26px 2px 12px;color:#687487;font-size:.9rem}.result-head strong{color:#0d2740}.result-head button{border:0;background:none;color:#8c652f;font-weight:800;cursor:pointer}.list{display:grid;gap:12px}.lawyer-row{display:grid;grid-template-columns:76px 1fr auto;gap:18px;align-items:center;padding:16px 18px;box-shadow:none}.avatar{width:70px;height:70px;border-radius:10px;background:linear-gradient(145deg,#e5e9ee,#f3f5f7);display:grid;place-items:center;color:#0d2740;font-weight:800;font-size:1.05rem}.body h3{margin:0 0 5px;color:#0d2740;font-size:1.15rem}.specialty{color:#35536f;font-size:.86rem}.body p{color:#758092;margin:5px 0 8px;font-size:.86rem}.extras{display:flex;gap:6px;flex-wrap:wrap}.extras span{font-size:.72rem;padding:4px 7px;border-radius:999px;background:#f4efe7;color:#7a5a2d}.empty{padding:30px;text-align:center;color:#687487}.demo-note{text-align:center;color:#8993a0;font-size:.78rem;margin-top:18px}
    @media(max-width:820px){.filters{grid-template-columns:1fr 1fr}.filters .search-field{grid-column:1/-1}.lawyer-row{grid-template-columns:64px 1fr}.lawyer-row>.btn{grid-column:1/-1}.avatar{width:60px;height:60px}}
    @media(max-width:560px){.filters{grid-template-columns:1fr}.filters .search-field{grid-column:auto}.lawyer-row{grid-template-columns:1fr}.avatar{width:58px;height:58px}.lawyer-row>.btn{grid-column:auto;width:100%}}
  `]
})
export class AdvogadosComponent {
  busca=''; area=''; cidade='';
  readonly areas=['Direito do Consumidor','Direito de Família','Direito Trabalhista','Direito Previdenciário','Direito Penal','Direito Civil','Direito Empresarial'];
  readonly cidades=['Salvador','Lauro de Freitas','Camaçari','Simões Filho','Feira de Santana'];
  advogados:Advogado[];
  constructor(service:AdvogadoService, route:ActivatedRoute){
    this.advogados=service.getAll();
    this.area=route.snapshot.queryParamMap.get('area') || '';
  }
  get filtrados(){
    const q=this.busca.toLowerCase().trim();
    return this.advogados.filter(a =>
      (!this.area||a.especialidade===this.area||a.especialidadeSecundaria===this.area) &&
      (!this.cidade||a.cidade===this.cidade) &&
      (!q||a.nome.toLowerCase().includes(q)||a.cidade.toLowerCase().includes(q)||a.especialidade.toLowerCase().includes(q))
    );
  }
  limpar(){this.busca='';this.area='';this.cidade='';}
}
