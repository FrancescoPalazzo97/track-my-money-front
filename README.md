# Track My Money - Frontend

React 19 + TypeScript frontend per un'applicazione di gestione finanziaria personale con supporto multi-valuta e localizzazione italiana.

## Tecnologie

- **React 19** - Framework UI con React Compiler per prestazioni ottimizzate
- **TypeScript** - Type safety e migliore developer experience
- **Vite** - Build tool veloce con Hot Module Replacement
- **Zustand** - State management con pattern slices e middleware Immer
- **Zod** - Validazione runtime e inferenza tipi TypeScript
- **Axios** - Client HTTP con interceptors per gestione errori
- **Tailwind CSS v4** - Utility-first CSS framework con Vite plugin
- **Day.js** - Manipolazione date leggera
- **React Router DOM** - Routing client-side

## Requisiti

- Node.js (versione consigliata: >= 18)
- npm o yarn
- Backend track-my-money in esecuzione (default: `http://localhost:3000`)

## Setup

1. Clona il repository
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Crea un file `.env` nella root del progetto:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```
4. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

## Comandi Disponibili

```bash
npm run dev      # Avvia Vite dev server con HMR (http://localhost:5173)
npm run build    # Compila TypeScript e build per produzione
npm run lint     # Esegui ESLint sul codebase
npm run preview  # Preview del build di produzione in locale
```

## Architettura

### Struttura del Progetto

```
src/
├── App.tsx              # Componente root
├── main.tsx            # Entry point React
├── lib/
│   └── axiosClient.ts  # Client HTTP configurato con interceptors
├── schemas/
│   └── api.schemas.ts  # Schema Zod per validazione runtime
├── services/
│   ├── categories.service.ts    # API service per categorie
│   ├── transactions.service.ts  # API service per transazioni
│   └── index.ts                 # Barrel exports
├── store/
│   ├── useStore.ts          # Store Zustand principale
│   └── categoriesSlice.ts   # Slice categorie con state e actions
└── types/
    ├── api.types.ts     # Tipi TypeScript inferiti da Zod
    └── store.ts         # Tipi per Zustand store
```

### State Management con Zustand

L'applicazione usa il **pattern slices** per organizzare lo stato globale:

- Ogni dominio (categorie, transazioni) ha il proprio slice file
- Gli slice combinano state e actions in un unico tipo (es. `TCategoriesSlice`)
- Il middleware Immer permette mutazioni dirette dello state con immutabilità automatica
- Store principale in `useStore.ts` combina tutti gli slice

**Esempio di slice:**
```typescript
export const createCategoriesSlice: StateCreator<
  TCategoriesSlice,
  [['zustand/immer', never]],  // Necessario per supporto Immer
  [],
  TCategoriesSlice
> = (set) => ({
  categories: [],
  isLoading: false,
  fetchCategories: async (group?: boolean) => {
    set({ isLoading: true });
    const res = await categoriesService.getAll(group);
    set({ categories: res, isLoading: false });
  }
})
```

### Flusso Dati

1. **Componente** → chiama azione store via `useStore(s => s.fetchCategories)`
2. **Store action** → chiama funzione service
3. **Service** → usa `apiClient` per HTTP request
4. **API Client** → invia richiesta al backend, gestisce errori
5. **Response** → Service restituisce dati tipizzati → Store aggiorna state → Componente re-render

### Type Safety

- **Schema Zod** (`api.schemas.ts`) - Validazione runtime con messaggi in italiano
- **Tipi TypeScript** (`api.types.ts`) - Inferiti da Zod usando `z.infer<>`
- **Store types** (`store.ts`) - Combinazione di tutti i tipi degli slice
- API responses seguono: `{ success: boolean, data?: T, message?: string, error?: string }`

## Funzionalità Principali

### Gestione Categorie

- Supporto gerarchico con categorie padre/figlio
- Tipi: income (entrate) / expense (uscite)
- Query parameter `?group=true` per struttura gerarchica

### Gestione Transazioni

- Supporto multi-valuta (120+ valute: fiat + crypto)
- Conversione valuta opzionale tramite parametro `baseCurrency`
- Filtri per range di date (`startDate`, `endDate`)
- Collegamento a categorie

### Client API

Axios client configurato con:
- Base URL da variabile ambiente
- Interceptors per gestione errori automatica
- Messaggi di errore in italiano
- Metodi generici tipizzati (get, post, patch, put, delete)

## Integrazione Backend

L'applicazione si integra con il backend Node.js/Express:

- **Endpoint Categorie**: `/categories`
  - GET `/categories?group=true` - Lista gerarchica
  - GET `/categories/:id` - Singola categoria
  - POST, PATCH, DELETE - CRUD operations

- **Endpoint Transazioni**: `/transactions`
  - GET `/transactions?startDate=...&endDate=...&baseCurrency=EUR`
  - GET `/transactions/:id?baseCurrency=EUR`
  - POST, PATCH, DELETE - CRUD operations

## Sviluppo

### ESLint Configuration

Per produzione, considera di abilitare regole type-aware in `eslint.config.js`:

```js
export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // o per regole più stringenti:
      tseslint.configs.strictTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### TypeScript Configuration

Il progetto usa TypeScript 5.9 con:
- Strict mode abilitato
- Project references per separare configurazioni app/node
- Path aliases configurabili

## Note di Localizzazione

L'intera applicazione è localizzata in italiano:
- Messaggi di validazione Zod
- Errori HTTP dall'API client
- Log di debug nella console
- Messaggi di risposta API

## Link Utili

- [Vite Documentation](https://vite.dev/)
- [React 19 Docs](https://react.dev/)
- [Zustand Documentation](https://zustand.docs.pmnd.rs/)
- [Zod Documentation](https://zod.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
