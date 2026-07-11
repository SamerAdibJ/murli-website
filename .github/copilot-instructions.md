# GitHub Copilot Instructions — Murli Website

## Project Stack
- **Frontend:** Angular 21 (standalone components, signals, new control flow)
- **Backend:** NestJS (latest)
- **Database:** PostgreSQL + Drizzle ORM
- **Styling:** SCSS (custom CSS variables, Tailwind is NOT used)
- **Auth:** Passport.js + JWT

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
- Component inline styles in SCSS
- State management: Angular signals
- Routing: child routes under `AppShellComponent` (sidebar layout)
- All pages are lazy-loaded

## Routes (Frontend)
| Path | Component | Description |
|------|-----------|-------------|
| `/` | `TodayMurliComponent` | Three tabs: Full Murli / Summary / Song |
| `/blessing` | `BlessingCardComponent` | Daily blessing card |
| `/bookmarks` | `BookmarksComponent` | Saved Murlis list |
| `/profile` | `ProfileComponent` | User profile + stats |
| `/admin/murlis` | `AdminMurlisComponent` | Calendar + editor (admin only) |
| `/admin/blessings` | `AdminBlessingsComponent` | Manage blessing cards |
| `/admin/members` | `AdminMembersComponent` | Manage members |

## Component Tree
```
AppShellComponent (sidebar + router-outlet)
├── TodayMurliComponent
├── BlessingCardComponent
├── BookmarksComponent
├── ProfileComponent
└── AdminModule
    ├── AdminMurlisComponent
    ├── AdminBlessingsComponent
    └── AdminMembersComponent
```

## Data Models (in shared/)
See `shared/src/index.ts` for User, Murli, BlessingCard, UserBlessing, Bookmark interfaces.

## API Base URL
`http://localhost:3000/api/`
