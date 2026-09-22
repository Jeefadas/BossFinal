# JusAcesso - Angular

Plataforma front-end em Angular para facilitar a busca por profissionais do Direito e organizar informações de perfil, contato e áreas de atuação.

## Principais recursos
- Angular standalone components
- Login e cadastro de cliente/advogado
- Consentimento e página LGPD
- Rotas protegidas com AuthGuard
- Rota exclusiva para advogado
- Dashboard do advogado
- Edição de duas qualificações profissionais
- Edição de contato, cidade, UF e modalidades de atendimento
- Busca de advogados por nome, área e cidade
- Perfis demonstrativos de Salvador e Região Metropolitana
- Carrossel de áreas do Direito
- Layout responsivo
- Sem API: dados salvos em localStorage

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

## Rotas
- `/` - Home
- `/login` - Login
- `/cadastro` - Cadastro
- `/advogados` - Busca de profissionais
- `/advogado/:id` - Perfil público
- `/perfil` - Perfil protegido
- `/painel-advogado` - Dashboard exclusivo para advogado
- `/sobre` - Sobre o JusAcesso
- `/lgpd` - Privacidade/LGPD

> Os nomes, contatos e números de OAB dos perfis demonstrativos são fictícios e usados apenas para apresentação do sistema.
