import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AdvogadoService } from '../../core/services/advogado.service';

@Component({
  selector:'app-cadastro', standalone:true, imports:[FormsModule,RouterLink],
  template:`
  <section class="signup-shell">
    <div class="container signup-grid">
      <form class="signup-form" (ngSubmit)="submit()">
        <a class="back" routerLink="/">← Voltar</a>
        <div class="eyebrow">CRIAR CONTA</div>
        <h1>Comece pelo seu perfil.</h1>
        <p class="intro">Escolha o tipo de conta e preencha as informações básicas.</p>

        <div class="type-switch">
          <button type="button" [class.active]="tipo==='cliente'" (click)="tipo='cliente'">Sou cliente</button>
          <button type="button" [class.active]="tipo==='advogado'" (click)="tipo='advogado'">Sou advogado</button>
        </div>

        <div class="form-grid">
          <div class="field full"><label>Nome completo</label><input name="nome" [(ngModel)]="nome" required placeholder="Seu nome completo"></div>
          <div class="field"><label>E-mail</label><input type="email" name="email" [(ngModel)]="email" required placeholder="seuemail@exemplo.com"></div>
          <div class="field"><label>Senha</label><input type="password" name="senha" [(ngModel)]="senha" required minlength="6" placeholder="Mínimo de 6 caracteres"></div>
          <div class="field"><label>Cidade</label><input name="cidade" [(ngModel)]="cidade" required placeholder="Ex.: Salvador"></div>
          <div class="field"><label>UF</label><select name="uf" [(ngModel)]="uf">@for(item of ufs; track item){<option [value]="item">{{item}}</option>}</select></div>
          @if(tipo==='advogado'){
            <div class="field"><label>Número da OAB</label><input name="oab" [(ngModel)]="oab" required placeholder="Ex.: OAB/BA 123456"></div>
            <div class="field"><label>Especialidade principal</label><select name="especialidade" [(ngModel)]="especialidade">@for(item of areas;track item){<option>{{item}}</option>}</select></div>
          }
          <div class="field full consent"><label><input type="checkbox" name="lgpd" [(ngModel)]="consentimento"> <span>Li e concordo com a <a routerLink="/lgpd">Política de Privacidade (LGPD)</a> e com o tratamento dos dados para funcionamento da plataforma.</span></label></div>
        </div>
        @if(message){<p [class.error]="!ok" [class.success]="ok">{{message}}</p>}
        <button class="btn btn-gold submit" [disabled]="!consentimento">Criar conta</button>
        <p class="helper center">Já tem uma conta? <a routerLink="/login">Entrar</a></p>
      </form>

      <aside class="signup-aside">
        <span>⚖</span>
        <h2>@if(tipo==='advogado'){Apresente sua atuação com clareza.} @else {Encontre profissionais com mais facilidade.}</h2>
        <p>@if(tipo==='advogado'){Depois do cadastro, você terá um painel para adicionar duas qualificações, áreas de atuação, contato e modalidades de atendimento.} @else {Pesquise por especialidade e localização, conheça perfis e escolha como entrar em contato.}</p>
      </aside>
    </div>
  </section>`,
  styles:[`
    .signup-shell{padding:40px 0 20px}.signup-grid{max-width:980px;display:grid;grid-template-columns:1.15fr .65fr;background:#fff;border:1px solid #e3e6ea;border-radius:14px;overflow:hidden;box-shadow:0 18px 50px rgba(13,39,64,.08)}.signup-form{padding:40px 44px}.back{display:inline-block;color:#667487;font-size:.86rem;margin-bottom:30px;font-weight:700}.signup-form h1{font-size:2.25rem;color:#0d2740;margin:0 0 8px}.intro{color:#748092;margin:0 0 22px}.type-switch{display:grid;grid-template-columns:1fr 1fr;background:#f2f3f4;border-radius:9px;padding:4px;margin-bottom:22px}.type-switch button{border:0;background:transparent;padding:11px;border-radius:7px;color:#667487;font-weight:800;cursor:pointer}.type-switch button.active{background:#d7af75;color:#172435;box-shadow:0 2px 7px rgba(0,0,0,.06)}.consent label{display:flex;gap:9px;align-items:flex-start;font-weight:500;color:#566477;line-height:1.5}.consent input{width:auto;margin-top:4px}.consent a{color:#0d2740;font-weight:800}.submit{width:100%;margin-top:18px}.center{text-align:center}.center a{font-weight:800;color:#0d2740}.signup-aside{background:linear-gradient(155deg,#0d2740,#173b5b);color:#fff;padding:46px 34px;display:flex;flex-direction:column;justify-content:center}.signup-aside>span{font-size:3rem;color:#d7af75}.signup-aside h2{font-size:2rem;line-height:1.2;margin:20px 0 12px}.signup-aside p{color:#d1dbe4;line-height:1.75}
    @media(max-width:820px){.signup-grid{grid-template-columns:1fr}.signup-aside{display:none}.signup-form{padding:30px 22px}}
  `]
})
export class CadastroComponent {
  tipo:'cliente'|'advogado'='cliente';
  nome=''; cidade='Salvador'; uf='BA'; email=''; senha=''; oab='';
  especialidade='Direito do Consumidor'; consentimento=false; message=''; ok=false;
  readonly ufs=['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
  readonly areas=['Direito do Consumidor','Direito de Família','Direito Trabalhista','Direito Previdenciário','Direito Penal','Direito Civil','Direito Empresarial'];

  constructor(private auth:AuthService, private advogados:AdvogadoService, private router:Router){}

  submit(){
    if(!this.consentimento){this.message='Você precisa aceitar a política de privacidade.';this.ok=false;return;}
    if(this.tipo==='advogado' && !this.oab.trim()){this.message='Informe o número da OAB.';this.ok=false;return;}

    const r=this.auth.register({
      nome:this.nome,email:this.email,senha:this.senha,tipo:this.tipo,cidade:this.cidade,uf:this.uf,
      oab:this.oab,especialidade:this.especialidade,consentimentoLgpd:true
    });
    this.message=r.message; this.ok=r.ok;

    if(r.ok){
      if(this.tipo==='advogado'){
        this.advogados.criarPerfilInicial({nome:this.nome,email:this.email,cidade:this.cidade,uf:this.uf,oab:this.oab,especialidade:this.especialidade});
        setTimeout(()=>this.router.navigate(['/painel-advogado']),300);
      } else setTimeout(()=>this.router.navigate(['/perfil']),300);
    }
  }
}
