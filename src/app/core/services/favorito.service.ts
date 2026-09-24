import { Injectable } from '@angular/core';

interface FavoritosPorUsuario { [email: string]: number[]; }

@Injectable({ providedIn: 'root' })
export class FavoritoService {
  private readonly key = 'jusacesso_favoritos';

  private all(): FavoritosPorUsuario {
    return JSON.parse(localStorage.getItem(this.key) || '{}');
  }

  getIds(email: string): number[] {
    return this.all()[email.toLowerCase()] || [];
  }

  isFavorite(email: string, advogadoId: number): boolean {
    return this.getIds(email).includes(advogadoId);
  }

  toggle(email: string, advogadoId: number): boolean {
    const all = this.all();
    const key = email.toLowerCase();
    const current = all[key] || [];
    const exists = current.includes(advogadoId);
    all[key] = exists ? current.filter(id => id !== advogadoId) : [...current, advogadoId];
    localStorage.setItem(this.key, JSON.stringify(all));
    return !exists;
  }
}
