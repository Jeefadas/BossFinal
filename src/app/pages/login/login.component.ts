import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector:'app-login',standalone:true,imports:[FormsModule,RouterLink],
  template:`
  <section class="auth-shell">
    <div class="container auth-grid">
      <form class="auth-form" (ngSubmit)="submit()">
        <a class="back" routerLink="/">← Voltar para o início</a>
        <div class="eyebrow">ACESSAR CONTA</div>
        <h1>Bem-vindo de volta.</h1>
        <p class="intro">Entre para acessar seu perfil e os recursos disponíveis na plataforma.</p>

        <div class="field"><label>E-mail</label><input type="email" name="email" [(ngModel)]="email" required placeholder="seuemail@exemplo.com"></div>
        <div class="field"><label>Senha</label><input type="password" name="senha" [(ngModel)]="senha" required placeholder="Sua senha"></div>
        @if(error){<p class="error">{{error}}</p>}
        <button class="btn btn-primary submit">Entrar</button>

        <div class="demos">
          <p><strong>Cliente de teste:</strong> demo@jusacesso.com / 123456</p>
          <p><strong>Advogado de teste:</strong> advogado@jusacesso.com / 123456</p>
        </div>
        <p class="helper center">Ainda não tem uma conta? <a routerLink="/cadastro">Cadastre-se</a></p>
      </form>
      <aside class="auth-aside">
        <div class="quote">“</div>
        <h2>Informação aproxima pessoas de seus direitos.</h2>
        <p>O JusAcesso organiza a busca por profissionais e torna o primeiro contato mais simples.</p>
        <div class="brand">⚖ JusAcesso</div>
      </aside>
    </div>
  </section>`,
  styles:[`
    .auth-shell{padding:42px 0 20px}.auth-grid{max-width:900px;display:grid;grid-template-columns:1fr .78fr;min-height:610px;background:#fff;border:1px solid #e3e6ea;border-radius:14px;overflow:hidden;box-shadow:0 18px 50px rgba(13,39,64,.08)}.auth-form{padding:46px}.back{display:inline-block;color:#667487;font-size:.86rem;margin-bottom:46px;font-weight:700}.auth-form h1{color:#0d2740;font-size:2.35rem;margin:0 0 10px}.intro{color:#748092;line-height:1.6;margin:0 0 28px}.field{margin-bottom:16px}.submit{width:100%;margin-top:8px}.demos{margin:18px 0;background:#f7f8f9;border:1px solid #e3e7eb;border-radius:9px;padding:12px 14px;color:#677487;font-size:.8rem}.demos p{margin:4px 0}.demos strong{color:#0d2740}.center{text-align:center}.center a{font-weight:800;color:#0d2740}.auth-aside{background:linear-gradient(155deg,#0d2740,#173b5b);color:#fff;padding:52px 38px;display:flex;flex-direction:column;justify-content:center}.quote{font-family:Georgia,serif;font-size:4rem;color:#d2a768;line-height:.7}.auth-aside h2{font-size:2rem;line-height:1.2;margin:18px 0}.auth-aside p{color:#d0dae3;line-height:1.7}.brand{margin-top:auto;font-family:Georgia,serif;font-size:1.15rem;font-weight:700}
    @media(max-width:760px){.auth-grid{grid-template-columns:1fr}.auth-aside{display:none}.auth-form{padding:30px 22px}.back{margin-bottom:30px}}
  `]
})
export class LoginComponent {
  email=''; senha=''; error='';
  constructor(private auth:AuthService,private router:Router){}
  submit(){
    if(this.auth.login(this.email,this.senha)) this.router.navigate([this.auth.isAdvogado()?'/painel-advogado':'/perfil']);
    else this.error='E-mail ou senha inválidos.';
  }
}
