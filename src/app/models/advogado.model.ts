export interface Advogado {
  id: number;
  nome: string;
  oab: string;
  uf: string;
  cidade: string;
  especialidade: string;
  especialidadeSecundaria?: string;
  descricao: string;
  email: string;
  telefone?: string;
  whatsapp?: string;
  qualificacao1?: string;
  qualificacao2?: string;
  anosExperiencia?: number;
  atendimentoOnline?: boolean;
  atendimentoPresencial?: boolean;
  destaque?: boolean;
  iniciais: string;
}
