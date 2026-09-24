export type TipoNotificacao = 'mensagem' | 'agendamento' | 'sistema';

export interface Notificacao {
  id: number;
  usuarioEmail: string;
  tipo: TipoNotificacao;
  titulo: string;
  texto: string;
  data: string;
  lida: boolean;
  link?: string;
}
