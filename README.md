# JusAcesso - Angular

Plataforma front-end em Angular para facilitar a busca por profissionais do Direito, o primeiro contato e a organização de solicitações de atendimento.

## Principais recursos
- Angular com standalone components
- Login e cadastro de cliente/advogado
- Consentimento e página LGPD
- Rotas protegidas com `AuthGuard`
- Rota exclusiva para advogado
- Dashboard do advogado
- Edição de duas qualificações profissionais
- Edição de contato, cidade, UF e modalidades de atendimento
- Busca de advogados por nome, área e cidade
- Perfis demonstrativos de Salvador e Região Metropolitana
- Chat responsivo entre cliente e advogado
- Indicador de mensagens não lidas
- Central de notificações
- Solicitação e gerenciamento de agendamentos
- Status de atendimento: aguardando, confirmado, recusado e concluído
- Área de clientes interessados no painel do advogado
- Favoritos para clientes
- Carrossel de áreas do Direito
- Layout responsivo
- Sem API: dados salvos em `localStorage`

## Como executar
```bash
npm install
npx ng serve
```

Depois acesse:
`http://localhost:4200`

## Contas de demonstração
### Cliente
- E-mail: `demo@jusacesso.com`
- Senha: `123456`

### Advogado
- E-mail: `advogado@jusacesso.com`
- Senha: `123456`

### Como testar o chat e as notificações
1. Entre com a conta de cliente.
2. Abra o perfil de **João Silva** e envie uma mensagem pelo botão **Conversar**.
3. Saia da conta.
4. Entre com a conta de advogado.
5. O painel e o cabeçalho mostrarão a nova mensagem e a notificação.

O mesmo fluxo pode ser usado para testar agendamentos: o cliente solicita um horário e o advogado confirma ou recusa pelo painel de agendamentos.

## Rotas
- `/` - Home
- `/login` - Login
- `/cadastro` - Cadastro
- `/advogados` - Busca de profissionais
- `/advogado/:id` - Perfil público
- `/perfil` - Perfil do cliente
- `/painel-advogado` - Dashboard exclusivo para advogado
- `/mensagens` - Chat protegido
- `/agendamentos` - Solicitações e atendimentos
- `/notificacoes` - Central de notificações
- `/favoritos` - Profissionais salvos
- `/sobre` - Sobre o JusAcesso
- `/lgpd` - Privacidade/LGPD

> Os nomes, contatos e números de OAB dos perfis demonstrativos são fictícios e usados apenas para apresentação do sistema.

> Como esta versão não usa backend, chat, notificações e agendamentos funcionam como uma simulação local no mesmo navegador por meio do `localStorage`. Para uso real entre dispositivos diferentes seria necessário um backend ou serviço em tempo real.
