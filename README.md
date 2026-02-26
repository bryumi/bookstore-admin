# 🎛️ Painel Administrativo - Livraria Elegante

Sistema completo de administração para a Livraria Elegante, desenvolvido com Next.js 14, React 18 e Tailwind CSS.

## ✨ Funcionalidades

### 📊 Dashboard
- **Visão Geral de Vendas**: Métricas em tempo real de receita, pedidos, clientes e produtos
- **Gráficos Interativos**: Visualização de vendas mensais, distribuição por categoria
- **Top Produtos**: Ranking dos livros mais vendidos
- **Pedidos Recentes**: Acompanhamento dos últimos pedidos

### 📦 Gerenciamento de Pedidos
- Visualização completa de todos os pedidos
- Filtros por status (Pendente, Processando, Enviado, Entregue, Cancelado)
- Busca por ID ou nome do cliente
- Atualização de status em tempo real
- Estatísticas de pedidos por status

### 📚 Cadastro de Produtos
- CRUD completo de produtos (Criar, Ler, Atualizar, Deletar)
- Grid visual com cards de produtos
- Busca por título, autor ou ISBN
- Indicadores de estoque (Esgotado, Estoque Baixo, Em Estoque)
- Modal de cadastro/edição com validação

### 👥 Lista de Clientes
- Visualização completa da base de clientes
- Estatísticas: Total de clientes, clientes ativos, ticket médio
- Filtros por status (Ativo/Inativo)
- Busca por nome, email ou telefone
- Informações detalhadas: total de pedidos e gastos

### 🔄 Gerenciamento de Devoluções
- Lista de todas as solicitações de devolução
- Estados: Pendente, Aprovado, Rejeitado, Reembolsado
- Aprovação/rejeição rápida
- Processamento de reembolsos
- Visualização de motivos e valores

## 🎨 Design

### Paleta de Cores (Tema Dark/Cyberpunk)
- **Background**: Tons escuros (#0F1419, #1A1F2E, #252B3B)
- **Accent Blue**: #3B82F6
- **Accent Purple**: #8B5CF6
- **Accent Green**: #10B981
- **Accent Red**: #EF4444
- **Accent Orange**: #F59E0B
- **Accent Cyan**: #06B6D4

### Tipografia
- **Display**: Rajdhani (Headers e títulos)
- **Body**: Inter (Conteúdo e UI)
- **Mono**: JetBrains Mono (Códigos e IDs)

### Características Visuais
- Background com padrão de grid
- Cards com gradientes e bordas iluminadas
- Animações suaves e micro-interações
- Sidebar responsiva e colapsável
- Header com busca e notificações
- Gráficos interativos com Recharts

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Navegue até a pasta do projeto:
```bash
cd bookstore-admin
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3001](http://localhost:3001) no navegador

**Nota**: O painel admin roda na porta 3001 para não conflitar com o e-commerce (porta 3000)

## 📁 Estrutura do Projeto

```
bookstore-admin/
├── app/
│   ├── page.tsx              # Dashboard principal
│   ├── orders/
│   │   └── page.tsx          # Gerenciamento de pedidos
│   ├── products/
│   │   └── page.tsx          # CRUD de produtos
│   ├── customers/
│   │   └── page.tsx          # Lista de clientes
│   ├── returns/
│   │   └── page.tsx          # Gerenciamento de devoluções
│   ├── globals.css           # Estilos globais
│   └── layout.tsx            # Layout raiz
├── components/
│   ├── Sidebar.tsx           # Navegação lateral
│   └── Header.tsx            # Cabeçalho com busca
├── lib/
│   └── admin-context.tsx     # Context API para dados
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca para interfaces
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utility-first
- **Recharts**: Biblioteca de gráficos
- **Context API**: Gerenciamento de estado global

## 📊 Recursos do Dashboard

### Cards de Estatísticas
- Receita total com tendência percentual
- Total de pedidos
- Total de clientes
- Pedidos pendentes (alertas)

### Gráficos
- **Line Chart**: Vendas mensais (vendas e pedidos)
- **Pie Chart**: Distribuição de vendas por categoria
- **Bar Chart**: Top 5 produtos mais vendidos

### Listas
- Pedidos recentes com status
- Produtos mais vendidos

## 🔐 Recursos de Segurança

- Validação de formulários
- Confirmação antes de deletar produtos
- Estados de loading para operações assíncronas
- Mensagens de erro e sucesso

## 📱 Responsividade

- Layout adaptável para desktop, tablet e mobile
- Sidebar colapsável em telas menores
- Tabelas com scroll horizontal
- Grid responsivo de produtos

## 🎯 Próximas Melhorias

- [ ] Autenticação de administradores
- [ ] Upload de imagens de produtos
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Notificações em tempo real
- [ ] Sistema de permissões
- [ ] Backup e restore de dados
- [ ] Analytics avançados
- [ ] Integração com gateway de pagamento

## 💡 Dicas de Uso

1. **Dashboard**: Visualize métricas em tempo real
2. **Pedidos**: Atualize status com dropdown rápido
3. **Produtos**: Use o modal para edição rápida
4. **Clientes**: Filtre por status para segmentação
5. **Devoluções**: Aprove/rejeite com um clique

## 📝 Licença

Este projeto é um exemplo educacional e está disponível para uso livre.

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ usando Next.js, React, TypeScript e Tailwind CSS.

---

**Dica Pro**: Execute o e-commerce e o admin simultaneamente para testar a experiência completa:
- E-commerce: `http://localhost:3000`
- Admin: `http://localhost:3001`
