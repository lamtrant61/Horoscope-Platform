# Repository Guidelines

## Project Structure & Module Organization

This is a Nuxt 3 horoscope application with client and server code in the root project. Page routes live in `pages/`, Vue components in `components/`, composables in `composables/`, Pinia stores in `stores/`, and shared types in `types/` and `utils/`. Server API routes and helpers are under `server/api/` and `server/utils/`; Sequelize models, migrations, seeders, and data files are in `server/database/`. Static files are in `public/`; SCSS, CSS, logos, and images live in `assets/`. The nested `app/` directory contains the starter/content app used by `dev-app`, `generate`, and `preview`.

## Build, Test, and Development Commands

- `npm run dev`: start the main Nuxt app locally.
- `npm run dev-host`: start Nuxt on `0.0.0.0` for network testing.
- `npm run build`: create the production Nuxt build.
- `npm run dev-app`: run the nested `app/` project.
- `npm run generate`: generate the nested `app/` project statically.
- `npm run preview`: preview the generated nested `app/` output.
- `npm run test`: run the Vitest unit test suite.
- `npm run test:watch`: run Vitest in watch mode while developing tests.
- `npm run lint`: run ESLint and Prettier checks.
- `npm run lint:fix`: apply automatic lint fixes.
- `npm run sequelize-migrate`: create, migrate, and seed the configured database.

## Coding Style & Naming Conventions

Use TypeScript and Vue single-file components where possible. Follow `.editorconfig`: 2-space indentation, LF line endings, UTF-8, and final newlines. Prettier uses single quotes and no semicolons. Keep Vue component filenames kebab-case, such as `components/horoscope/star-data.vue`, and use Nuxt route patterns in `pages/`, including `[slug].vue`.

## Agent-Specific Instructions

Do not remove or change existing application code just to satisfy tests, coverage, or lint. If a change affects runtime behavior, public APIs, component props, route behavior, horoscope calculations, payment/auth flows, or OpenAI prompts, ask first unless the user explicitly requested that code change. Prefer adding tests around current behavior; only refactor implementation code after confirming the intent.

## Testing Guidelines

Vitest is configured for unit tests, with Vue Test Utils and happy-dom for component tests. Before submitting changes, run `npm run test` and `npm run lint`; manually verify affected routes or APIs with `npm run dev` when behavior changes. Keep test files near the feature, name them `*.test.ts` or `*.spec.ts`, and mock network, database, OpenAI, Telegram, and payment calls.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `fix fly star bug` and `add feature four star fly`; keep messages focused on one change. Pull requests should include a brief description, affected pages or APIs, migration/seed notes, environment changes, and screenshots for visible UI updates.

## Security & Configuration Tips

Keep secrets in `.env` or deployment configuration, not in source. Review OpenAI, Telegram, payment, JWT, and database-related changes carefully, especially files under `server/utils/`, `server/api/`, and `server/database/config/`.
