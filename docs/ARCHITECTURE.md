# Soegih Frontend Architecture

**Last Updated:** 2026-03-19

## Overview

Soegih is a personal finance web application built with React 19 + Vite, featuring wallet management, expense/income tracking, transaction categorization, dashboards, and an AI chat interface for natural language transaction input.

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 | UI rendering |
| **Build Tool** | Vite 7 | Fast development & bundling |
| **Language** | TypeScript 5.9 | Type safety |
| **Routing** | TanStack Router (file-based) | App navigation & page structure |
| **Server State** | TanStack Query v5 | Data fetching, caching, sync |
| **Tables** | TanStack Table v8 | Sortable, searchable data tables |
| **Forms** | React Hook Form + Zod | Form handling & validation |
| **UI Components** | shadcn/ui (Radix + Tailwind v4) | Accessible component library |
| **Charts** | Recharts | Data visualization (dashboard) |
| **Auth** | Supabase Auth | Email/password login & JWT sessions |
| **HTTP Client** | Axios | API requests with auth interceptors |
| **Error Tracking** | Sentry | Error tracking & session replay |
| **Testing** | Vitest + React Testing Library | Unit & integration tests |
| **E2E Testing** | Playwright | Browser automation & end-to-end tests |
| **Mocking** | MSW | Mock Service Worker for tests |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React 19)                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              App Shell & Routing                     │  │
│  │  • TanStack Router (file-based, code-split routes)  │  │
│  │  • Root layout: __root.tsx                          │  │
│  │  • Auth layout: _auth.tsx (login, signup)           │  │
│  │  • App layout: _app.tsx (authenticated routes)      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Shared Infrastructure               │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ • AuthContext + useAuth hook                        │  │
│  │   └─ Supabase Auth, JWT session management          │  │
│  │ • API Client (Axios instance)                       │  │
│  │   └─ Auth interceptor, base URL config              │  │
│  │ • Shared Components                                 │  │
│  │   ├─ AppLayout (sidebar nav + content)              │  │
│  │   ├─ PageHeader                                     │  │
│  │   ├─ ConfirmDialog                                  │  │
│  │   ├─ EmptyState                                     │  │
│  │   └─ ErrorBoundary                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Feature Modules                         │  │
│  │      (Isolated, self-contained features)            │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                      │  │
│  │ ┌──────────────┐  ┌──────────────────────────────┐ │  │
│  │ │   Wallet     │  │   Category                   │ │  │
│  │ ├──────────────┤  ├──────────────────────────────┤ │  │
│  │ │ • types/     │  │ • types/                     │ │  │
│  │ │ • services/  │  │ • services/                  │ │  │
│  │ │ • hooks/     │  │ • hooks/                     │ │  │
│  │ │   - useWallets │   - useCategories            │ │  │
│  │ │ • components/│  │ • components/                │ │  │
│  │ │   - Table    │  │   - Table, Cards, Form       │ │  │
│  │ │   - Cards    │  │                              │ │  │
│  │ │   - Form     │  │                              │ │  │
│  │ └──────────────┘  └──────────────────────────────┘ │  │
│  │                                                      │  │
│  │ ┌──────────────┐  ┌──────────────────────────────┐ │  │
│  │ │ Transaction  │  │   Dashboard                  │ │  │
│  │ ├──────────────┤  ├──────────────────────────────┤ │  │
│  │ │ • types/     │  │ • types/                     │ │  │
│  │ │ • services/  │  │ • services/                  │ │  │
│  │ │ • hooks/     │  │ • hooks/                     │ │  │
│  │ │   - useTx    │  │   - useDashboard             │ │  │
│  │ │ • components/│  │ • components/                │ │  │
│  │ │   - Table    │  │   - SummaryCards             │ │  │
│  │ │   - Cards    │  │   - ExpensePieChart          │ │  │
│  │ │   - Form     │  │   - MonthPicker              │ │  │
│  │ └──────────────┘  └──────────────────────────────┘ │  │
│  │                                                      │  │
│  │ ┌────────────────────────────────────────────────┐  │  │
│  │ │            AI Chat                             │  │  │
│  │ ├────────────────────────────────────────────────┤  │  │
│  │ │ • types/                                       │  │  │
│  │ │ • services/ (AI API client)                    │  │  │
│  │ │ • hooks/ (useAiChat)                           │  │  │
│  │ │ • components/                                  │  │  │
│  │ │   - ChatInterface (message list + input)       │  │  │
│  │ │   - TransactionConfirmCard (AI suggestion)     │  │  │
│  │ └────────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Data Fetching & State (TanStack Query)      │  │
│  │                                                       │  │
│  │ • Caching & invalidation for all API calls          │  │
│  │ • Real-time sync with backend                       │  │
│  │ • Optimistic updates                                │  │
│  │ • Query hooks: useWallets, useCategories, etc.      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
         │
         │ HTTPS / Axios
         │
