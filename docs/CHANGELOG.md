# Changelog

All notable changes to the Soegih frontend project are documented here. This is a living document updated with each feature, fix, and refactor.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned
- Task 1: Install Dependencies & Configure Test Environment
- Task 2: Setup Root Layout with Providers
- Task 3: Implement Auth Context & Login/Signup Pages
- Task 4: Wallet Module (CRUD + TanStack Query)
- Task 5: Category Module (CRUD + TanStack Query)
- Task 6: Transaction Module (CRUD + Server-Side Pagination)
- Task 7: Dashboard Module (Summary Cards + Charts)
- Task 8: AI Chat Module (Chat Interface + Transaction Confirmation)
- Full implementation plan: see `docs/implementation_plan_mvp.md`

---

## [0.0.1] - 2026-03-19

### Added

#### Project Infrastructure
- Created `ARCHITECTURE.md` — High-level system overview with ASCII diagrams, component structure, data flows, and design decisions
- Created `CHANGELOG.md` — Living changelog to track all changes during development
- Created `CLAUDE.md` — Implementation guide with task autonomy rules, branching strategy, naming conventions, and living documentation requirements

#### Documentation
- `docs/project_spec.md` — Complete technical specification (stack, API schema, UI/UX principles, naming conventions)
- `docs/implementation_plan_mvp.md` — MVP task list with file map and task-by-task breakdown (Tasks 1–20)
- `docs/API.md` — Backend API endpoint reference
- `docs/brainstorm.md` — Initial brainstorm notes
- `docs/AI_MODEL_RESEARCH.md` — AI model evaluation (Gemini, Claude, GPT-4)
- `docs/GEMINI_VS_HAIKU_COMPARISON.md` — Model comparison for frontend agent

#### Frontend Scaffolding
- React 19 + Vite 7 + TypeScript 5.9 base project
- Tailwind CSS v4 setup with dark mode support
- shadcn/ui component library initialized (Button component included)
- `src/components/theme-provider.tsx` — Theme context for dark mode

#### Configuration Files
- `package.json` — Base dependencies and scripts
- `vite.config.ts` — Vite configuration (TBD: router plugin, Tailwind)
- `tsconfig.json` — TypeScript configuration
- `.gitignore` — Standard Node.js + Vite ignores
- `tailwind.config.ts` — Tailwind configuration with custom theme
- `postcss.config.js` — PostCSS configuration for Tailwind

#### Git & Workflow
- Initialized Git repository
- Created feature branch naming convention: `feat/task-{N}-{description}` (per CLAUDE.md)
- Pull request workflow documented (no direct master pushes)

---

## Development Guidelines

### When Updating This Changelog

1. **Add entries immediately** after implementing features, fixes, or refactors
2. **Use sections:** Added, Changed, Fixed, Removed, Deprecated, Security
3. **Link to tasks:** Reference task numbers from `docs/implementation_plan_mvp.md`
4. **Keep it readable:** One entry per change, clear and concise
5. **Commit with code:** Update changelog in the same commit as the feature

### Changelog Template

For each release or feature chunk, add:

```markdown
## [Version] - YYYY-MM-DD

### Added
- Feature X (Task N)
- Component Y
- Module Z

### Changed
- Refactored A to use B

### Fixed
- Bug in X

### Removed
- Deprecated Y

### Security
- Fixed vulnerability in Z
```

### Unreleased Section

The `[Unreleased]` section at the top tracks planned and in-progress work. Move completed items to a dated version section when merged to master.

---

## Repository Info

- **Main branch:** `master`
- **Feature branches:** `feat/task-{N}-{description}` or `fix/task-{N}-{description}`
- **PR workflow:** Feature branch → PR → Code review → Merge to master
- **Testing:** Run `pnpm test` before committing
- **Build:** `pnpm build` generates `dist/`

See [CLAUDE.md](./CLAUDE.md) for full workflow details.
