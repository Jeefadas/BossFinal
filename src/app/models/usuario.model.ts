export interface Usuario {
  nome: string;
  email: string;
  senha: string;
  tipo: 'cliente' | 'advogado';
  cidade?: string;
  uf?: string;
  oab?: string;
  especialidade?: string;
  consentimentoLgpd: boolean;
}
