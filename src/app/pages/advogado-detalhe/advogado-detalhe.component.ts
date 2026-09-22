import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdvogadoService } from '../../core/services/advogado.service';
import { Advogado } from '../../models/advogado.model';

@Component({
  selector:'app-advogado-detalhe', standalone:true, imports:[RouterLink],
  template:`
  <section class="section"><div class="container profile-wrap">
    @if(dados){
      <a class="back" routerLink="/advogados">← Voltar para profissionais</a>
      <div class="card profile-card">
        <div class="profile-head">
          <div class="avatar">{{dados.iniciais}}</div>
          <div class="identity">
            <div class="name-row"><h1>{{dados.nome}}</h1><span>Advogado</span></div>
            <p class="areas">{{dados.especialidade}}{{dados.especialidadeSecundaria ? ' · ' + dados.especialidadeSecundaria : ''}}</p>
            <p>⌖ {{dados.cidade}} - {{dados.uf}}</p>
            <p>◇ {{dados.oab}}</p>
          </div>
          <div class="contact-action"><a class="btn btn-primary" href="mailto:{{dados.email}}">Entrar em contato</a></div>
        </div>

        <div class="tabs"><span class="active">Sobre</span><span>Qualificações</span><span>Contato</span></div>

        <div class="content-grid">
          <div>
            <h2>Sobre</h2>
            <p class="desc">{{dados.descricao}}</p>
            <div class="facts">
              @if(dados.anosExperiencia){<div><strong>{{dados.anosExperiencia}} anos</strong><span>de experiência</span></div>}
              <div><strong>{{modalidades}}</strong><span>atendimento</span></div>
              <div><strong>{{dados.cidade}} - {{dados.uf}}</strong><span>localização</span></div>
            </div>
          </div>
          <aside>
            <h2>Qualificações</h2>
            <div class="qualifications">
              @if(dados.qualificacao1){<div>✓ {{dados.qualificacao1}}</div>}
              @if(dados.qualificacao2){<div>✓ {{dados.qualificacao2}}</div>}
              @if(!dados.qualificacao1 && !dados.qualificacao2){<p>Nenhuma qualificação informada.</p>}
            </div>
            <h2>Contato</h2>
            <div class="contact-list"><span><small>E-mail</small><strong>{{dados.email}}</strong></span>@if(dados.telefone){<span><small>Telefone</small><strong>{{dados.telefone}}</strong></span>}@if(dados.whatsapp){<span><small>WhatsApp</small><strong>{{dados.whatsapp}}</strong></span>}</div>
          </aside>
        </div>
      </div>
      <p class="notice">Os perfis desta demonstração são ilustrativos. O JusAcesso não presta aconselhamento jurídico automático.</p>
    } @else {
      <div class="card missing"><h2>Perfil não encontrado</h2><a class="btn btn-primary" routerLink="/advogados">Voltar para profissionais</a></div>
    }
  </div></section>`,
  styles:[`
    .profile-wrap{max-width:960px}.back{display:inline-block;color:#667487;font-size:.86rem;font-weight:700;margin-bottom:18px}.profile-card{padding:24px;box-shadow:none}.profile-head{display:grid;grid-template-columns:110px 1fr auto;gap:22px;align-items:center}.avatar{width:105px;height:105px;border-radius:12px;background:linear-gradient(145deg,#e3e7eb,#f3f5f7);color:#0d2740;display:grid;place-items:center;font-size:1.5rem;font-weight:900}.name-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.name-row h1{margin:0;color:#0d2740;font-size:2rem}.name-row span{border:1px solid #cfd5dc;border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:800;color:#405166}.identity p{margin:5px 0;color:#687487;font-size:.9rem}.identity .areas{color:#234664;font-weight:800}.tabs{display:flex;border-top:1px solid #e6e9ec;border-bottom:1px solid #e6e9ec;margin:24px 0 0}.tabs span{padding:13px 22px;color:#748092;font-size:.86rem;font-weight:800}.tabs .active{color:#0d2740;border-bottom:2px solid #0d2740}.content-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:44px;padding:28px 6px 10px}.content-grid h2{font-family:Inter,"Segoe UI",Arial,sans-serif;color:#0d2740;font-size:1rem;margin:0 0 12px}.desc{color:#657285;line-height:1.7;margin:0 0 22px}.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.facts div{border:1px solid #e2e6ea;border-radius:9px;padding:12px;display:flex;flex-direction:column;gap:3px}.facts strong{color:#0d2740;font-size:.86rem}.facts span{color:#7c8794;font-size:.75rem}.qualifications{display:grid;gap:8px;margin-bottom:24px;color:#536174;font-size:.88rem}.qualifications div{background:#f7f8f9;border-radius:8px;padding:10px}.qualifications p{color:#7a8593}.contact-list{display:grid;gap:8px}.contact-list span{display:flex;flex-direction:column;gap:3px;border-bottom:1px solid #e6e9ec;padding:8px 0}.contact-list small{color:#7b8694}.contact-list strong{color:#0d2740;font-size:.86rem;word-break:break-word}.notice{text-align:center;color:#87919e;font-size:.78rem;margin:14px}.missing{padding:30px;text-align:center}.missing h2{color:#0d2740}
    @media(max-width:760px){.profile-head{grid-template-columns:80px 1fr}.avatar{width:76px;height:76px}.contact-action{grid-column:1/-1}.contact-action .btn{width:100%}.content-grid{grid-template-columns:1fr}.facts{grid-template-columns:1fr}.tabs{overflow:auto}.tabs span{white-space:nowrap}}
  `]
})
export class AdvogadoDetalheComponent {
  dados?:Advogado;
  constructor(route:ActivatedRoute, service:AdvogadoService){ this.dados=service.getById(Number(route.snapshot.paramMap.get('id'))); }
  get modalidades():string {
    if(!this.dados) return 'Não informado';
    if(this.dados.atendimentoOnline && this.dados.atendimentoPresencial) return 'Online e presencial';
    if(this.dados.atendimentoOnline) return 'Online';
    if(this.dados.atendimentoPresencial) return 'Presencial';
    return 'Não informado';
  }
}
