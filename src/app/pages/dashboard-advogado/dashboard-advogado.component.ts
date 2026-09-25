import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AdvogadoService } from '../../core/services/advogado.service';
import { MensagemService } from '../../core/services/mensagem.service';
import { AgendamentoService } from '../../core/services/agendamento.service';
import { NotificacaoService } from '../../core/services/notificacao.service';
import { Advogado } from '../../models/advogado.model';
import { Agendamento } from '../../models/agendamento.model';
import { ConversaResumo } from '../../models/mensagem.model';

@Component({
  selector: 'app-dashboard-advogado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
          <a routerLink="/mensagens">• <span>Mensagens</span><b *ngIf="naoLidasMensagens">{{naoLidasMensagens}}</b></a>
          <a routerLink="/agendamentos">• <span>Agendamentos</span><b *ngIf="pendentes">{{pendentes}}</b></a>
          <a routerLink="/notificacoes">• <span>Notificações</span><b *ngIf="naoLidasNotificacoes">{{naoLidasNotificacoes}}</b></a>
          <button [class.active]="secao==='clientes'" (click)="secao='clientes'">• <span>Clientes interessados</span></button>
          <button [class.active]="secao==='contato'" (click)="secao='contato'">• <span>Contato e atendimento</span></button>
        </nav>
        <a class="public-link" [routerLink]="['/advogado', perfil.id]">↗ Visualizar perfil público</a>
      </aside>

      <main class="dashboard-main">
        <div class="top-row">
          <div><div class="eyebrow">PAINEL DO ADVOGADO</div><h1>Bem-vindo, {{primeiroNome}}!</h1><p>Gerencie seu perfil, conversas e solicitações de atendimento.</p></div>
          <span class="status"><i></i> Perfil público ativo</span>
        </div>

        @if(secao === 'geral') {
          <div class="summary-grid">
            <a class="card metric" routerLink="/mensagens"><span>Novas mensagens</span><strong>{{naoLidasMensagens}}</strong><small>Abra o chat para responder clientes.</small></a>
            <a class="card metric" routerLink="/agendamentos"><span>Solicitações pendentes</span><strong>{{pendentes}}</strong><small>Confirme ou recuse novos horários.</small></a>
            <article class="card metric"><span>Clientes interessados</span><strong>{{clientesInteressados.length}}</strong><small>Pessoas que conversaram ou solicitaram atendimento.</small></article>
            <article class="card metric"><span>Perfil completo</span><strong>{{completude}}%</strong><div class="progress"><i [style.width.%]="completude"></i></div><small>Mantenha seus dados profissionais atualizados.</small></article>
          </div>

          <div class="dashboard-columns">
            <section class="card quick-card">
              <div class="section-head"><div><h2>Mensagens recentes</h2><p>Últimas conversas na plataforma.</p></div><a routerLink="/mensagens">Ver todas →</a></div>
              <div class="mini-list" *ngIf="conversas.length; else noMessages">
                <a *ngFor="let c of conversas.slice(0,4)" routerLink="/mensagens" [queryParams]="{com:c.participanteEmail}" class="mini-row">
                  <span class="mini-avatar">{{iniciais(c.participanteNome)}}</span><span class="mini-copy"><strong>{{c.participanteNome}}</strong><small>{{c.ultimaMensagem}}</small></span><b *ngIf="c.naoLidas">{{c.naoLidas}}</b>
                </a>
              </div>
              <ng-template #noMessages><p class="empty-mini">Nenhuma conversa iniciada.</p></ng-template>
            </section>

            <section class="card quick-card">
              <div class="section-head"><div><h2>Próximos atendimentos</h2><p>Solicitações e horários mais próximos.</p></div><a routerLink="/agendamentos">Gerenciar →</a></div>
              <div class="mini-list" *ngIf="agendamentos.length; else noSchedule">
                <a *ngFor="let a of agendamentos.slice(0,4)" routerLink="/agendamentos" class="mini-row schedule-row">
                  <span class="date-mini"><strong>{{a.data | date:'dd':'UTC'}}</strong><small>{{a.data | date:'MMM':'UTC':'pt-BR'}}</small></span><span class="mini-copy"><strong>{{a.clienteNome}}</strong><small>{{a.horario}} · {{a.modalidade==='online'?'Online':'Presencial'}}</small></span><span class="status-mini" [class]="'status-mini '+a.status">{{statusLabel(a.status)}}</span>
                </a>
              </div>
              <ng-template #noSchedule><p class="empty-mini">Nenhum atendimento agendado.</p></ng-template>
            </section>
          </div>

          <section class="card profile-preview">
            <div class="section-head"><div><h2>Seu perfil profissional</h2><p>Essas informações aparecem para os clientes.</p></div><button class="btn btn-primary" (click)="secao='perfil'">Editar perfil</button></div>
            <div class="preview"><div class="preview-avatar">{{perfil.iniciais}}</div><div><h3>{{perfil.nome}}</h3><p class="meta">{{perfil.especialidade}} · {{perfil.cidade}} - {{perfil.uf}}</p><p>{{perfil.descricao}}</p><div class="chips">@if(perfil.qualificacao1){<span>{{perfil.qualificacao1}}</span>} @if(perfil.qualificacao2){<span>{{perfil.qualificacao2}}</span>}</div></div></div>
          </section>
        }

        @if(secao === 'clientes') {
          <section class="card editor">
            <div class="section-head"><div><h2>Clientes interessados</h2><p>Pessoas que entraram em contato ou solicitaram atendimento.</p></div></div>
            @if(clientesInteressados.length){
              <div class="clients-list">
                @for(c of clientesInteressados; track c.email){
                  <article class="client-row"><div class="mini-avatar">{{iniciais(c.nome)}}</div><div><strong>{{c.nome}}</strong><small>{{c.email}}</small><span>Última interação: {{c.ultimaInteracao | date:'dd/MM/yyyy · HH:mm'}}</span></div><a class="btn btn-outline" routerLink="/mensagens" [queryParams]="{com:c.email}">Conversar</a></article>
                }
              </div>
            } @else { <p class="empty-mini large">Ainda não há clientes interessados registrados.</p> }
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
            <div class="form-grid"><div class="field"><label>Qualificação 1</label><input name="qualificacao1" [(ngModel)]="perfil.qualificacao1" placeholder="Ex.: Pós-graduação em Direito Civil"></div><div class="field"><label>Qualificação 2</label><input name="qualificacao2" [(ngModel)]="perfil.qualificacao2" placeholder="Ex.: Mediação e conciliação"></div></div>
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
            <div class="checks"><label class="check-card"><input type="checkbox" name="online" [(ngModel)]="perfil.atendimentoOnline"><span><strong>Online</strong><small>Atendimento por canais digitais.</small></span></label><label class="check-card"><input type="checkbox" name="presencial" [(ngModel)]="perfil.atendimentoPresencial"><span><strong>Presencial</strong><small>Atendimento na cidade informada.</small></span></label></div>
            <button class="btn btn-gold save" type="submit">Salvar alterações</button>
            @if(mensagem){<div class="save-message">✓ {{mensagem}}</div>}
          </form>
        }
      </main>
    </div>
  </section>`,
  styles: [`
    .dashboard-shell{background:#f5f6f7;min-height:calc(100vh - 70px);padding:28px 0 58px}.dashboard-grid{display:grid;grid-template-columns:240px 1fr;gap:24px;align-items:start}.sidebar{background:#0d2740;color:#fff;border-radius:12px;min-height:700px;padding:22px 16px;position:sticky;top:92px}.side-brand{font-family:Georgia,serif;font-weight:700;font-size:1.1rem;color:#fff;padding:0 9px 22px;border-bottom:1px solid rgba(255,255,255,.12)}.profile-mini{display:flex;gap:11px;align-items:center;padding:20px 8px;border-bottom:1px solid rgba(255,255,255,.1)}.avatar{width:42px;height:42px;border-radius:9px;background:#d7af75;color:#0d2740;display:grid;place-items:center;font-weight:900}.profile-mini>div:last-child{display:flex;flex-direction:column;gap:4px;min-width:0}.profile-mini strong{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.profile-mini small{color:#b9c7d3}.side-nav{display:grid;gap:5px;padding:18px 0}.side-nav button,.side-nav a{display:flex;gap:10px;align-items:center;border:0;background:transparent;color:#d2dce5;padding:11px 12px;border-radius:8px;text-align:left;font-weight:700;cursor:pointer;font-size:.84rem}.side-nav button span,.side-nav a span{flex:1}.side-nav button.active,.side-nav button:hover,.side-nav a:hover{background:rgba(255,255,255,.1);color:#fff}.side-nav b{background:#d7af75;color:#0d2740;border-radius:99px;min-width:20px;height:20px;display:grid;place-items:center;font-size:.66rem}.public-link{display:block;margin-top:16px;padding:11px 12px;color:#e9c993;font-size:.82rem;font-weight:800}.top-row{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin:8px 0 22px}.top-row h1{font-size:2.2rem;color:#0d2740;margin:6px 0}.top-row p{margin:0;color:#6f7a89}.status{display:flex;gap:7px;align-items:center;background:#e9f5ef;color:#176b4d;border:1px solid #c9e5d7;border-radius:999px;padding:8px 11px;font-size:.78rem;font-weight:800}.status i{width:7px;height:7px;border-radius:50%;background:#24936c}.summary-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px}.metric{padding:18px;box-shadow:none;display:block}.metric>span{color:#6f7b8b;font-size:.78rem;font-weight:700}.metric>strong{display:block;color:#0d2740;font-size:1.8rem;margin:9px 0}.metric small{color:#7d8795;line-height:1.4;font-size:.75rem}.progress{height:5px;background:#e9edf0;border-radius:99px;overflow:hidden;margin:-2px 0 9px}.progress i{display:block;height:100%;background:#b88a4a}.dashboard-columns{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}.quick-card,.profile-preview,.editor{padding:22px;box-shadow:none}.section-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;padding-bottom:16px;border-bottom:1px solid #e8eaed;margin-bottom:18px}.section-head h2{margin:0 0 4px;color:#0d2740;font-size:1.25rem}.section-head p{margin:0;color:#748092;font-size:.82rem}.section-head>a{font-size:.78rem;color:#8a642f;font-weight:800}.mini-list{display:grid}.mini-row{display:grid;grid-template-columns:40px 1fr auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid #edf0f2}.mini-row:last-child{border-bottom:0}.mini-avatar,.date-mini{width:38px;height:38px;border-radius:8px;background:#e9edf1;color:#0d2740;display:grid;place-items:center;font-weight:900;font-size:.76rem}.date-mini{align-content:center;gap:0}.date-mini strong{font-size:.9rem}.date-mini small{text-transform:uppercase;font-size:.52rem}.mini-copy{min-width:0;display:flex;flex-direction:column;gap:3px}.mini-copy strong{color:#0d2740;font-size:.82rem}.mini-copy small{color:#7e8996;font-size:.72rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mini-row>b{background:#b88a4a;color:#fff;border-radius:99px;min-width:20px;height:20px;display:grid;place-items:center;font-size:.64rem}.status-mini{font-size:.62rem;font-weight:800;padding:4px 6px;border-radius:999px;background:#edf0f2;color:#5d6976}.status-mini.pendente{background:#fff2d9;color:#8b5d15}.status-mini.confirmado{background:#e5f4ed;color:#176b4d}.empty-mini{color:#87919d;font-size:.82rem;padding:18px 0;margin:0}.empty-mini.large{text-align:center;padding:50px}.preview{display:grid;grid-template-columns:76px 1fr;gap:18px}.preview-avatar{width:72px;height:72px;border-radius:10px;background:#e7ebef;color:#0d2740;display:grid;place-items:center;font-weight:900}.preview h3{margin:0 0 4px;color:#0d2740}.preview p{color:#657284;line-height:1.55;font-size:.84rem}.preview .meta{font-weight:800;color:#35536f}.chips{display:flex;gap:6px;flex-wrap:wrap}.chips span{font-size:.7rem;padding:5px 7px;background:#f4efe7;color:#785a33;border-radius:999px}.form-section-title{font-family:Inter,"Segoe UI",Arial,sans-serif;font-size:.92rem;color:#0d2740;margin:0 0 12px}.form-section-title.with-line{border-top:1px solid #e8eaed;padding-top:20px;margin-top:24px}.section-help{color:#7b8694;font-size:.8rem;margin:-4px 0 13px}.save{margin-top:22px}.save-message{display:inline-block;margin-left:12px;color:#176b4d;font-size:.82rem;font-weight:700}.checks{display:grid;grid-template-columns:1fr 1fr;gap:10px}.check-card{border:1px solid #dfe3e7;border-radius:9px;padding:13px;display:flex;gap:10px;align-items:flex-start;cursor:pointer}.check-card input{width:auto;margin-top:3px}.check-card span{display:flex;flex-direction:column;gap:3px}.check-card small{color:#7c8794;font-weight:400}.clients-list{display:grid}.client-row{display:grid;grid-template-columns:44px 1fr auto;gap:12px;align-items:center;padding:13px 0;border-bottom:1px solid #e9ecef}.client-row>div:nth-child(2){display:flex;flex-direction:column;gap:3px}.client-row strong{color:#0d2740}.client-row small{color:#697687}.client-row span{color:#919aa4;font-size:.7rem}.client-row .btn{padding:8px 11px;font-size:.76rem}
    @media(max-width:1000px){.summary-grid{grid-template-columns:1fr 1fr}.dashboard-columns{grid-template-columns:1fr}}
    @media(max-width:780px){.dashboard-shell{padding-top:14px}.dashboard-grid{grid-template-columns:1fr}.sidebar{position:static;min-height:auto}.side-brand,.profile-mini{display:none}.side-nav{grid-template-columns:1fr 1fr;padding:0}.public-link{text-align:center}.top-row{flex-direction:column}.status{align-self:flex-start}.summary-grid{grid-template-columns:1fr 1fr}.checks{grid-template-columns:1fr}}
    @media(max-width:540px){.summary-grid{grid-template-columns:1fr}.side-nav{grid-template-columns:1fr}.section-head{flex-direction:column}.section-head .btn{width:100%}.preview{grid-template-columns:1fr}.client-row{grid-template-columns:44px 1fr}.client-row .btn{grid-column:1/-1;width:100%}.save-message{display:block;margin:10px 0 0}}
  `]
})
export class DashboardAdvogadoComponent {
  secao: 'geral'|'perfil'|'contato'|'clientes' = 'geral';
  perfil: Advogado;
  mensagem = '';
  conversas: ConversaResumo[] = [];
  agendamentos: Agendamento[] = [];
  clientesInteressados: { email:string; nome:string; ultimaInteracao:string }[] = [];
  readonly areas=['Direito do Consumidor','Direito de Família','Direito Trabalhista','Direito Previdenciário','Direito Penal','Direito Civil','Direito Empresarial'];
  readonly ufs=['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  constructor(
    private auth: AuthService,
    private advogados: AdvogadoService,
    private mensagensService: MensagemService,
    private agendamentosService: AgendamentoService,
    private notificacoesService: NotificacaoService
  ) {
    const user=this.auth.currentUser();
    this.perfil=this.advogados.getByEmail(user.email) || this.advogados.criarPerfilInicial({nome:user.nome,email:user.email,cidade:user.cidade||'Salvador',uf:user.uf||'BA',oab:'OAB não informada',especialidade:'Direito do Consumidor'});
    this.reloadActivity();
  }

  get primeiroNome():string{return this.perfil.nome.split(' ')[0] || 'Advogado';}
  get modalidades():string{if(this.perfil.atendimentoOnline&&this.perfil.atendimentoPresencial)return 'Online e presencial';if(this.perfil.atendimentoOnline)return 'Online';if(this.perfil.atendimentoPresencial)return 'Presencial';return 'Não informado';}
  get naoLidasMensagens():number{return this.mensagensService.unreadCount(this.perfil.email);}
  get pendentes():number{return this.agendamentosService.pendingCount(this.perfil.email);}
  get naoLidasNotificacoes():number{return this.notificacoesService.unreadCount(this.perfil.email);}
  get completude():number{
    const campos=[this.perfil.nome,this.perfil.oab,this.perfil.especialidade,this.perfil.descricao,this.perfil.telefone||this.perfil.whatsapp,this.perfil.qualificacao1,this.perfil.qualificacao2,this.perfil.cidade,this.perfil.atendimentoOnline||this.perfil.atendimentoPresencial];
    return Math.round(campos.filter(Boolean).length/campos.length*100);
  }

  salvar():void{
    const atualizado=this.advogados.updateByEmail(this.perfil.email,this.perfil);
    if(atualizado)this.perfil={...atualizado};
    this.mensagem='Alterações salvas com sucesso.';
    setTimeout(()=>this.mensagem='',2200);
  }

  iniciais(nome:string):string{return nome.split(' ').filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'CL';}
  statusLabel(status:string):string{return ({pendente:'Pendente',confirmado:'Confirmado',recusado:'Recusado',concluido:'Concluído'} as any)[status]||status;}

  private reloadActivity():void{
    this.conversas=this.mensagensService.getConversations(this.perfil.email);
    this.agendamentos=this.agendamentosService.getForUser(this.perfil.email,'advogado');
    const map=new Map<string,{email:string;nome:string;ultimaInteracao:string}>();
    for(const c of this.mensagensService.interestedClients(this.perfil.email)) map.set(c.email.toLowerCase(),c);
    for(const c of this.agendamentosService.interestedClients(this.perfil.email)){
      const key=c.email.toLowerCase(); const old=map.get(key); if(!old||c.ultimaInteracao>old.ultimaInteracao) map.set(key,c);
    }
    this.clientesInteressados=Array.from(map.values()).sort((a,b)=>b.ultimaInteracao.localeCompare(a.ultimaInteracao));
  }
}
