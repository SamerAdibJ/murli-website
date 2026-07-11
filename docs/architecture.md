# Murli Website — Architecture

## Overview
A spiritual content platform for Brahma Kumaris members. Daily Murlis, blessing cards, and songs with admin management.

## Project Structure
```
murli-website/
├── .github/copilot-instructions.md   ← Copilot context
├── docs/architecture.md              ← This file
├── frontend/                         ← Angular 21 app
│   ├── src/app/
│   │   ├── components/               ← Shared components (sidebar, etc.)
│   │   ├── pages/                    ← Route pages
│   │   ├── services/                 ← API services
│   │   └── app.routes.ts            ← Route definitions
│   └── src/styles.scss               ← Global styles + CSS variables
├── backend/                          ← NestJS app
│   ├── src/
│   │   ├── modules/                  ← Feature modules
│   │   ├── common/                   ← Guards, pipes, decorators
│   │   └── drizzle/                  ← DB schema and config
│   └── ...
├── shared/                           ← Shared types
│   └── src/index.ts
└── package.json                      ← Workspaces root
```

## Database Tables
| Table | Purpose |
|-------|---------|
| `users` | Members and admins |
| `murlis` | Daily Murli content |
| `blessing_cards` | Pool of blessing texts |
| `user_blessings` | Each user's assigned blessing |
| `bookmarks` | Saved Murlis per user |

## Auth Flow
- JWT-based authentication via Passport.js
- Two roles: `admin` and `member`
- JWT stored in localStorage, sent as Bearer token
- Auth guard on all routes except login/signup

## API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/signup | No | Register new member |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/murli/today | Yes | Today's Murli |
| GET | /api/murli/:date | Yes | Murli by date |
| GET | /api/blessing/mine | Yes | Current user's blessing |
| POST | /api/blessing/refresh | Yes | Get new blessing |
| POST | /api/bookmarks/:murliId | Yes | Bookmark a Murli |
| DELETE | /api/bookmarks/:murliId | Yes | Remove bookmark |
| GET | /api/bookmarks | Yes | List bookmarks |
| GET/POST/PUT/DELETE | /api/admin/murlis/* | Admin | CRUD Murlis |
| GET/POST/DELETE | /api/admin/members/* | Admin | Manage members |

## Frontend Patterns
- **Signals** for reactive state instead of RxJS Subjects
- **Standalone components** — no NgModule files
- **Lazy loading** via `loadComponent` in routes
- **SCSS with CSS variables** for theming (dark/light)
- **RTL support** via `[dir]` attribute binding

## Design Tokens
```css
--gold: #D2B991;
--gold-light: #FBF3E0;
--gold-dark: #8b6914;
--bk-red: #C62828;
--bk-red-muted: rgba(198,40,40,0.12);
--bg: #f8f6f3;
--bg-card: #ffffff;
--text-primary: #1e1e2a;
--sidebar-bg: #1e1e2a;
```
