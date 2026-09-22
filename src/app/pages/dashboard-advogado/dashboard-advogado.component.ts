import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AdvogadoService } from '../../core/services/advogado.service';
import { Advogado } from '../../models/advogado.model';

@Component({
  selector: 'app-dashboard-advogado',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
  <section class="dashboard-shell">
    <div class="container dashboard-grid">
      <aside class="sidebar">
        <div class="side-brand">⚖ <span>JusAcesso</span></div>
        <div class="profile-mini">
          <div class="avatar">{{perfil.iniciais}}</div>
          <div><strong>{{perfil.nome}}</strong><small>{{perfil.oab}}</small></div>
        </div>
        <nav class="side-nav">
          <button [class.active]="secao==='geral'" (click)="secao='geral'">▦ <span>Painel</span></button>
          <button [class.active]="secao==='perfil'" (click)="secao='perfil'">♙ <span>Meu perfil</span></button>
          <button [class.active]="secao==='contato'" (click)="secao='contato'">☎ <span>Contato e atendimento</span></button>
        </nav>
        <a class="public-link" [routerLink]="['/advogado', perfil.id]">↗ Visualizar perfil</a>
      </aside>

      <main class="dashboard-main">
        <div class="top-row">
          <div><div class="eyebrow">PAINEL DO ADVOGADO</div><h1>Bem-vindo, {{primeiroNome}}!</h1><p>Mantenha suas informações profissionais atualizadas.</p></div>
          <span class="status"><i></i> Perfil público ativo</span>
        </div>

        @if(secao === 'geral') {
          <div class="summary-grid">
            <article class="card metric"><span>Perfil completo</span><strong>{{completude}}%</strong><div class="progress"><i [style.width.%]="completude"></i></div><small>Preencha seus dados para apresentar melhor sua atuação.</small></article>
            <article class="card metric"><span>Área principal</span><strong class="small-value">{{perfil.especialidade}}</strong><small>{{perfil.especialidadeSecundaria || 'Sem segunda área cadastrada'}}</small></article>
            <article class="card metric"><span>Atendimento</span><strong class="small-value">{{modalidades}}</strong><small>{{perfil.cidade}} - {{perfil.uf}}</small></article>
          </div>

          <section class="card quick-card">
            <div class="section-head"><div><h2>Seu perfil profissional</h2><p>Visualize as informações principais e edite quando precisar.</p></div><button class="btn btn-primary" (click)="secao='perfil'">Editar perfil</button></div>
            <div class="preview">
              <div class="preview-avatar">{{perfil.iniciais}}</div>
              <div>
                <h3>{{perfil.nome}}</h3>
                <p class="meta">{{perfil.especialidade}} · {{perfil.cidade}} - {{perfil.uf}}</p>
                <p>{{perfil.descricao}}</p>
                <div class="chips">@if(perfil.qualificacao1){<span>{{perfil.qualificacao1}}</span>} @if(perfil.qualificacao2){<span>{{perfil.qualificacao2}}</span>}</div>
              </div>
            </div>
          </section>
        }

        @if(secao === 'perfil') {
          <form class="card editor" (ngSubmit)="salvar()">
            <div class="section-head"><div><h2>Meu perfil</h2><p>Atualize as informações que aparecem publicamente.</p></div></div>
            <h3 class="form-section-title">Informações básicas</h3>
            <div class="form-grid">
              <div class="field"><label>Nome completo</label><input name="nome" [(ngModel)]="perfil.nome" required></div>
              <div class="field"><label>Número da OAB</label><input name="oab" [(ngModel)]="perfil.oab" required></div>
              <div class="field"><label>Área principal</label><select name="especialidade" [(ngModel)]="perfil.especialidade">@for(area of areas; track area){<option [value]="area">{{area}}</option>}</select></div>
              <div class="field"><label>Segunda área de atuação</label><select name="especialidadeSecundaria" [(ngModel)]="perfil.especialidadeSecundaria"><option value="">Nenhuma</option>@for(area of areas; track area){<option [value]="area">{{area}}</option>}</select></div>
              <div class="field"><label>Anos de experiência</label><input type="number" min="0" max="70" name="anosExperiencia" [(ngModel)]="perfil.anosExperiencia"></div>
              <div class="field full"><label>Sobre você</label><textarea rows="5" maxlength="420" name="descricao" [(ngModel)]="perfil.descricao" placeholder="Conte brevemente sobre sua experiência e atuação."></textarea></div>
            </div>

            <h3 class="form-section-title with-line">Qualificações</h3>
            <p class="section-help">Adicione até duas formações, especializações ou certificações.</p>
            <div class="form-grid">
              <div class="field"><label>Qualificação 1</label><input name="qualificacao1" [(ngModel)]="perfil.qualificacao1" placeholder="Ex.: Pós-graduação em Direito Civil"></div>
              <div class="field"><label>Qualificação 2</label><input name="qualificacao2" [(ngModel)]="perfil.qualificacao2" placeholder="Ex.: Mediação e conciliação"></div>
            </div>
            <button class="btn btn-gold save" type="submit">Salvar alterações</button>
            @if(mensagem){<div class="save-message">✓ {{mensagem}}</div>}
          </form>
        }

        @if(secao === 'contato') {
          <form class="card editor" (ngSubmit)="salvar()">
            <div class="section-head"><div><h2>Contato e atendimento</h2><p>Defina onde você atende e como os clientes podem entrar em contato.</p></div></div>
            <div class="form-grid">
              <div class="field full"><label>E-mail profissional</label><input [value]="perfil.email" disabled></div>
              <div class="field"><label>Telefone</label><input name="telefone" [(ngModel)]="perfil.telefone" placeholder="(71) 3000-0000"></div>
              <div class="field"><label>WhatsApp</label><input name="whatsapp" [(ngModel)]="perfil.whatsapp" placeholder="(71) 90000-0000"></div>
              <div class="field"><label>Cidade</label><input name="cidade" [(ngModel)]="perfil.cidade" required></div>
              <div class="field"><label>UF</label><select name="uf" [(ngModel)]="perfil.uf">@for(uf of ufs; track uf){<option [value]="uf">{{uf}}</option>}</select></div>
            </div>

            <h3 class="form-section-title with-line">Modalidade de atendimento</h3>
            <div class="checks">
              <label class="check-card"><input type="checkbox" name="online" [(ngModel)]="perfil.atendimentoOnline"><span><strong>Online</strong><small>Atendimento por canais digitais.</small></span></label>
              <label class="check-card"><input type="checkbox" name="presencial" [(ngModel)]="perfil.atendimentoPresencial"><span><strong>Presencial</strong><small>Atendimento na cidade informada.</small></span></label>
            </div>
            <button class="btn btn-gold save" type="submit">Salvar alterações</button>
            @if(mensagem){<div class="save-message">✓ {{mensagem}}</div>}
          </form>
        }
      </main>
    </div>
  </section>`,
  styles: [`
    .dashboard-shell{background:#f5f6f7;min-height:calc(100vh - 70px);padding:28px 0 58px}.dashboard-grid{display:grid;grid-template-columns:230px 1fr;gap:24px;align-items:start}.sidebar{background:#0d2740;color:#fff;border-radius:12px;min-height:650px;padding:22px 16px;position:sticky;top:92px}.side-brand{font-family:Georgia,serif;font-weight:700;font-size:1.1rem;color:#fff;padding:0 9px 22px;border-bottom:1px solid rgba(255,255,255,.12)}.side-brand:first-letter{color:#d7af75}.profile-mini{display:flex;gap:11px;align-items:center;padding:20px 8px;border-bottom:1px solid rgba(255,255,255,.1)}.avatar{width:42px;height:42px;border-radius:9px;background:#d7af75;color:#0d2740;display:grid;place-items:center;font-weight:900}.profile-mini>div:last-child{display:flex;flex-direction:column;gap:4px;min-width:0}.profile-mini strong{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.profile-mini small{color:#b9c7d3}.side-nav{display:grid;gap:5px;padding:18px 0}.side-nav button{display:flex;gap:10px;align-items:center;border:0;background:transparent;color:#d2dce5;padding:11px 12px;border-radius:8px;text-align:left;font-weight:700;cursor:pointer}.side-nav button.active,.side-nav button:hover{background:rgba(255,255,255,.1);color:#fff}.public-link{display:block;margin-top:16px;padding:11px 12px;color:#e9c993;font-size:.86rem;font-weight:800}.top-row{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin:8px 0 22px}.top-row h1{font-size:2.2rem;color:#0d2740;margin:6px 0}.top-row p{margin:0;color:#6f7a89}.status{display:flex;gap:7px;align-items:center;background:#e9f5ef;color:#176b4d;border:1px solid #c9e5d7;border-radius:999px;padding:8px 11px;font-size:.78rem;font-weight:800}.status i{width:7px;height:7px;border-radius:50%;background:#24936c}.summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:14px}.metric{padding:20px;box-shadow:none}.metric>span{color:#6f7b8b;font-size:.82rem;font-weight:700}.metric>strong{display:block;color:#0d2740;font-size:1.9rem;margin:10px 0}.metric>strong.small-value{font-family:Inter,"Segoe UI",Arial,sans-serif;font-size:1rem;line-height:1.4;min-height:42px}.metric small{color:#7d8795;line-height:1.45}.progress{height:6px;background:#e9edf0;border-radius:99px;overflow:hidden;margin:-1px 0 10px}.progress i{display:block;height:100%;background:#b88a4a}.quick-card,.editor{padding:24px;box-shadow:none}.section-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;padding-bottom:18px;border-bottom:1px solid #e8eaed;margin-bottom:22px}.section-head h2{margin:0 0 5px;color:#0d2740;font-size:1.45rem}.section-head p{margin:0;color:#748092}.preview{display:grid;grid-template-columns:82px 1fr;gap:20px}.preview-avatar{width:76px;height:76px;border-radius:11px;background:#e8ecf0;color:#0d2740;display:grid;place-items:center;font-weight:900;font-size:1.2rem}.preview h3{margin:0 0 5px;color:#0d2740}.preview p{color:#687487;line-height:1.6}.preview .meta{margin:0;font-size:.88rem}.chips{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}.chips span{background:#f3ede4;color:#805d2e;border-radius:999px;padding:6px 9px;font-size:.75rem}.form-section-title{font-family:Inter,"Segoe UI",Arial,sans-serif;color:#0d2740;font-size:1rem;margin:0 0 15px}.with-line{border-top:1px solid #e8eaed;padding-top:22px;margin-top:26px}.section-help{color:#748092;margin:-7px 0 16px;font-size:.9rem}.save{width:100%;margin-top:24px}.checks{display:grid;grid-template-columns:1fr 1fr;gap:12px}.check-card{display:flex;gap:10px;border:1px solid #dfe3e7;border-radius:9px;padding:14px;align-items:flex-start;cursor:pointer}.check-card input{width:auto;margin-top:4px}.check-card span{display:flex;flex-direction:column;gap:3px}.check-card strong{color:#0d2740}.check-card small{color:#7a8593;font-weight:500}.save-message{margin-top:14px;background:#eaf6f0;color:#176b4d;border:1px solid #c8e5d6;border-radius:8px;padding:11px 13px;font-weight:700}.field input:disabled{background:#f2f4f5;color:#7c8693}
    @media(max-width:940px){.dashboard-grid{grid-template-columns:1fr}.sidebar{position:static;min-height:auto}.side-nav{grid-template-columns:repeat(3,1fr)}.summary-grid{grid-template-columns:1fr 1fr}.summary-grid article:last-child{grid-column:1/-1}}
    @media(max-width:640px){.top-row,.section-head{flex-direction:column}.summary-grid{grid-template-columns:1fr}.summary-grid article:last-child{grid-column:auto}.side-nav{grid-template-columns:1fr}.preview{grid-template-columns:1fr}.checks{grid-template-columns:1fr}.quick-card,.editor{padding:19px}}
  `]
})
export class DashboardAdvogadoComponent {
  secao: 'geral' | 'perfil' | 'contato' = 'geral';
  mensagem = '';
  readonly areas = ['Direito do Consumidor','Direito de Família','Direito Trabalhista','Direito Previdenciário','Direito Penal','Direito Civil','Direito Empresarial'];
  readonly ufs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
  perfil: Advogado;

  constructor(private auth: AuthService, private advogados: AdvogadoService) {
    const user = this.auth.currentUser();
    this.perfil = this.advogados.getByEmail(user.email) || this.advogados.criarPerfilInicial({
      nome: user.nome, email: user.email, cidade: user.cidade || '', uf: user.uf || 'BA',
      oab: 'OAB não informada', especialidade: 'Direito do Consumidor'
    });
  }
  get primeiroNome(): string { return this.perfil.nome.split(' ')[0] || 'Advogado'; }
  get modalidades(): string {
    if (this.perfil.atendimentoOnline && this.perfil.atendimentoPresencial) return 'Online e presencial';
    if (this.perfil.atendimentoOnline) return 'Online';
    if (this.perfil.atendimentoPresencial) return 'Presencial';
    return 'Não informado';
  }
  get completude(): number {
    const itens=[this.perfil.nome,this.perfil.oab,this.perfil.cidade,this.perfil.uf,this.perfil.especialidade,this.perfil.descricao,this.perfil.telefone||this.perfil.whatsapp,this.perfil.qualificacao1,this.perfil.qualificacao2];
    return Math.round((itens.filter(Boolean).length/itens.length)*100);
  }
  salvar(): void {
    const salvo=this.advogados.updateByEmail(this.perfil.email,this.perfil);
    if(salvo) this.perfil={...salvo};
    this.mensagem='Perfil atualizado com sucesso.';
    setTimeout(()=>this.mensagem='',2400);
  }
}
