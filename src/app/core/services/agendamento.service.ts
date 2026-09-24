import { Injectable } from '@angular/core';
import { Agendamento, ModalidadeAgendamento, StatusAgendamento } from '../../models/agendamento.model';
import { NotificacaoService } from './notificacao.service';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private readonly key = 'jusacesso_agendamentos';

  constructor(private notificacoes: NotificacaoService) {
    this.seedDemo();
  }

  getAll(): Agendamento[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getForUser(email: string, tipo: 'cliente' | 'advogado'): Agendamento[] {
    const e = email.toLowerCase();
    return this.getAll()
      .filter(a => tipo === 'advogado' ? a.advogadoEmail.toLowerCase() === e : a.clienteEmail.toLowerCase() === e)
      .sort((a, b) => `${a.data}T${a.horario}`.localeCompare(`${b.data}T${b.horario}`));
  }

  create(data: {
    clienteEmail: string;
    clienteNome: string;
    advogadoEmail: string;
    advogadoNome: string;
    advogadoId: number;
    data: string;
    horario: string;
    modalidade: ModalidadeAgendamento;
    observacao?: string;
  }): Agendamento {
    const items = this.getAll();
    const item: Agendamento = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      ...data,
      status: 'pendente',
      criadoEm: new Date().toISOString()
    };
    items.push(item);
    this.save(items);
    this.notificacoes.add(
      item.advogadoEmail,
      'agendamento',
      'Nova solicitação de atendimento',
      `${item.clienteNome} solicitou atendimento em ${this.formatDate(item.data)} às ${item.horario}.`,
      '/agendamentos'
    );
    return item;
  }

  updateStatus(id: number, status: StatusAgendamento): Agendamento | null {
    const items = this.getAll();
    const i = items.findIndex(a => a.id === id);
    if (i < 0) return null;
    items[i].status = status;
    const item = items[i];
    this.save(items);
    const labels: Record<StatusAgendamento, string> = {
      pendente: 'está aguardando confirmação',
      confirmado: 'foi confirmado',
      recusado: 'não pôde ser confirmado',
      concluido: 'foi marcado como concluído'
    };
    this.notificacoes.add(
      item.clienteEmail,
      'agendamento',
      'Atualização no agendamento',
      `Seu atendimento com ${item.advogadoNome} ${labels[status]}.`,
      '/agendamentos'
    );
    return item;
  }

  pendingCount(advogadoEmail: string): number {
    return this.getForUser(advogadoEmail, 'advogado').filter(a => a.status === 'pendente').length;
  }

  interestedClients(advogadoEmail: string): { email: string; nome: string; ultimaInteracao: string }[] {
    const e = advogadoEmail.toLowerCase();
    const map = new Map<string, { nome: string; data: string }>();
    for (const a of this.getAll().filter(x => x.advogadoEmail.toLowerCase() === e)) {
      const current = map.get(a.clienteEmail.toLowerCase());
      if (!current || a.criadoEm > current.data) map.set(a.clienteEmail.toLowerCase(), { nome: a.clienteNome, data: a.criadoEm });
    }
    return Array.from(map.entries()).map(([email, v]) => ({ email, nome: v.nome, ultimaInteracao: v.data }));
  }

  private save(items: Agendamento[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  private formatDate(date: string): string {
    if (!date) return '';
    const [y, m, d] = date.split('-');
    return `${d}/${m}/${y}`;
  }

  private seedDemo(): void {
    if (localStorage.getItem(this.key)) return;
    const future = new Date();
    future.setDate(future.getDate() + 2);
    const date = future.toISOString().slice(0, 10);
    const demo: Agendamento[] = [{
      id: 201,
      clienteEmail: 'demo@jusacesso.com',
      clienteNome: 'Usuário Demonstração',
      advogadoEmail: 'advogado@jusacesso.com',
      advogadoNome: 'João Silva',
      advogadoId: 1,
      data: date,
      horario: '14:30',
      modalidade: 'online',
      observacao: 'Gostaria de conversar sobre uma cobrança que não reconheço.',
      status: 'pendente',
      criadoEm: new Date().toISOString()
    }];
    this.save(demo);
  }
}
