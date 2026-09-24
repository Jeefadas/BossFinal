import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AdvogadosComponent } from './pages/advogados/advogados.component';
import { AdvogadoDetalheComponent } from './pages/advogado-detalhe/advogado-detalhe.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { DashboardAdvogadoComponent } from './pages/dashboard-advogado/dashboard-advogado.component';
import { LgpdComponent } from './pages/lgpd/lgpd.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { MensagensComponent } from './pages/mensagens/mensagens.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { NotificacoesComponent } from './pages/notificacoes/notificacoes.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { authGuard } from './core/guards/auth.guard';
import { advogadoGuard } from './core/guards/advogado.guard';
import { clienteGuard } from './core/guards/cliente.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'advogados', component: AdvogadosComponent },
  { path: 'advogado/:id', component: AdvogadoDetalheComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: 'painel-advogado', component: DashboardAdvogadoComponent, canActivate: [advogadoGuard] },
  { path: 'mensagens', component: MensagensComponent, canActivate: [authGuard] },
  { path: 'agendamentos', component: AgendamentosComponent, canActivate: [authGuard] },
  { path: 'notificacoes', component: NotificacoesComponent, canActivate: [authGuard] },
  { path: 'favoritos', component: FavoritosComponent, canActivate: [clienteGuard] },
  { path: 'lgpd', component: LgpdComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '**', redirectTo: '' }
];
