import { Injectable } from '@angular/core';
import { Mensagem, ConversaResumo } from '../../models/mensagem.model';
import { NotificacaoService } from './notificacao.service';
import { AuthService } from './auth.service';
import { AdvogadoService } from './advogado.service';

@Injectable({ providedIn: 'root' })
export class MensagemService {
  private readonly key = 'jusacesso_mensagens';

  constructor(
    private notificacoes: NotificacaoService,
    private auth: AuthService,
    private advogados: AdvogadoService
  ) {
    this.seedDemo();
  }

  getAll(): Mensagem[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getConversation(emailA: string, emailB: string): Mensagem[] {
    const a = emailA.toLowerCase();
    const b = emailB.toLowerCase();
    return this.getAll()
      .filter(m => {
        const r = m.remetenteEmail.toLowerCase();
        const d = m.destinatarioEmail.toLowerCase();
        return (r === a && d === b) || (r === b && d === a);
      })
      .sort((x, y) => x.data.localeCompare(y.data));
  }

  send(remetenteEmail: string, destinatarioEmail: string, texto: string): Mensagem | null {
    const clean = texto.trim();
    if (!clean) return null;
    const items = this.getAll();
    const msg: Mensagem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      remetenteEmail,
      destinatarioEmail,
      texto: clean,
      data: new Date().toISOString(),
      lida: false
    };
    items.push(msg);
    localStorage.setItem(this.key, JSON.stringify(items));

    const remetente = this.displayName(remetenteEmail);
    this.notificacoes.add(
      destinatarioEmail,
      'mensagem',
      'Nova mensagem',
      `${remetente} enviou uma nova mensagem.`,
      `/mensagens?com=${encodeURIComponent(remetenteEmail)}`
    );
    return msg;
  }

  markConversationRead(usuarioEmail: string, outroEmail: string): void {
    const u = usuarioEmail.toLowerCase();
    const o = outroEmail.toLowerCase();
    const items = this.getAll();
    let changed = false;
    for (const m of items) {
      if (m.destinatarioEmail.toLowerCase() === u && m.remetenteEmail.toLowerCase() === o && !m.lida) {
        m.lida = true;
        changed = true;
      }
    }
    if (changed) localStorage.setItem(this.key, JSON.stringify(items));
  }

  unreadCount(email: string): number {
    const e = email.toLowerCase();
    return this.getAll().filter(m => m.destinatarioEmail.toLowerCase() === e && !m.lida).length;
  }

  getConversations(email: string): ConversaResumo[] {
    const e = email.toLowerCase();
    const related = this.getAll().filter(m => m.remetenteEmail.toLowerCase() === e || m.destinatarioEmail.toLowerCase() === e);
    const byParticipant = new Map<string, Mensagem[]>();
    for (const m of related) {
      const other = m.remetenteEmail.toLowerCase() === e ? m.destinatarioEmail : m.remetenteEmail;
      const key = other.toLowerCase();
      byParticipant.set(key, [...(byParticipant.get(key) || []), m]);
    }

    return Array.from(byParticipant.entries()).map(([participant, msgs]) => {
      msgs.sort((a, b) => a.data.localeCompare(b.data));
      const last = msgs[msgs.length - 1];
      const isAdv = !!this.advogados.getByEmail(participant);
      return {
        participanteEmail: participant,
        participanteNome: this.displayName(participant),
        participanteTipo: isAdv ? 'advogado' : 'cliente',
        ultimaMensagem: last.texto,
        ultimaData: last.data,
        naoLidas: msgs.filter(m => m.destinatarioEmail.toLowerCase() === e && !m.lida).length
      } as ConversaResumo;
    }).sort((a, b) => b.ultimaData.localeCompare(a.ultimaData));
  }

  interestedClients(advogadoEmail: string): { email: string; nome: string; ultimaInteracao: string }[] {
    const adv = advogadoEmail.toLowerCase();
    const map = new Map<string, string>();
    for (const m of this.getAll()) {
      const r = m.remetenteEmail.toLowerCase();
      const d = m.destinatarioEmail.toLowerCase();
      if (r === adv || d === adv) {
        const other = r === adv ? d : r;
        if (!this.advogados.getByEmail(other)) {
          const current = map.get(other);
          if (!current || m.data > current) map.set(other, m.data);
        }
      }
    }
    return Array.from(map.entries())
      .map(([email, ultimaInteracao]) => ({ email, nome: this.displayName(email), ultimaInteracao }))
      .sort((a, b) => b.ultimaInteracao.localeCompare(a.ultimaInteracao));
  }

  displayName(email: string): string {
    const user = this.auth.getUserByEmail(email);
    if (user?.nome) return user.nome;
    const advogado = this.advogados.getByEmail(email);
    if (advogado?.nome) return advogado.nome;
    return email.split('@')[0];
  }

  private seedDemo(): void {
    if (localStorage.getItem(this.key)) return;
    const now = Date.now();
    const demo: Mensagem[] = [
      {
        id: 101,
        remetenteEmail: 'demo@jusacesso.com',
        destinatarioEmail: 'advogado@jusacesso.com',
        texto: 'Olá, gostaria de saber se você atende questões relacionadas a cobrança indevida.',
        data: new Date(now - 1000 * 60 * 60 * 2).toISOString(),
        lida: false
      },
      {
        id: 102,
        remetenteEmail: 'advogado@jusacesso.com',
        destinatarioEmail: 'demo@jusacesso.com',
        texto: 'Olá! Sim, essa é uma das áreas em que atuo. Podemos conversar por aqui e organizar um horário.',
        data: new Date(now - 1000 * 60 * 55).toISOString(),
        lida: false
      }
    ];
    localStorage.setItem(this.key, JSON.stringify(demo));
  }
}
