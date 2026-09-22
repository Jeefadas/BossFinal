import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const advogadoGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) return router.createUrlTree(['/login']);
  return auth.isAdvogado() ? true : router.createUrlTree(['/perfil']);
};
