# E-Commerce Shop Next

Modern e-commerce application built with Next.js, React, TypeScript, Firebase Authentication, Firestore persistence, and a feature-oriented application architecture.

The project is developed as a technical portfolio case, with emphasis on application structure, authenticated state, persisted commerce workflows, server-authoritative order creation, runtime hardening, and automated quality gates.

## Current implementation

The application currently includes:

- product catalog and product detail pages;
- favorites and cart flows;
- Firebase Authentication;
- authenticated server session handling;
- account profile and address management;
- persisted cart and favorites;
- multi-step checkout;
- persisted order creation;
- authenticated order history;
- protected account and checkout routes;
- runtime cache revalidation endpoint;
- automated tests, linting, type checking, dependency auditing, and production build validation.

## Architecture

The source code follows a feature-first structure supported by application core and shared presentation layers.

The main source areas are `src/app`, `src/core`, `src/features`, and `src/shared`.

`src/app` contains routes, layouts, metadata, and API handlers.

`src/features` contains feature-owned UI and behavior.

`src/core` contains authentication, configuration, contexts, domain behavior, persistence, Firebase integration, and shared application types.

`src/shared` contains reusable presentation and layout elements.

## Authentication and persistence

Firebase Authentication is the operational authentication provider. Auth0-related scaffolding remains in the repository for future integration but is not part of the operational authentication flow.

The application also establishes a server-side session boundary for protected behavior.

Firestore-backed persistence is used for authenticated profile, address, cart, favorites, and order data.

Firebase Admin is used on the server for trusted authentication and Firestore operations.

## Checkout and orders

Checkout creates persisted orders through the application API.

Client input does not define authoritative financial values. Catalog-derived price, stock, totals, and related order data are resolved server-side before persistence.

The authenticated orders area reads persisted order history through the orders API and supports explicit loading, error, retry, and empty states.

## Quality

Available repository checks include:

- `npm test`
- `npm run typecheck`
- `npm run lint`
- `npm audit`
- `npm run test:e2e`
- `npm run build`

The repository also includes a GitHub Actions quality workflow.

Browser acceptance is implemented with Playwright on Chromium through `npm run test:e2e` against the production-equivalent application runtime.

## Environment configuration

Use `.env.example` as the public configuration reference.

Local environment files such as `.env.local` are ignored by Git and must not be committed.

Public Firebase browser configuration and server-only credentials are intentionally separated.

## Case study

Detailed technical documentation is available under [`docs/case/`](./docs/case/README.md).

The case documentation covers architecture, implemented capabilities, engineering decisions, quality and security posture, and the publication-selected visual evidence set.

## Project boundaries

The project should not currently be interpreted as having:

- a production payment-provider integration;
- verified production-scale traffic;
- verified commercial conversion metrics;
- third-party security certification;
- measured performance claims unless separately captured as evidence.

## Stack

- Next.js 16
- React 19
- TypeScript
- Firebase Authentication
- Firebase Admin
- Firestore
- Tailwind CSS
- CSS Modules
- ESLint
- GitHub Actions

## Local development

Install dependencies with `npm install`.

Start the development server with `npm run dev`.

The local application runs on port `3000`.

## Production validation

Run the repository test, type-check, lint, dependency audit, and production build gates before publication.

All publication claims should remain aligned with verified repository behavior and collected case evidence.
