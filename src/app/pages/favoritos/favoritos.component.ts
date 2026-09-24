import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AdvogadoService } from '../../core/services/advogado.service';
import { FavoritoService } from '../../core/services/favorito.service';
import { Advogado } from '../../models/advogado.model';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <section class="page-hero"><div class="container"><div class="eyebrow">PROFISSIONAIS SALVOS</div><h1>Meus favoritos</h1><p>Guarde os perfis que você quer consultar novamente antes de decidir com quem conversar.</p></div></section>
  <section class="section"><div class="container favorites-wrap">
    <div class="favorites" *ngIf="items.length; else empty">
      @for(a of items; track a.id){
        <article class="card favorite-card">
          <div class="avatar">{{a.iniciais}}</div>
          <div class="copy"><span>{{a.especialidade}}</span><h2>{{a.nome}}</h2><p>{{a.cidade}} - {{a.uf}} · {{a.oab}}</p><div class="chips">@if(a.atendimentoOnline){<i>Online</i>} @if(a.atendimentoPresencial){<i>Presencial</i>}</div></div>
          <div class="actions"><a class="btn btn-primary" [routerLink]="['/advogado',a.id]">Ver perfil</a><button class="btn btn-outline" (click)="remover(a.id)">Remover</button></div>
        </article>
      }
    </div>
    <ng-template #empty><div class="card empty"><span>♡</span><h2>Nenhum favorito ainda</h2><p>Salve advogados durante sua busca para encontrá-los rapidamente depois.</p><a class="btn btn-primary" routerLink="/advogados">Encontrar advogados</a></div></ng-template>
  </div></section>`,
  styles: [`
    .favorites-wrap{max-width:900px}.favorites{display:grid;gap:12px}.favorite-card{padding:18px;display:grid;grid-template-columns:68px 1fr auto;gap:16px;align-items:center;box-shadow:none}.avatar{width:64px;height:64px;border-radius:10px;background:#e8edf1;color:#0d2740;display:grid;place-items:center;font-weight:900}.copy>span{font-size:.72rem;color:#8a642f;font-weight:800}.copy h2{margin:4px 0;color:#0d2740;font-size:1.14rem}.copy p{margin:0 0 7px;color:#748092;font-size:.82rem}.chips{display:flex;gap:5px}.chips i{font-style:normal;background:#f4efe7;color:#75562e;border-radius:999px;padding:4px 7px;font-size:.68rem}.actions{display:flex;gap:7px}.actions .btn{padding:9px 11px;font-size:.78rem}.empty{text-align:center;padding:60px 22px;box-shadow:none}.empty>span{font-size:3rem;color:#b88a4a}.empty h2{color:#0d2740;margin:12px 0 7px}.empty p{color:#758091;max-width:470px;margin:0 auto 18px;line-height:1.6}
    @media(max-width:700px){.favorite-card{grid-template-columns:58px 1fr}.avatar{width:54px;height:54px}.actions{grid-column:1/-1}.actions .btn{flex:1}}
  `]
})
export class FavoritosComponent {
  user: any;
  items: Advogado[] = [];
  constructor(private auth: AuthService, private advogados: AdvogadoService, private favoritos: FavoritoService){
    this.user = this.auth.currentUser();
    this.reload();
  }
  remover(id: number): void { this.favoritos.toggle(this.user.email, id); this.reload(); }
  private reload(): void { const ids = this.favoritos.getIds(this.user.email); this.items = this.advogados.getAll().filter(a => ids.includes(a.id)); }
}
