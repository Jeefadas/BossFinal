export interface Mensagem {
  id: number;
  remetenteEmail: string;
  destinatarioEmail: string;
  texto: string;
  data: string;
  lida: boolean;
}

export interface ConversaResumo {
  participanteEmail: string;
  participanteNome: string;
  participanteTipo: 'cliente' | 'advogado';
  ultimaMensagem: string;
  ultimaData: string;
  naoLidas: number;
}