┌────────▼────────────────────────────────────────────────────┐
│              Backend API (NestJS)                           │
│ • /api/v1/auth (login, signup, refresh token)             │
│ • /api/v1/wallets (CRUD)                                  │
│ • /api/v1/categories (CRUD)                               │
│ • /api/v1/transactions (CRUD, pagination, search)         │
│ • /api/v1/dashboard (summary, charts)                     │
│ • /api/v1/ai (chat endpoint)                              │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── main.tsx                              Entry point
├── App.tsx                               Root component (RouterProvider)
├── routeTree.gen.ts                      Auto-generated by TanStack Router
├── index.css                             Global styles (Tailwind)
├── shared/                               Shared infrastructure
│   ├── api/
│   │   ├── client.ts                     Axios instance + auth interceptor
│   │   └── types.ts                      Shared API response types
│   ├── auth/
│   │   ├── auth.context.tsx              AuthContext + AuthProvider
│   │   ├── use-auth.ts                   useAuth hook
│   │   └── token.ts                      localStorage token helpers
│   └── components/
│       ├── AppLayout.tsx                 Sidebar nav + content area
│       ├── PageHeader.tsx                Page title + actions
│       ├── EmptyState.tsx                Empty list placeholder
│       ├── ConfirmDialog.tsx             Delete confirmation
│       └── ErrorBoundary.tsx             React error boundary
├── routes/                               TanStack Router route files
│   ├── __root.tsx                        Root layout (providers)
│   ├── index.tsx                         Redirect to /dashboard
│   ├── _auth.tsx                         Unauthenticated layout
│   ├── _auth.login.tsx                  Login page
│   ├── _auth.signup.tsx                 Signup page
│   ├── _app.tsx                          Authenticated layout + guard
│   ├── _app.dashboard.tsx               Dashboard page
│   ├── _app.wallets.tsx                 Wallets list page
│   ├── _app.categories.tsx              Categories list page
│   └── _app.transactions.tsx            Transactions list page
├── modules/                              Feature modules
│   ├── wallet/
│   │   ├── types/
│   │   │   └── wallet.types.ts
│   │   ├── services/
│   │   │   └── wallet.service.ts         API calls (CRUD)
│   │   ├── hooks/
│   │   │   └── use-wallets.ts            TanStack Query hooks
│   │   └── components/
│   │       ├── WalletTable.tsx           Desktop table view
│   │       ├── WalletCards.tsx           Mobile card view
│   │       └── WalletForm.tsx            Create/edit form
│   ├── category/
│   │   ├── types/
│   │   │   └── category.types.ts
│   │   ├── services/
│   │   │   └── category.service.ts
│   │   ├── hooks/
│   │   │   └── use-categories.ts
│   │   └── components/
│   │       ├── CategoryTable.tsx
│   │       ├── CategoryCards.tsx
│   │       └── CategoryForm.tsx
│   ├── transaction/
│   │   ├── types/
│   │   │   └── transaction.types.ts
│   │   ├── services/
│   │   │   └── transaction.service.ts
│   │   ├── hooks/
│   │   │   └── use-transactions.ts
│   │   └── components/
│   │       ├── TransactionTable.tsx      Server-side pagination
│   │       ├── TransactionCards.tsx
│   │       └── TransactionForm.tsx
│   ├── dashboard/
│   │   ├── types/
│   │   │   └── dashboard.types.ts
│   │   ├── services/
│   │   │   └── dashboard.service.ts
│   │   ├── hooks/
│   │   │   └── use-dashboard.ts
│   │   └── components/
│   │       ├── SummaryCards.tsx          Net worth, income, expense
│   │       ├── ExpensePieChart.tsx       Recharts pie
│   │       └── MonthPicker.tsx           Month filter
│   └── ai/
│       ├── types/
│       │   └── ai.types.ts
│       ├── services/
│       │   └── ai.service.ts
│       ├── hooks/
│       │   └── use-ai-chat.ts
│       └── components/
│           ├── ChatInterface.tsx
│           └── TransactionConfirmCard.tsx
└── components/                           Global UI components
    ├── theme-provider.tsx                Theme context
    └── ui/                               shadcn/ui components
        └── button.tsx

e2e/
├── fixtures/
│   └── auth.fixture.ts                   Login helpers
├── auth.spec.ts
├── wallet.spec.ts
├── category.spec.ts
├── transaction.spec.ts
└── dashboard.spec.ts
```

## Data Flow

### Authentication Flow

```
User → Login Form
  ↓
React Hook Form + Zod validation
  ↓
Axios POST /api/v1/auth/login
  ↓
Backend validates credentials, returns JWT
  ↓
AuthContext stores JWT + user info (localStorage)
  ↓
Auth Interceptor attaches JWT to all requests
  ↓
Authenticated pages load → useAuth hook provides user & logout
```

### Data Fetch & Cache Flow

```
Component mounts
  ↓
useWallets() hook (TanStack Query)
  ↓
