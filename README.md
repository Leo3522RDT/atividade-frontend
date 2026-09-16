# StudioCorte — Sistema Completo de Barbearia

Site e painel administrativo **fiel às imagens** fornecidas, dark theme, 100% funcional.

## Como usar

1. Extraia o ZIP
2. Abra o arquivo `index.html` no navegador (ou use um servidor local)
3. **Login Demo Admin**:  
   - E-mail: `admin@studiocorte.com`  
   - Senha: `demo123`
4. Após login você é redirecionado para o Dashboard Admin

## Páginas incluídas

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| Home pública | `index.html` | Hero + serviços + galeria |
| Serviços | `servicos.html` | Lista completa de serviços e cortes |
| Login | `login.html` | Tela de autenticação com demo |
| Dashboard Admin | `admin/dashboard.html` | Cards, agendamentos, atividades |
| Produtos | `admin/produtos.html` | CRUD completo (adicionar/editar/excluir) |
| Configurações | `admin/configuracoes.html` | Dados do salão editáveis |
| Perfil Cliente | `cliente/perfil.html` | Perfil completo + carrinho funcional |

## Funcionalidades

- Login com validação e redirecionamento por role
- Dashboard com estatísticas e tabelas
- **CRUD de produtos** com localStorage (persiste entre sessões)
- Filtros e busca de produtos
- Configurações salváveis
- Carrinho de compras no perfil do cliente (remover itens)
- Toast de feedback
- Design dark theme fiel às imagens
- Responsivo

## Tecnologias

- HTML5 + CSS3 puro (sem frameworks pesados)
- JavaScript vanilla
- localStorage para persistência
- Google Fonts (Inter)
- Imagens via Unsplash (requer internet)

## Estrutura

```
studiocorte/
├── index.html
├── login.html
├── servicos.html
├── css/styles.css
├── js/app.js
├── admin/
│   ├── dashboard.html
│   ├── produtos.html
│   └── configuracoes.html
└── cliente/
    └── perfil.html
```

Desenvolvido com fidelidade visual máxima às telas originais.
