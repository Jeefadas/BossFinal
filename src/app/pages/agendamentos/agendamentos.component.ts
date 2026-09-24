import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AdvogadoService } from '../../core/services/advogado.service';
import { AgendamentoService } from '../../core/services/agendamento.service';
import { Agendamento, ModalidadeAgendamento, StatusAgendamento } from '../../models/agendamento.model';
import { Advogado } from '../../models/advogado.model';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <section class="page-hero"><div class="container"><div class="eyebrow">ATENDIMENTOS</div><h1>Agendamentos</h1><p>{{user.tipo==='advogado' ? 'Gerencie solicitações de clientes e acompanhe seus atendimentos.' : 'Solicite um horário e acompanhe a confirmação do profissional.'}}</p></div></section>
  <section class="section schedule-section"><div class="container schedule-grid" [class.client-grid]="user.tipo==='cliente'">
    <aside class="card new-card" *ngIf="user.tipo==='cliente'">
      <div class="card-head"><span>📅</span><div><h2>Solicitar atendimento</h2><p>Escolha o profissional, data e modalidade.</p></div></div>
      <form (ngSubmit)="criar()" class="form-stack">
        <div class="field"><label>Advogado</label><select name="advogadoId" [(ngModel)]="advogadoId" (ngModelChange)="syncModalidade()" required><option [ngValue]="0">Selecione</option><option *ngFor="let a of advogados" [ngValue]="a.id">{{a.nome}} · {{a.especialidade}}</option></select></div>
        <div class="two">
          <div class="field"><label>Data</label><input type="date" name="data" [(ngModel)]="data" [min]="hoje" required></div>
          <div class="field"><label>Horário</label><input type="time" name="horario" [(ngModel)]="horario" required></div>
        </div>
        <div class="field"><label>Modalidade</label><div class="mode-options">
          <label [class.disabled]="!selectedAdvogado?.atendimentoOnline"><input type="radio" name="modalidade" value="online" [(ngModel)]="modalidade" [disabled]="!selectedAdvogado?.atendimentoOnline"><span>💻 Online</span></label>
          <label [class.disabled]="!selectedAdvogado?.atendimentoPresencial"><input type="radio" name="modalidade" value="presencial" [(ngModel)]="modalidade" [disabled]="!selectedAdvogado?.atendimentoPresencial"><span>📍 Presencial</span></label>
        </div></div>
        <div class="field"><label>Observação <small>(opcional)</small></label><textarea name="observacao" [(ngModel)]="observacao" rows="4" maxlength="300" placeholder="Explique brevemente o assunto que deseja tratar."></textarea></div>
        <button class="btn btn-primary" [disabled]="!podeCriar">Solicitar agendamento</button>
        <p class="success" *ngIf="mensagem">✓ {{mensagem}}</p>
      </form>
    </aside>

    <main class="schedule-list">
      <div class="section-title-row"><div><h2>{{user.tipo==='advogado' ? 'Solicitações e atendimentos' : 'Meus agendamentos'}}</h2><p>{{agendamentos.length}} registro(s)</p></div><div class="legend"><span class="dot pending"></span>Pendente <span class="dot confirmed"></span>Confirmado</div></div>
      <div class="cards" *ngIf="agendamentos.length; else empty">
        <article class="card appointment" *ngFor="let a of agendamentos">
          <div class="date-box"><strong>{{a.data | date:'dd':'UTC'}}</strong><span>{{a.data | date:'MMM':'UTC':'pt-BR'}}</span></div>
          <div class="appointment-main">
            <div class="appointment-top"><div><span class="status" [class]="'status '+a.status">{{statusLabel(a.status)}}</span><h3>{{user.tipo==='advogado' ? a.clienteNome : a.advogadoNome}}</h3></div><strong class="time">{{a.horario}}</strong></div>
            <p class="meta">{{a.modalidade === 'online' ? '💻 Atendimento online' : '📍 Atendimento presencial'}} <span>•</span> {{a.data | date:'dd/MM/yyyy':'UTC'}}</p>
            <p class="note" *ngIf="a.observacao">“{{a.observacao}}”</p>
            <div class="actions">
              <a class="btn btn-outline" [routerLink]="['/mensagens']" [queryParams]="{com: user.tipo==='advogado' ? a.clienteEmail : a.advogadoEmail}">💬 Conversar</a>
              <ng-container *ngIf="user.tipo==='advogado' && a.status==='pendente'">
                <button class="btn btn-primary" (click)="alterar(a,'confirmado')">Aceitar</button>
                <button class="btn btn-soft-danger" (click)="alterar(a,'recusado')">Recusar</button>
              </ng-container>
              <button *ngIf="user.tipo==='advogado' && a.status==='confirmado'" class="btn btn-gold" (click)="alterar(a,'concluido')">Marcar como concluído</button>
            </div>
          </div>
        </article>
      </div>
      <ng-template #empty><div class="card empty"><span>📅</span><h3>Nenhum agendamento por enquanto</h3><p>{{user.tipo==='advogado' ? 'Novas solicitações de clientes aparecerão aqui.' : 'Escolha um advogado e envie sua primeira solicitação.'}}</p></div></ng-template>
    </main>
  </div></section>`,
  styles: [`
    .schedule-section{background:#f7f8f9}.schedule-grid{display:grid;grid-template-columns:1fr;gap:24px;max-width:980px}.schedule-grid.client-grid{grid-template-columns:360px 1fr;max-width:1120px;align-items:start}.new-card{padding:22px;box-shadow:none;position:sticky;top:94px}.card-head{display:flex;gap:12px;padding-bottom:18px;border-bottom:1px solid #e7eaed;margin-bottom:18px}.card-head>span{width:42px;height:42px;border-radius:9px;background:#f1e8dc;display:grid;place-items:center}.card-head h2,.section-title-row h2{color:#0d2740;margin:0 0 5px;font-size:1.3rem}.card-head p,.section-title-row p{margin:0;color:#778391;font-size:.85rem}.form-stack{display:grid;gap:14px}.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.field small{font-weight:500;color:#8a94a0}.mode-options{display:grid;grid-template-columns:1fr 1fr;gap:8px}.mode-options label{border:1px solid #d9dee4;border-radius:8px;padding:10px;display:flex;align-items:center;gap:7px;cursor:pointer;font-size:.82rem}.mode-options input{width:auto}.mode-options label:has(input:checked){border-color:#0d2740;background:#f4f7f9}.mode-options .disabled{opacity:.45;cursor:not-allowed}.section-title-row{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:14px}.legend{font-size:.72rem;color:#7c8794;display:flex;align-items:center;gap:6px}.dot{width:8px;height:8px;border-radius:50%;display:inline-block}.dot.pending{background:#ca8b2c}.dot.confirmed{background:#23805f;margin-left:8px}.cards{display:grid;gap:12px}.appointment{padding:18px;display:grid;grid-template-columns:70px 1fr;gap:16px;box-shadow:none}.date-box{border:1px solid #e1e5e9;border-radius:10px;height:70px;display:grid;place-items:center;align-content:center;background:#fbfbfa}.date-box strong{font-size:1.45rem;color:#0d2740}.date-box span{text-transform:uppercase;color:#8a94a0;font-size:.68rem;font-weight:800}.appointment-top{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.appointment-top h3{margin:7px 0 0;color:#0d2740;font-size:1.08rem}.time{color:#0d2740}.status{display:inline-flex;padding:4px 7px;border-radius:999px;font-size:.66rem;font-weight:850;text-transform:uppercase;letter-spacing:.04em}.status.pendente{background:#fff2d9;color:#8b5d15}.status.confirmado{background:#e5f4ed;color:#176b4d}.status.recusado{background:#fde9e7;color:#a4372d}.status.concluido{background:#e9edf1;color:#4f5f6f}.meta{margin:8px 0;color:#73808f;font-size:.8rem}.meta span{margin:0 4px}.note{background:#f7f8f9;border-left:3px solid #d1ad77;padding:9px 11px;color:#657282;font-size:.82rem;line-height:1.5;margin:10px 0}.actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.actions .btn{padding:9px 12px;font-size:.78rem}.btn-soft-danger{background:#fff;color:#a4372d;border:1px solid #ecc7c3}.empty{text-align:center;padding:58px 24px;color:#7c8794;box-shadow:none}.empty span{font-size:2.4rem}.empty h3{color:#0d2740;margin:12px 0 5px}.empty p{margin:0}.success{margin:0;font-size:.82rem}
    @media(max-width:900px){.schedule-grid.client-grid{grid-template-columns:1fr}.new-card{position:static}.schedule-list{min-width:0}}
    @media(max-width:600px){.section-title-row{align-items:flex-start;flex-direction:column}.legend{display:none}.appointment{grid-template-columns:52px 1fr;padding:14px}.date-box{height:54px}.date-box strong{font-size:1.1rem}.appointment-top{flex-direction:column;gap:4px}.actions .btn{width:100%}.two,.mode-options{grid-template-columns:1fr}}
  `]
})
export class AgendamentosComponent {
  user: any;
  advogados: Advogado[] = [];
  agendamentos: Agendamento[] = [];
  advogadoId = 0;
  data = '';
  horario = '14:00';
  modalidade: ModalidadeAgendamento = 'online';
  observacao = '';
  mensagem = '';
  hoje = new Date().toISOString().slice(0, 10);

  constructor(
    private auth: AuthService,
    private service: AgendamentoService,
    private advogadoService: AdvogadoService,
    route: ActivatedRoute
  ) {
    this.user = this.auth.currentUser();
    this.advogados = this.advogadoService.getAll();
    this.advogadoId = Number(route.snapshot.queryParamMap.get('advogado') || 0);
    this.syncModalidade();
    this.reload();
  }

  get selectedAdvogado(): Advogado | undefined { return this.advogadoService.getById(Number(this.advogadoId)); }
  get podeCriar(): boolean { return !!this.selectedAdvogado && !!this.data && !!this.horario && !!this.modalidade; }

  syncModalidade(): void {
    const a = this.selectedAdvogado;
    if (!a) return;
    if (this.modalidade === 'online' && !a.atendimentoOnline && a.atendimentoPresencial) this.modalidade = 'presencial';
    if (this.modalidade === 'presencial' && !a.atendimentoPresencial && a.atendimentoOnline) this.modalidade = 'online';
  }

  criar(): void {
    const a = this.selectedAdvogado;
    if (!a || !this.podeCriar) return;
    this.service.create({
      clienteEmail: this.user.email,
      clienteNome: this.user.nome,
      advogadoEmail: a.email,
      advogadoNome: a.nome,
      advogadoId: a.id,
      data: this.data,
      horario: this.horario,
      modalidade: this.modalidade,
      observacao: this.observacao.trim()
    });
    this.mensagem = 'Solicitação enviada. O advogado receberá uma notificação.';
    this.observacao = '';
    this.data = '';
    this.reload();
  }

  alterar(a: Agendamento, status: StatusAgendamento): void {
    this.service.updateStatus(a.id, status);
    this.reload();
  }

  statusLabel(status: StatusAgendamento): string {
    return ({ pendente: 'Aguardando', confirmado: 'Confirmado', recusado: 'Recusado', concluido: 'Concluído' } as Record<StatusAgendamento, string>)[status];
  }

  private reload(): void { this.agendamentos = this.service.getForUser(this.user.email, this.user.tipo); }
}
