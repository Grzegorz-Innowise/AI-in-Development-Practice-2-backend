<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Backend App

A progressive [NestJS](https://nestjs.com/) backend application using PostgreSQL, Prisma ORM, JWT authentication, Docker, and E2E tests.

## Description

This project is a modular NestJS backend with:

- PostgreSQL database (via Prisma ORM)
- JWT authentication (access & refresh tokens)
- Secure password hashing (bcrypt)
- Validation with class-validator
- Docker support for easy deployment
- E2E and unit tests (Jest, Supertest)

## Project setup

```bash
$ npm install
```

## Environment Variables

All environment variables are defined in `.env` files. Example:

```env
POSTGRES_PORT=5432
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=db_name

# IMPORTANT: db host must match your environment!
# For Docker Compose (compose.yml):
DATABASE_URL=postgresql://username:password@postgres:5432/db_name?schema=public
# For local development (without dockerize backend app):
# DATABASE_URL=postgresql://username:password@localhost:5432/db_name?schema=public

JWT_ACCESS_EXPIRATION_TIME=3600
JWT_REFRESH_EXPIRATION_TIME=604800
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

> **Note:**
>
> - When running with Docker Compose (`compose.yml`), set the `host` to `postgres`.
> - When running locally, set the `host` to `localhost`.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

### Build and run with Docker Compose

```bash
# For production/dev stack (app + postgres)
$ docker compose -f compose.yml up --build
```

- This will start both the PostgreSQL and NestJS app containers.
- The app will be available at [http://localhost:3000](http://localhost:3000)
- Prisma migrations, client generation, and seeding are handled automatically in the Dockerfile.

### Development database only

```bash
# Only start postgres (for local development)
$ docker compose -f compose.dev.yml up
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Useful scripts

- `npm run seed` – seed the database (see `prisma/seed.ts`)
- `npx prisma migrate dev` – run migrations in dev
- `npx prisma migrate deploy` – run migrations in prod
- `npx prisma generate` – generate Prisma client

## Project structure

```
src/
  app.module.ts
  main.ts
  auth/
  database/
  jwt/
  user/
prisma/
  schema.prisma
  seed.ts
test/
  auth.controller.e2e-spec.ts
Dockerfile
compose.yml
compose.dev.yml
.env
package.json
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
