## A Estrutura de Diretórios Ideal (Feature-Based)

src/
├── assets/             # Estilos globais (main.css), imagens e fontes gerais
├── shared/             # Tudo que é genérico e compartilhado por 2 ou mais módulos
│   ├── components/     # UI Kit básico / Componentes "burros" (ex: AppButton.vue, AppInput.vue, AppModal.vue)
│   ├── composables/    # Hooks globais reutilizáveis (ex: useDebounce.ts, useMediaQuery.ts)
│   ├── services/       # Instância HTTP configurada (ex: api.ts com Axios) e utilitários de rede
│   ├── types/          # Tipos TypeScript globais
│   └── views/          # Telas que não pertencem a nenhuma regra de negócio (ex: NotFoundView.vue)
│
├── modules/            # Módulos de Negócio autônomos (Features)
│   ├── auth/           # Feature de Autenticação
│   │   ├── views/      # Telas acopladas às rotas (ex: LoginView.vue, RegisterView.vue)
│   │   ├── components/ # Componentes locais (ex: LoginForm.vue, RegisterForm.vue, PasswordStrength.vue)
│   │   ├── composables/# Lógica local do módulo (ex: useAuth.ts)
│   │   ├── services/   # Requisições à API exclusivas de Auth (ex: auth.service.ts)
│   │   ├── store/      # Estado global local (Pinia) (ex: auth.store.ts)
│   │   ├── types.ts    # Tipos específicos do módulo
│   │   ├── routes.ts   # Definição das rotas deste módulo
│   │   └── index.ts    # Public API do módulo (Exportador oficial)
│   │
│   ├── campanhas/      # Feature de Campanhas
│   │   ├── views/      # Telas (ex: CampanhasListView.vue, CampanhaDetailView.vue)
│   │   ├── components/ # Componentes locais (ex: CampanhaCard.vue, CampanhaFilters.vue)
│   │   ├── composables/# Lógica local (ex: useCampanhas.ts)
│   │   ├── services/   # Chamadas de API (ex: campanhas.service.ts)
│   │   ├── store/      # Pinia store do módulo
│   │   ├── types.ts    
│   │   ├── routes.ts   
│   │   └── index.ts    
│   │
│   └── dashboard/      # O Dashboard vira uma Feature!
│       ├── views/      # Tela do dashboard (ex: DashboardView.vue)
│       ├── components/ # Componentes locais (ex: MetricsChart.vue, SummaryCards.vue)
│       ├── routes.ts
│       └── index.ts
│
├── router/             # Configuração global de rotas
│   ├── guards.ts       # Guards de autenticação (permissões de rotas)
│   └── index.ts        # Junta as rotas exportadas de cada módulo
│
├── App.vue             # Componente raiz da aplicação
└── main.ts             # Ponto de entrada (Bootstrap do Vue)
