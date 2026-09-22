import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly usersKey = 'jusacesso_users';
  private readonly sessionKey = 'jusacesso_session';

  constructor(private router: Router) {
    const users: Usuario[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');

    const clienteDemo: Usuario = {
      nome: 'Usuário Demonstração', email: 'demo@jusacesso.com', senha: '123456', tipo: 'cliente',
      cidade: 'Salvador', uf: 'BA', consentimentoLgpd: true
    };
    const advogadoDemo: Usuario = {
      nome: 'João Silva', email: 'advogado@jusacesso.com', senha: '123456', tipo: 'advogado',
      cidade: 'Salvador', uf: 'BA', oab: 'OAB/BA 123456', especialidade: 'Direito do Consumidor', consentimentoLgpd: true
    };

    const clienteIndex = users.findIndex(u => u.email === clienteDemo.email);
    if (clienteIndex >= 0) users[clienteIndex] = { ...users[clienteIndex], ...clienteDemo };
    else users.push(clienteDemo);

    const advogadoIndex = users.findIndex(u => u.email === advogadoDemo.email);
    if (advogadoIndex >= 0) users[advogadoIndex] = { ...users[advogadoIndex], ...advogadoDemo };
    else users.push(advogadoDemo);

    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  register(user: Usuario): { ok: boolean; message: string } {
    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
      return { ok: false, message: 'Já existe uma conta com este e-mail.' };
    }
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    this.setSession(user);
    return { ok: true, message: 'Cadastro realizado com sucesso.' };
  }

  login(email: string, senha: string): boolean {
    const user = this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha);
    if (!user) return false;
    this.setSession(user);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean { return !!localStorage.getItem(this.sessionKey); }
  isAdvogado(): boolean { return this.currentUser()?.tipo === 'advogado'; }

  currentUser(): any {
    const raw = localStorage.getItem(this.sessionKey);
    return raw ? JSON.parse(raw) : null;
  }

  private setSession(user: Usuario): void {
    localStorage.setItem(this.sessionKey, JSON.stringify({
      nome: user.nome, email: user.email, tipo: user.tipo, cidade: user.cidade, uf: user.uf
    }));
  }

  private getUsers(): Usuario[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }
}