Check cache: is data fresh?
  ├─ YES: Return cached data
  └─ NO: Fetch from API
    ↓
    Axios GET /api/v1/wallets + JWT header
    ↓
    Backend returns wallets
    ↓
    TanStack Query caches response
    ↓
    Component re-renders with data

Mutations (create/update/delete)
  ↓
useMutation hook
  ↓
Optimistic update (UI updates instantly)
  ↓
Axios POST/PUT/DELETE request
  ↓
On success: Invalidate cache (refetch wallets)
On error: Rollback optimistic update
```

### Form Submission Flow

```
User fills form → Submit
  ↓
React Hook Form validates against Zod schema
  ├─ Invalid: Show field errors, don't submit
  └─ Valid: Call onSubmit handler
    ↓
    Show loading state
    ↓
    useMutation hook → Axios POST /api/v1/wallets
    ↓
    Backend creates wallet
    ↓
    On success: Invalidate cache, close form, show toast
    On error: Show error message in form
```

### Server-Side Pagination (Transactions)

```
User visits Transactions page, page 1, sort by date DESC
  ↓
useTransactions({page: 1, limit: 20, sort_by: 'date', sort_order: 'DESC'})
  ↓
Axios GET /api/v1/transactions?page=1&limit=20&sort_by=date&sort_order=DESC
  ↓
Backend queries Postgres, returns:
  {
    data: [...20 transactions],
    total: 150,
    page: 1,
    limit: 20
  }
  ↓
Frontend renders table + pagination controls
  ↓
User clicks next page
  ↓
Query refetches with page=2
  ↓
New data loads (cached separately from page 1)
```

## Key Design Decisions

### 1. Feature Modules

Each feature (wallet, category, transaction, dashboard, ai) is isolated:
- Dedicated types file
- Dedicated service file (API calls)
- Dedicated hooks (TanStack Query)
- Dedicated components (desktop + mobile variants)

**Why:** Scalability, testability, clear ownership. Easy to add new features without touching existing code.

### 2. File-Based Routing (TanStack Router)

Routes are automatically generated from file structure under `src/routes/`:
- `__root.tsx` = layout with providers
- `_auth.tsx` = login/signup layout
- `_app.tsx` = authenticated layout with auth guard
- `_app.dashboard.tsx` = dashboard page

**Why:** Reduces boilerplate, co-locates routes with layouts, auto code-splitting.

### 3. TanStack Query for Server State

All API data is cached and managed by TanStack Query, not React state.

**Why:** Handles caching, invalidation, polling, optimistic updates. Single source of truth.

### 4. React Hook Form + Zod

All forms validated with Zod schema + React Hook Form.

**Why:** Type-safe (Zod infers types), minimal bundle size, excellent DX.

### 5. Responsive Design (Desktop-First)

Data tables on desktop, cards on mobile. Shared component logic.

**Why:** Professional UX, supports business growth (desktop-first for power users, mobile support for accessibility).

### 6. Auth Context + Supabase JWT

Centralized auth state with JWT refresh tokens.

**Why:** Single source of truth, automatic token refresh, easy logout.

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

- Services (API calls)
- Hooks (TanStack Query)
- Components (UI behavior)

Located near source: `*.test.ts`, `*.test.tsx`

### Integration Tests (MSW)

- Mock API with MSW
- Test full user flows (login, create wallet, etc.)

Located in `tests/` or co-located.

### E2E Tests (Playwright)

- Real browser, real backend
- Auth flow, wallet CRUD, transaction search, dashboard

Located in `e2e/` directory with fixtures.

## Performance Considerations

- **Code splitting:** TanStack Router auto-splits by route
- **Tree-shaking:** TypeScript + ESM modules
- **Bundle size:** shadcn/ui + TanStack minimal, Recharts only on dashboard
- **API caching:** TanStack Query, localStorage for tokens
- **Image optimization:** TBD (design assets)
- **Lazy loading:** Components, routes

## Security Considerations

- **JWT tokens:** Stored in localStorage (XSS risk), alternatives: secure cookies (TBD)
- **Auth interceptor:** Automatically appends JWT to all requests
- **CORS:** Backend should allow frontend origin
- **HTTPS:** Required for production (Netlify)
- **Sentry:** PII filtering enabled for error tracking

## Deployment

**Frontend:** Netlify (CSR, auto-deploy from master)
- Build: `pnpm build`
- Output: `dist/`
- Environment: Netlify env vars (API_URL, Sentry DSN, etc.)

**Backend:** Docker Compose on VPS (separate repo: `soegih-backend`)

---

## Links to Implementation

- [Frontend MVP Plan](./implementation_plan_mvp.md) — Task list and checkboxes
- [Project Specification](./project_spec.md) — Full technical spec
- [API Reference](./API.md) — Backend API endpoints
- [Git Log](../README.md) — Recent changes

---

**To update this doc:** Edit `docs/ARCHITECTURE.md` whenever you:
- Add/remove a feature module
- Introduce new tech (library, tool)
- Change auth, routing, or state management
- Add new shared components
- Update directory structure
