# GitHub Copilot Instructions — Murli Website

## Project Stack
- **Frontend:** Angular 21 (standalone components, signals, new control flow)
- **Backend:** NestJS (latest)
- **Database:** PostgreSQL 18 + Drizzle ORM
- **Styling:** SCSS (custom CSS variables)
- **Auth:** Passport.js + JWT + bcrypt (refresh token rotation)

## Architecture
- Monorepo with npm workspaces
- Root `package.json` manages workspaces: `frontend/`, `backend/`, `shared/`
- Shared types in `shared/src/index.ts` — imported as `import { X } from 'shared'`
- All API responses wrapped in `ApiResponse<T>`: `{ success: boolean, data: T, message?: string }`
- Return via `ok(data, message?)` helper from `backend/src/common/helpers/response.ts`

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
| `/login`           | `LoginComponent`          | Login page (public)                     |
| `/register`        | `RegisterComponent`       | Register page (public)                  |
| `/`                | `TodayMurliComponent`     | Three tabs: Full Murli / Summary / Song |
| `/blessing`        | `BlessingCardComponent`   | Daily blessing card                     |
| `/bookmarks`       | `BookmarksComponent`      | Saved Murlis list                       |
| `/profile`         | `ProfileComponent`        | User profile + stats                    |
| `/admin/murlis`    | `AdminMurlisComponent`    | Calendar + editor (admin only)          |
| `/admin/blessings` | `AdminBlessingsComponent` | Manage blessing cards                   |
| `/admin/members`   | `AdminMembersComponent`   | Manage members                          |

## Backend Structure
```
backend/src/
├── main.ts                           ← bootstrap, Swagger, CORS, PORT from .env
├── app.module.ts                     ← imports all modules
├── drizzle/
│   ├── drizzle.module.ts             ← @Global module providing DRIZZLE token
│   ├── drizzle.provider.ts           ← factory provider, injects via @Inject(DRIZZLE)
│   └── schema.ts                     ← 6 tables (see below)
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/register.dto.ts
│   ├── dto/login.dto.ts
│   ├── guards/auth.guard.ts          ← JWT validation, extends AuthGuard('jwt')
│   ├── guards/roles.guard.ts         ← checks @Roles() metadata
│   ├── strategies/jwt.strategy.ts    ← Passport strategy, validates JWT
│   └── decorators/
│       ├── get-user.decorator.ts     ← @GetUser() extracts user from req.user
│       └── roles.decorator.ts        ← @Roles('admin') metadata decorator
├── murlis/
│   ├── murlis.module.ts
│   ├── murlis.controller.ts          ← GET /murli/today, GET /murli/:date
│   ├── murlis-list.controller.ts     ← GET /murlis (admin, paginated)
│   ├── murlis.service.ts
│   └── dto/create-murli.dto.ts, update-murli.dto.ts
├── blessings/
│   ├── blessings.module.ts
│   ├── blessing-user.controller.ts   ← GET /blessing/today, GET /blessing/history
│   ├── blessings-admin.controller.ts ← CRUD /blessings (admin)
│   ├── blessings.service.ts
│   └── dto/create-blessing.dto.ts, update-blessing.dto.ts
├── bookmarks/
│   ├── bookmarks.module.ts
│   ├── bookmarks.controller.ts       ← POST/GET/DELETE /bookmarks
│   ├── bookmarks.service.ts
│   └── dto/create-bookmark.dto.ts
├── admin/
│   ├── admin.module.ts
│   ├── admin.controller.ts           ← approve/reject/promote users, list
│   └── admin.service.ts
├── users/
│   ├── users.module.ts
│   └── users.service.ts
└── common/
    └── helpers/response.ts           ← ok() helper for ApiResponse<T>
```

## Database Tables (6 tables, Drizzle ORM)
| Table             | Key columns |
|------------------|-------------|
| `users`          | id (uuid), firstName, lastName, email (unique), passwordHash, role (member/admin), status (pending/active/rejected), emailVerified, timestamps |
| `murlis`         | 27 columns, bilingual (Arabic/English), date (unique), type (morning/avyakt), published, createdBy |
| `blessing_cards` | bilingual content, theme, published, createdBy |
| `user_blessings` | userId, blessingCardId, assignedDate (unique per user/date) |
| `bookmarks`      | userId, murliId (unique per user/murli) |
| `refresh_tokens` | tokenHash (SHA-256), userId (cascade delete), expiresAt |

