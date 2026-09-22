import { Injectable } from '@angular/core';
import { Advogado } from '../../models/advogado.model';

@Injectable({ providedIn: 'root' })
export class AdvogadoService {
  private readonly key = 'jusacesso_advogados';
  private readonly seedKey = 'jusacesso_advogados_seed';
  private readonly seedVersion = 'bahia-v3';

  constructor() {
    this.ensureDemoProfiles();
  }

  getAll(): Advogado[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getById(id: number): Advogado | undefined {
    return this.getAll().find(a => a.id === id);
  }

  getByEmail(email: string): Advogado | undefined {
    return this.getAll().find(a => a.email.toLowerCase() === email.toLowerCase());
  }

  criarPerfilInicial(dados: {
    nome: string;
    email: string;
    cidade: string;
    uf?: string;
    oab: string;
    especialidade: string;
  }): Advogado {
    const existente = this.getByEmail(dados.email);
    if (existente) return existente;

    const perfil: Advogado = {
      id: Date.now(),
      nome: dados.nome,
      email: dados.email,
      cidade: dados.cidade,
      uf: dados.uf || 'BA',
      oab: dados.oab || 'OAB não informada',
      especialidade: dados.especialidade || 'Direito do Consumidor',
      especialidadeSecundaria: '',
      descricao: 'Edite seu perfil no Painel do Advogado para apresentar sua atuação profissional.',
      telefone: '',
      whatsapp: '',
      qualificacao1: '',
      qualificacao2: '',
      anosExperiencia: 0,
      atendimentoOnline: true,
      atendimentoPresencial: true,
      iniciais: this.iniciais(dados.nome)
    };

    const todos = this.getAll();
    todos.push(perfil);
    this.save(todos);
    return perfil;
  }

  updateByEmail(email: string, changes: Partial<Advogado>): Advogado | null {
    const todos = this.getAll();
    const index = todos.findIndex(a => a.email.toLowerCase() === email.toLowerCase());
    if (index < 0) return null;

    const atualizado: Advogado = {
      ...todos[index],
      ...changes,
      email: todos[index].email,
      id: todos[index].id,
      iniciais: this.iniciais(changes.nome || todos[index].nome)
    };

    todos[index] = atualizado;
    this.save(todos);
    return atualizado;
  }

  private ensureDemoProfiles(): void {
    const currentSeed = localStorage.getItem(this.seedKey);
    if (currentSeed === this.seedVersion && localStorage.getItem(this.key)) return;

    const existentes: Advogado[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    const cadastradosPeloUsuario = existentes.filter(a => a.id > 1000000);
    const perfis = [...this.demoProfiles(), ...cadastradosPeloUsuario.filter(a => !this.demoProfiles().some(d => d.email === a.email))];
    this.save(perfis);
    localStorage.setItem(this.seedKey, this.seedVersion);
  }

  private save(items: Advogado[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  private iniciais(nome: string): string {
    return nome.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase() || 'AD';
  }

  private demoProfiles(): Advogado[] {
    return [
      {
        id: 1,
        nome: 'João Silva',
        oab: 'OAB/BA 123456',
        uf: 'BA',
        cidade: 'Salvador',
        especialidade: 'Direito do Consumidor',
        especialidadeSecundaria: 'Direito Civil',
        descricao: 'Atuação em relações de consumo, contratos e questões civis, com atendimento online e presencial em Salvador.',
        email: 'advogado@jusacesso.com',
        telefone: '(71) 3000-1001',
        whatsapp: '(71) 90000-1001',
        qualificacao1: 'Pós-graduação em Direito do Consumidor',
        qualificacao2: 'Especialização em Direito Civil',
        anosExperiencia: 6,
        atendimentoOnline: true,
        atendimentoPresencial: true,
        destaque: true,
        iniciais: 'JS'
      },
      {
        id: 2,
        nome: 'Carla Mendes',
        oab: 'OAB/BA 234567',
        uf: 'BA',
        cidade: 'Salvador',
        especialidade: 'Direito de Família',
        especialidadeSecundaria: 'Direito Civil',
        descricao: 'Atuação em questões de família, acordos, guarda e demandas civis, com foco em atendimento acolhedor.',
        email: 'carla.mendes@exemplo.com',
        telefone: '(71) 3000-1002',
        whatsapp: '(71) 90000-1002',
        qualificacao1: 'Especialização em Direito de Família',
        qualificacao2: 'Formação em mediação e conciliação',
        anosExperiencia: 8,
        atendimentoOnline: true,
        atendimentoPresencial: true,
        destaque: true,
        iniciais: 'CM'
      },
      {
        id: 3,
        nome: 'Rafael Almeida',
        oab: 'OAB/BA 345678',
        uf: 'BA',
        cidade: 'Lauro de Freitas',
        especialidade: 'Direito Trabalhista',
        especialidadeSecundaria: 'Direito Previdenciário',
        descricao: 'Atuação em relações de trabalho e orientação previdenciária para clientes de Lauro de Freitas e região.',
        email: 'rafael.almeida@exemplo.com',
        telefone: '(71) 3000-1003',
        whatsapp: '(71) 90000-1003',
        qualificacao1: 'Pós-graduação em Direito do Trabalho',
        qualificacao2: 'Curso de prática previdenciária',
        anosExperiencia: 7,
        atendimentoOnline: true,
        atendimentoPresencial: true,
        destaque: true,
        iniciais: 'RA'
      },
      {
        id: 4,
        nome: 'Mariana Costa',
        oab: 'OAB/BA 456789',
        uf: 'BA',
        cidade: 'Camaçari',
        especialidade: 'Direito do Consumidor',
        especialidadeSecundaria: 'Direito Civil',
        descricao: 'Atendimento em conflitos de consumo, cobranças e questões contratuais em Camaçari e Região Metropolitana.',
        email: 'mariana.costa@exemplo.com',
        qualificacao1: 'Especialização em Relações de Consumo',
        qualificacao2: 'Extensão em Contratos Civis',
        anosExperiencia: 5,
        atendimentoOnline: true,
        atendimentoPresencial: true,
        iniciais: 'MC'
      },
      {
        id: 5,
        nome: 'Lucas Ferreira',
        oab: 'OAB/BA 567890',
        uf: 'BA',
        cidade: 'Simões Filho',
        especialidade: 'Direito Penal',
        especialidadeSecundaria: 'Direito Civil',
        descricao: 'Atuação responsável em demandas da área penal e acompanhamento jurídico em Simões Filho e Salvador.',
        email: 'lucas.ferreira@exemplo.com',
        qualificacao1: 'Especialização em Ciências Criminais',
        qualificacao2: 'Curso de prática processual penal',
        anosExperiencia: 9,
        atendimentoOnline: true,
        atendimentoPresencial: true,
        iniciais: 'LF'
      },
      {
        id: 6,
        nome: 'Fernanda Nascimento',
        oab: 'OAB/BA 678901',
        uf: 'BA',
        cidade: 'Feira de Santana',
        especialidade: 'Direito Civil',
        especialidadeSecundaria: 'Direito Empresarial',
        descricao: 'Atuação em contratos, obrigações e demandas civis, com atendimento a pessoas e pequenos negócios.',
        email: 'fernanda.nascimento@exemplo.com',
        qualificacao1: 'Pós-graduação em Direito Civil',
        qualificacao2: 'Especialização em contratos empresariais',
        anosExperiencia: 10,
        atendimentoOnline: true,
        atendimentoPresencial: true,
        iniciais: 'FN'
      }
    ];
  }
}
