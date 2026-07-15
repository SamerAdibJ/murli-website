# GitHub Copilot Instructions — Murli Website

## Project Stack
- **Frontend:** Angular 21 (standalone components, signals, new control flow)
- **Backend:** NestJS (latest)
- **Database:** PostgreSQL 18 + Drizzle ORM
- **Styling:** SCSS (custom CSS variables)
- **Auth:** Passport.js + JWT (not yet implemented)

## Architecture
- Monorepo with npm workspaces
- Root `package.json` manages workspaces: `frontend/`, `backend/`, `shared/`
- Shared types in `shared/src/index.ts` — imported by both frontend and backend

## Design System
- **Colors:** Gold `#D2B991` (primary), BK Red `#C62828` (accents)
- **Fonts:** Amiri (Arabic), Inter (UI), Lora (English headings)
- **Dark/Light mode:** CSS custom properties on `:root` and `body.dark`
- **RTL:** `html[dir="rtl"]` for Arabic language mode

## Frontend Conventions
- Standalone components (no NgModules)
- Each component has 3 files: `{name}.component.ts`, `{name}.component.html`, `{name}.component.scss` — never inline templates or styles
- State management: Angular signals
- Routing: child routes under `AppShellComponent` (sidebar layout)
- All pages are lazy-loaded

## Routes (Frontend)
| Path               | Component                 | Description                             |
| ------------------ | ------------------------- | --------------------------------------- |
| `/`                | `TodayMurliComponent`     | Three tabs: Full Murli / Summary / Song |
| `/blessing`        | `BlessingCardComponent`   | Daily blessing card                     |
| `/bookmarks`       | `BookmarksComponent`      | Saved Murlis list                       |
| `/profile`         | `ProfileComponent`        | User profile + stats                    |
| `/admin/murlis`    | `AdminMurlisComponent`    | Calendar + editor (admin only)          |
| `/admin/blessings` | `AdminBlessingsComponent` | Manage blessing cards                   |
| `/admin/members`   | `AdminMembersComponent`   | Manage members                          |

## Backend Setup
- **NestJS** with `@nestjs/config` for `.env` management
- **Drizzle ORM** with `drizzle-orm/node-postgres` driver
- **Swagger** at `http://localhost:3000/api`
- Database: PostgreSQL 18 on `localhost:5432`, database `murli_website`

### Backend Files Structure
```
backend/src/
├── app.module.ts              ← imports ConfigModule, DrizzleModule, feature modules
├── main.ts                    ← bootstrap, Swagger setup, reads PORT from .env
├── drizzle/
│   ├── drizzle.module.ts      ← @Global module providing DrizzleService
│   ├── drizzle.service.ts     ← @Injectable, creates pg Pool + Drizzle instance
│   └── schema.ts              ← all table definitions (pgTable)
├── murlis/
│   ├── murlis.module.ts
│   ├── murlis.controller.ts
│   └── murlis.service.ts
├── blessings/                  ← not yet created
├── bookmarks/                  ← not yet created
└── auth/                       ← not yet created
```

### Backend Conventions
- All modules use the pattern: Module → Controller → Service
- Database access through `DrizzleService` (inject via constructor)
- Queries use Drizzle ORM syntax: `db.select().from(table).where(...)`
- Environment config in `.env` (never hardcoded)
- Swagger decorators on controllers for API documentation

### API Endpoints (existing)
| Method | Path              | Description              |
|--------|-------------------|--------------------------|
| GET    | `/murli/today`    | Returns today's Murli    |

### Backend `.env` Configuration
```
PORT=3000
DATABASE_URL=postgresql://postgres:***@localhost:5432/murli_website
SWAGGER_PATH=api
```

## Data Models (in shared/)
See `shared/src/index.ts` for User, Murli, BlessingCard, UserBlessing, Bookmark interfaces.

## API Base URL
`http://localhost:3000`
