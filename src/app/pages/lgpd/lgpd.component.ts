import { Component } from '@angular/core';

@Component({
  selector: 'app-lgpd',
  standalone: true,
  template: `
    <section class="privacy-hero">
      <div class="container hero-content">
        <div class="eyebrow">PRIVACIDADE NO JUSACESSO</div>
        <h1>Seus dados, de forma clara.</h1>
        <p>
          Aqui você entende quais informações fazem parte da sua experiência no JusAcesso,
          o que pode aparecer no seu perfil e o que continua privado.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container privacy-layout">
        <aside class="summary card">
          <span class="summary-label">RESUMO RÁPIDO</span>
          <h2>O JusAcesso usa apenas os dados necessários para o funcionamento da plataforma.</h2>
          <p>
            Cadastro, perfil profissional, mensagens, favoritos e solicitações de atendimento
            fazem parte da experiência do sistema.
          </p>

          <div class="summary-item">
            <strong>Cliente</strong>
            <span>Seus dados pessoais não aparecem na busca pública de profissionais.</span>
          </div>
          <div class="summary-item">
            <strong>Advogado</strong>
            <span>As informações profissionais escolhidas para o perfil ficam visíveis aos clientes.</span>
          </div>
          <div class="summary-item">
            <strong>Esta versão</strong>
            <span>As informações ficam salvas somente no navegador utilizado.</span>
          </div>
        </aside>

        <div class="content">
          <article class="privacy-card card">
            <div class="number">01</div>
            <div>
              <h2>Cadastro e acesso à conta</h2>
              <p>
                Para criar uma conta, o JusAcesso utiliza informações como nome, e-mail, senha,
                cidade e tipo de usuário. Esses dados permitem identificar a conta e manter a sessão
                enquanto você utiliza o sistema.
              </p>
            </div>
          </article>

          <article class="privacy-card card">
            <div class="number">02</div>
            <div>
              <h2>O que aparece no perfil do advogado?</h2>
              <p>
                O perfil profissional pode mostrar nome, número da OAB, cidade, áreas de atuação,
                qualificações, experiência, formas de atendimento e contatos cadastrados pelo próprio
                advogado. Essas informações existem para ajudar o cliente a escolher um profissional.
              </p>
              <div class="note">
                O advogado controla essas informações pelo seu painel e pode atualizá-las quando necessário.
              </div>
            </div>
          </article>

          <article class="privacy-card card">
            <div class="number">03</div>
            <div>
              <h2>Mensagens e solicitações de atendimento</h2>
              <p>
                Quando cliente e advogado usam o chat, o conteúdo da conversa fica associado aos dois
                usuários para que o histórico possa ser exibido. Solicitações de atendimento também
                guardam informações como profissional escolhido, data, horário, modalidade e status.
              </p>
              <div class="note warning">
                Para sua segurança, evite enviar senhas, dados bancários ou documentos pessoais pelo chat.
              </div>
            </div>
          </article>

          <article class="privacy-card card">
            <div class="number">04</div>
            <div>
              <h2>Favoritos e notificações</h2>
              <p>
                Ao favoritar um advogado, o sistema registra essa preferência para que você possa encontrá-lo
                novamente. As notificações são utilizadas para avisar sobre novas mensagens, interesse de
                clientes e mudanças relacionadas aos agendamentos.
              </p>
            </div>
          </article>

          <article class="privacy-card card">
            <div class="number">05</div>
            <div>
              <h2>Onde essas informações ficam?</h2>
              <p>
                Nesta versão do JusAcesso, não existe servidor externo ou banco de dados online. As informações
                são armazenadas no <strong>localStorage</strong> do próprio navegador. Isso significa que os dados
                desta demonstração permanecem neste dispositivo e neste navegador.
              </p>
            </div>
          </article>

          <article class="privacy-card card">
            <div class="number">06</div>
            <div>
              <h2>O que o JusAcesso não faz</h2>
              <div class="checks">
                <span>✓ Não vende informações pessoais.</span>
                <span>✓ Não utiliza os dados para publicidade.</span>
                <span>✓ Não envia as informações desta versão para servidores externos.</span>
                <span>✓ Não torna o perfil de clientes público na busca de advogados.</span>
              </div>
            </div>
          </article>

          <article class="privacy-card card highlight">
            <div class="number">07</div>
            <div>
              <h2>Você continua no controle</h2>
              <p>
                Informações de perfil podem ser atualizadas pelas áreas de edição disponíveis na plataforma.
                Como esta versão funciona localmente, os dados permanecem vinculados ao navegador em que foram
                cadastrados.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .privacy-hero {
      padding: 72px 0 60px;
      background: linear-gradient(135deg, #f8f4ee 0%, #ffffff 60%, #f4eee5 100%);
      border-bottom: 1px solid #ebe5dc;
    }

    .hero-content { max-width: 840px; }
    .eyebrow {
      color: #9a7442;
      font-size: .78rem;
      font-weight: 800;
      letter-spacing: .13em;
      margin-bottom: 14px;
    }
    .privacy-hero h1 {
      margin: 0 0 14px;
      color: #0b2742;
      font-size: clamp(2rem, 5vw, 3.3rem);
      line-height: 1.05;
    }
    .privacy-hero p {
      margin: 0;
      max-width: 700px;
      color: #667486;
      font-size: 1.05rem;
      line-height: 1.75;
    }

    .privacy-layout {
      display: grid;
      grid-template-columns: 310px minmax(0, 1fr);
      gap: 28px;
      align-items: start;
    }

    .summary {
      position: sticky;
      top: 92px;
      padding: 26px;
      box-shadow: none;
      border: 1px solid #e6e1da;
      background: #fffdfa;
    }
    .summary-label {
      color: #a07846;
      font-size: .72rem;
      font-weight: 800;
      letter-spacing: .12em;
    }
    .summary h2 {
      margin: 10px 0;
      color: #0d2740;
      font-size: 1.2rem;
      line-height: 1.45;
    }
    .summary > p {
      color: #6a7584;
      line-height: 1.65;
      margin: 0 0 22px;
    }
    .summary-item {
      padding: 15px 0;
      border-top: 1px solid #ece7df;
      display: grid;
      gap: 5px;
    }
    .summary-item strong { color: #0d2740; font-size: .92rem; }
    .summary-item span { color: #75808e; line-height: 1.5; font-size: .88rem; }

    .content { display: grid; gap: 14px; }
    .privacy-card {
      padding: 24px;
      display: grid;
      grid-template-columns: 48px minmax(0, 1fr);
      gap: 18px;
      box-shadow: none;
      border: 1px solid #e7e3dd;
    }
    .number {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: #f1e7d8;
      color: #8a6534;
      display: grid;
      place-items: center;
      font-size: .82rem;
      font-weight: 900;
    }
    .privacy-card h2 {
      margin: 2px 0 8px;
      color: #0d2740;
      font-size: 1.08rem;
      font-family: Inter, "Segoe UI", Arial, sans-serif;
    }
    .privacy-card p {
      margin: 0;
      color: #687487;
      line-height: 1.72;
    }
    .note {
      margin-top: 14px;
      padding: 12px 14px;
      border-radius: 10px;
      background: #f8f5f0;
      color: #566578;
      font-size: .9rem;
      line-height: 1.55;
    }
    .warning { border-left: 3px solid #b98a4d; }
    .checks { display: grid; gap: 9px; color: #687487; line-height: 1.55; }
    .checks span::first-letter { color: #9a7442; }
    .highlight {
      background: #0d2a45;
      border-color: #0d2a45;
    }
    .highlight .number { background: #d4ad72; color: #0d2a45; }
    .highlight h2 { color: #ffffff; }
    .highlight p { color: #dbe4ec; }

    @media (max-width: 850px) {
      .privacy-layout { grid-template-columns: 1fr; }
      .summary { position: static; }
    }
    @media (max-width: 560px) {
      .privacy-hero { padding: 48px 0 42px; }
      .privacy-card { grid-template-columns: 1fr; padding: 20px; }
      .summary { padding: 21px; }
    }
  `]
})
export class LgpdComponent {}
