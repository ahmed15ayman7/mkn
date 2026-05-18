# MKN Development Website

Next.js 16 + Payload CMS 3 + Tailwind v4 + shadcn/ui

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| CMS / Backend | Payload CMS 3 (embedded in Next.js) |
| Database | PostgreSQL (via `@payloadcms/db-postgres`) |
| Media Storage | S3-compatible (AWS S3 or Cloudflare R2) |
| Styling | Tailwind CSS v4 (CSS-first) |
| Localization | next-intl v4, EN + AR |
| SEO | `@payloadcms/plugin-seo` + `generateMetadata` + JSON-LD |

## Getting Started

### 1. Copy environment variables

```bash
cp .env.example .env
```

Fill in `.env`:
- `DATABASE_URI` — PostgreSQL connection string
- `PAYLOAD_SECRET` — Random secret (min 32 chars)
- `NEXT_PUBLIC_SERVER_URL` — Full URL of the site (e.g. `https://mkn.sa`)
- `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT` (for R2), `S3_CDN_URL`

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run database migrations

```bash
pnpm payload migrate
```

### 4. Start development server

```bash
pnpm dev
```

- Public site: http://localhost:3000/en
- Admin panel: http://localhost:3000/admin

### 5. Create first admin user

Open `/admin` and follow the setup wizard on first launch.

## Content Structure

### Globals (edited once, appear everywhere)

| Slug | Description |
|---|---|
| `header` | Logo, navigation links, CTA button |
| `footer` | Description, quick links, head office, social links |
| `site-seo` | Default SEO, Organization JSON-LD |

### Collections

| Collection | Description |
|---|---|
| `pages` | Home, About Us, Projects, Contact (blocks-based) |
| `projects` | Individual project pages with full block editor |
| `partners` | Partner logos shown in the partners section |
| `media` | Images and videos (stored on S3/R2) |
| `contact-submissions` | Form submissions from the contact page |
| `users` | Admin users |

## Localization

Content in Payload is localized in EN and AR.
Static UI strings are in `src/i18n/messages/en.json` and `src/i18n/messages/ar.json`.

## Deployment

Build the single Next.js + Payload bundle:

```bash
pnpm build
pnpm start
```

Make sure `DATABASE_URI` and all S3 variables are set in production.
Run `pnpm payload migrate` after first deployment to create tables.
# mkn
