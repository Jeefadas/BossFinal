export type StatusAgendamento = 'pendente' | 'confirmado' | 'recusado' | 'concluido';
export type ModalidadeAgendamento = 'online' | 'presencial';

export interface Agendamento {
  id: number;
  clienteEmail: string;
  clienteNome: string;
  advogadoEmail: string;
  advogadoNome: string;
  advogadoId: number;
  data: string;
  horario: string;
  modalidade: ModalidadeAgendamento;
  observacao?: string;
  status: StatusAgendamento;
  criadoEm: string;
}