## Authentication Flow
- **Register:** `POST /auth/register` — creates user with `status: pending`
- **Login:** `POST /auth/login` — validates credentials, returns `{ accessToken, refreshToken, user }`
  - Access token: 15 minutes
  - Refresh token: 30 days (rotated on each use, stored SHA-256 hashed)
- **Refresh:** `POST /auth/refresh` — accepts `{ refreshToken }`, rotates it, returns new pair
- **Logout:** `POST /auth/logout` (JWT) — invalidates the refresh token
- **Logout all:** `POST /auth/logout-all` (JWT) — invalidates all refresh tokens for user
- New users default to `status: pending` — must be approved by admin before they can log in
- `JwtStrategy.validate()` checks user exists and is active on every request
- Database injection: `@Inject(DRIZZLE) private db` (from drizzle.provider.ts)

## API Endpoints

### Auth (public)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register new user (status: pending) |
| POST | `/auth/login` | Login, returns accessToken + refreshToken |

### Auth (authenticated)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/refresh` | Public | Rotate refresh token |
| POST | `/auth/logout` | JWT | Invalidate refresh token |
| POST | `/auth/logout-all` | JWT | Invalidate all user tokens |

### Murlis
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/murli/today` | JWT | Today's Murli |
| GET | `/murli/:date` | JWT | Murli by date |
| GET | `/murlis` | Admin | Paginated list with date filters |
| POST | `/murli` | JWT | Create Murli |
| PATCH | `/murli/:id` | JWT | Update Murli |
| DELETE | `/murli/:id` | JWT | Delete Murli |

### Blessings
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/blessing/today` | JWT | Today's assigned blessing (random if first) |
| GET | `/blessing/history` | JWT | Past blessings for user |
| GET | `/blessings` | Admin | Paginated blessing cards list |
| POST | `/blessings` | Admin | Create blessing card |
| PATCH | `/blessings/:id` | Admin | Update blessing card |
| DELETE | `/blessings/:id` | Admin | Delete blessing card |

### Bookmarks
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/bookmarks` | JWT | List user's bookmarks |
| POST | `/bookmarks` | JWT | Add bookmark |
| DELETE | `/bookmarks/:murliId` | JWT | Remove bookmark |

### Admin
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/admin/users` | Admin | Paginated user list |
| GET | `/admin/users/pending` | Admin | Pending approval users |
| PATCH | `/admin/users/:id/approve` | Admin | Set user status to active |
| PATCH | `/admin/users/:id/reject` | Admin | Set user status to rejected |
| PATCH | `/admin/users/:id/promote` | Admin | Set user role to admin |

## Guards Usage
- `AuthGuard` — validates JWT, attaches user to `req.user`. Extends Passport `AuthGuard('jwt')`.
- `RolesGuard` — checks `@Roles()` metadata. Use with `@Roles('admin')`.
- Apply both: `@UseGuards(AuthGuard, RolesGuard)` + `@Roles('admin')`

## Decorators
- `@GetUser()` — extracts authenticated user from request (returns user object)
- `@Roles('admin')` — sets required role(s) for the endpoint

## Backend Conventions
- Database via `@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>`
- Queries: `this.db.select().from(table).where(eq(table.column, value))`
- All responses wrapped: `return ok(data, 'message')`
- User ID from JWT: `@GetUser() user` — never from request body
- Environment config in `.env` (read via `@nestjs/config`)
- Swagger decorators on all controllers (`@ApiTags`, `@ApiBearerAuth()`, etc.)
- Auth guards applied per-controller or per-method with `@UseGuards()`

## Backend `.env` Configuration
```
PORT=3000
DATABASE_URL=postgresql://postgres:***@localhost:5432/murli_website
JWT_SECRET=your-secret-here
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=30d
SWAGGER_PATH=api
```

## Shared Types (in `shared/src/index.ts`)
Import as `import { User, MurliResponse, CreateMurliDto, ... } from 'shared'`.

Key exports:
- `User`, `Role`, `UserStatus`
- `MurliResponse`, `CreateMurliDto`, `UpdateMurliDto`
- `BlessingCard`, `CreateBlessingDto`, `UpdateBlessingDto`
- `UserBlessing`
- `Bookmark`, `CreateBookmarkDto`
- `ApiResponse<T>` — `{ success, data, message }`
- `PaginatedResponse<T>` — `{ items, total, page, limit }`
- `LoginResponse` — `{ accessToken, refreshToken, user }`
- `AuthResponse`
- `RefreshTokenDto`, `RefreshTokenResponse`

## API Base URL
`http://localhost:3000`
