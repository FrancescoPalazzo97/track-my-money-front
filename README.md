# Track My Money - Frontend

Applicazione React per la gestione delle finanze personali con supporto multi-valuta e categorizzazione gerarchica delle transazioni.

## Indice

- [Caratteristiche Principali](#caratteristiche-principali)
- [Stack Tecnologico](#stack-tecnologico)
- [Prerequisiti](#prerequisiti)
- [Installazione](#installazione)
- [Configurazione](#configurazione)
- [Comandi Disponibili](#comandi-disponibili)
- [Sviluppo Locale](#sviluppo-locale)
- [Architettura](#architettura)
- [Struttura del Progetto](#struttura-del-progetto)
- [State Management](#state-management)
- [Gestione degli Errori](#gestione-degli-errori)
- [Integrazione API](#integrazione-api)
- [Type Safety](#type-safety)
- [Routing](#routing)
- [Styling](#styling)
- [Backend](#backend)

## Caratteristiche Principali

- Tracciamento delle transazioni finanziarie con supporto multi-valuta
- Categorizzazione gerarchica (categorie principali e sotto-categorie)
- Visualizzazione mensile delle transazioni
- Conversione automatica delle valute in EUR
- Distinzione tra entrate e uscite
- Interfaccia utente responsive con Tailwind CSS v4
- Sistema modale per interazioni utente
- Gestione completa degli errori in italiano
- Validazione dei dati con Zod

## Stack Tecnologico

- **React 19** - Libreria UI con functional components e hooks
- **TypeScript** - Type safety e migliore esperienza di sviluppo
- **Vite** - Build tool veloce con HMR
- **Zustand** - State management leggero con pattern slices
- **Immer** - Immutabilità semplificata per lo state
- **React Router DOM v7** - Routing con nested routes
- **Axios** - Client HTTP con interceptors
- **Zod** - Validazione runtime e inferenza tipi
- **Day.js** - Manipolazione date
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Icone

## Prerequisiti

- Node.js (versione consigliata: 18.x o superiore)
- npm o yarn
- Backend track-my-money in esecuzione (default: `http://localhost:3000`)

## Installazione

```bash
# Clona il repository
git clone <repository-url>

# Entra nella directory del progetto
cd track-my-money-front

# Installa le dipendenze
npm install
```

## Configurazione

Crea un file `.env` nella root del progetto:

```env
VITE_API_BASE_URL=http://localhost:3000
```

**Nota:** Se non specificato, l'URL API predefinito è `http://localhost:3000`.

## Comandi Disponibili

```bash
# Avvia il server di sviluppo con HMR
npm run dev

# Compila TypeScript e genera build di produzione
npm run build

# Esegue ESLint sul codice
npm run lint

# Anteprima della build di produzione in locale
npm run preview
```

## Sviluppo Locale

### Setup Completo (Frontend + Backend)

1. **Avvia MongoDB**:
   ```bash
   # Assicurati che MongoDB sia in esecuzione
   mongod
   ```

2. **Avvia il Backend**:
   ```bash
   cd track-my-money-back
   npm install
   npm run dev
   ```

3. **Avvia il Frontend**:
   ```bash
   cd track-my-money-front
   npm install
   npm run dev
   ```

### Verifica Setup

Per verificare che tutto funzioni correttamente:

1. Il frontend dovrebbe caricarsi senza errori nella console
2. Il backend dovrebbe rispondere correttamente alle richieste API
3. MongoDB dovrebbe essere connesso (verifica i log del backend)
4. Le chiamate API dovrebbero completarsi con successo (verifica Network tab nel browser)

## Architettura

### Panoramica

L'applicazione segue un'architettura a layer ben definita:

```
UI Components (React)
       ↓
Store Actions (Zustand)
       ↓
Services Layer
       ↓
API Client (Axios)
       ↓
Backend API
```

### Flusso dei Dati

1. **Component** → Chiama un'azione dello store usando `store(useShallow(s => s.fetchCategories))`
2. **Store Action** → Chiama la funzione del service layer
3. **Service** → Utilizza `apiClient` per effettuare la richiesta HTTP
4. **API Client** → Invia la richiesta al backend e gestisce gli errori
5. **Response** → Il service restituisce dati tipizzati → Lo store aggiorna lo state con Immer → Il component si re-renderizza

### Componenti Principali

- **[src/main.tsx](src/main.tsx)** - Entry point dell'applicazione
- **[src/App.tsx](src/App.tsx)** - Componente root con setup di React Router e lazy loading
- **[src/layouts/DefaultLayout.tsx](src/layouts/DefaultLayout.tsx)** - Layout wrapper con Header, Modal e Outlet

## Struttura del Progetto

```
src/
├── components/          # Componenti React riutilizzabili
│   ├── cards/          # Card per categories e transactions
│   ├── forms/          # Form per input dati
│   ├── lists/          # Liste con skeleton loaders
│   ├── loaders/        # Page loaders
│   ├── skeletons/      # Skeleton components
│   ├── ui/             # Componenti UI base (buttons, links)
│   └── errors/         # Gestione visualizzazione errori
├── layouts/            # Layout templates
├── lib/                # Utilities e configurazioni
│   ├── axiosClient.ts  # Client HTTP configurato
│   ├── tryCatch.ts     # Utility per error handling
│   └── utility.ts      # Funzioni helper
├── pages/              # Componenti pagina
├── schemas/            # Schemi Zod per validazione
├── services/           # Service layer per API
├── store/              # Zustand store e slices
├── types/              # Definizioni TypeScript
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Stili globali
```

## State Management

L'applicazione utilizza **Zustand** con il pattern **slices** per una gestione modulare dello stato.

### Pattern Slices

Ogni dominio ha il proprio slice:

- **categoriesSlice** - Gestione categorie (CRUD, loading state)
- **transactionsSlice** - Gestione transazioni (CRUD, loading state)
- **modalSlice** - Stato e contenuto del modale
- **formSlice** - Stato dei form
- **errorsSlice** - Errori globali dell'applicazione
- **dateSlice** - Data corrente e navigazione mensile
- **transactionFormSlice** - Stato specifico del form transazioni

### Configurazione Immer

**IMPORTANTE**: Tutti gli slice devono usare questa configurazione TypeScript per Immer:

```typescript
import { StateCreator } from 'zustand';
import type { TStore } from '../types/store';

export type TCategoriesSlice = TCategoriesState & TCategoriesActions;

export const createCategoriesSlice: StateCreator<
  TStore,                      // Tipo completo dello store
  [['zustand/immer', never]],  // Config middleware Immer
  [],                          // Nessun altro middleware
  TCategoriesSlice             // Tipo dello slice
> = (set, get) => ({
  // state e actions
});
```

### Utilizzo nello Store

```typescript
import { store } from './store/store';
import { useShallow } from 'zustand/shallow';

function MyComponent() {
  const { categories, fetchCategories } = store(
    useShallow(s => ({
      categories: s.categories,
      fetchCategories: s.fetchCategories
    }))
  );

  // Usa categories e fetchCategories
}
```

**Nota**: Lo store è esportato come `store` (non `useStore`). Si usa con `useShallow` per ottimizzare i re-render.

## Gestione degli Errori

L'app utilizza tre meccanismi complementari:

### 1. tryCatch Utility

Restituisce una tupla `[data, error]` per gestione esplicita degli errori:

```typescript
const [data, error] = await tryCatch(categoriesService.getAll());

if (error) {
  // Gestisci l'errore
  return;
}
// Usa data in sicurezza
```

### 2. Errors Slice

Store globale per errori dell'applicazione:

```typescript
// Imposta un errore
get().setError('Messaggio di errore');

// Pulisci l'errore
get().clearError();
```

### 3. Axios Interceptors

Convertono automaticamente gli errori HTTP in messaggi italiani:

- 404 → "Risorsa non trovata"
- 500 → "Errore del server"
- Network error → "Errore di rete"
- Backend message → Messaggio specifico dal backend

## Integrazione API

### Services Layer

I service in [src/services/](src/services/) forniscono un'astrazione type-safe sopra le API:

#### Categories Service

```typescript
// Ottieni tutte le categorie
await categoriesService.getAll();

// Ottieni categoria per ID
await categoriesService.getById(id);

// Crea categoria
await categoriesService.create(data);

// Aggiorna categoria
await categoriesService.update(id, data);

// Elimina categoria
await categoriesService.delete(id);
```

#### Transactions Service

```typescript
// Ottieni transazioni (richiede intervallo date)
await transactionsService.getAll({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  baseCurrency: 'EUR' // opzionale
});

// Ottieni transazione per ID
await transactionsService.getById(id, 'EUR'); // currency opzionale

// Crea transazione
await transactionsService.create(data);

// Aggiorna transazione
await transactionsService.update(id, data);

// Elimina transazione
await transactionsService.delete(id);
```

### Struttura Risposta API

Tutte le risposte API seguono questa struttura:

```typescript
{
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## Type Safety

### Schema Zod

Gli schemi in [src/schemas/api.schemas.ts](src/schemas/api.schemas.ts) forniscono:

- Validazione runtime dei dati
- Messaggi di errore in italiano
- Inferenza automatica dei tipi TypeScript

Esempio:

```typescript
export const CategoryInputSchema = z.object({
  name: z.string().min(1, "Il nome della categoria è obbligatorio"),
  type: z.enum(['income', 'expense']),
  parentCategory: z.string().optional(),
});
```

### Tipi TypeScript

I tipi in [src/types/api.types.ts](src/types/api.types.ts) sono inferiti dagli schemi Zod:

```typescript
export type TCategoryInput = z.infer<typeof CategoryInputSchema>;
```

Questo garantisce sincronizzazione tra validazione runtime e type checking.

## Routing

L'applicazione usa **React Router DOM v7** con nested routes:

| Route                  | Componente              | Descrizione                    |
|------------------------|-------------------------|--------------------------------|
| `/`                    | Navigate                | Redirect a `/transactions`     |
| `/transactions`        | TransactionsPage        | Lista transazioni mensili      |
| `/categories`          | CategoriesPage          | Visualizzazione categorie      |
| `/modify-categories`   | ModifyCategoriesPage    | Gestione CRUD categorie        |
| `/settings`            | SettingsPage            | Impostazioni applicazione      |

### Lazy Loading

Tutte le pagine sono caricate lazy con React.lazy per code-splitting ottimale:

```typescript
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
```

Con fallback loader specifici per route:

```typescript
<Suspense fallback={<RouteLoader routeName="transactions" />}>
  <TransactionsPage />
</Suspense>
```

## Styling

### Tailwind CSS v4

L'applicazione utilizza **Tailwind CSS v4** integrato con Vite plugin:

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Convenzioni di Styling

- Utility-first approach
- Responsive design con breakpoint Tailwind
- Componenti UI base riutilizzabili in `src/components/ui/`
- Skeleton loaders per UX ottimale durante caricamento dati

## Caratteristiche Avanzate

### Multi-Valuta

- Ogni transazione può essere in qualsiasi valuta
- Conversione automatica in EUR (base currency)
- Campo `amountInEUR` calcolato dal backend

### Categorie Gerarchiche

- Categorie possono avere sotto-categorie
- Tipizzazione: `income` o `expense`
- Relazione parent-child tramite campo `parentCategory`

### Gestione Date

- Navigazione mensile con Day.js
- DateSlice gestisce mese corrente
- Calcolo automatico intervallo date (inizio/fine mese)

### Sistema Modale

- Modal slice centralizzato
- Contenuto dinamico (React nodes)
- Chiusura automatica dopo operazioni

## Lingue

L'intera applicazione è in **italiano**:
- Messaggi di errore
- Validazioni
- Console logs
- UI text

## Backend

Questa applicazione frontend si integra con il backend **track-my-money** (Node.js/Express).

### Requisiti Backend

Il backend richiede:
- **Node.js** (versione 18.x o superiore)
- **MongoDB** (per persistenza dei dati)
- **API Esterna**: Frankfurter API per conversione valute in tempo reale

### Configurazione Backend

Assicurati che il backend sia configurato con:

```env
# Backend .env
PORT=3000
MONGO_URI=mongodb://localhost:27017/track-my-money
FRANKFURTER_API_URL=https://api.frankfurter.app
```

### Endpoints API Disponibili

Il backend espone i seguenti endpoint REST:

#### Categories
- `GET /categories` - Lista tutte le categorie
- `GET /categories/:id` - Dettaglio categoria
- `POST /categories` - Crea categoria
- `PATCH /categories/:id` - Aggiorna categoria
- `DELETE /categories/:id` - Elimina categoria

#### Transactions
- `GET /transactions?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&baseCurrency=EUR` - Lista transazioni filtrate
- `GET /transactions/:id?baseCurrency=EUR` - Dettaglio transazione
- `POST /transactions` - Crea transazione
- `PATCH /transactions/:id` - Aggiorna transazione
- `DELETE /transactions/:id` - Elimina transazione

### Note sulla Conversione Valute

- Il backend usa **Frankfurter API** per ottenere tassi di cambio aggiornati
- I tassi vengono cachati per 24 ore per ridurre chiamate API esterne
- Se la conversione fallisce, viene usato un tasso di cambio di fallback 1:1
- L'importo originale e la valuta sono sempre preservati nella transazione
- Il campo `amountInEUR` viene calcolato automaticamente dal backend

Assicurati che il backend sia in esecuzione e accessibile all'URL configurato in `.env`.

## 🤝 Contribuire

1. Fork del progetto
2. Crea un feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push del branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è distribuito sotto licenza ISC. Vedi il file `LICENSE` per maggiori dettagli.

## 📧 Contatti

Francesco Palazzo - [GitHub](https://github.com/FrancescoPalazzo97)

Link del progetto: [https://github.com/FrancescoPalazzo97/track-my-money-back](https://github.com/FrancescoPalazzo97/track-my-money-back)
