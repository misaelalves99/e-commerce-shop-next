# Quality & Security

## Automated checks

The repository provides dedicated scripts for:

- tests;
- TypeScript type checking;
- ESLint;
- production build;
- Playwright browser acceptance through `npm run test:e2e`.

GitHub Actions also provides the repository quality workflow.

## Current test suite

The current automated suite covers areas including:

- account normalization;
- commerce-state merging;
- serialized persistence writes;
- Firebase authentication mapping;
- order creation behavior;
- catalog mapping;
- route contracts.

## Browser acceptance

The implemented Stage 09 browser acceptance layer uses Playwright with Chromium against a production-equivalent Next.js runtime.

The deterministic guest suite currently contains three Chromium tests covering publication-critical storefront, product, cart, persistence, and protected-checkout redirect behavior.

Authenticated browser acceptance remains deferred until a deterministic privacy-safe authentication strategy is proven.

## Security-oriented implementation

Current implementation safeguards include:

- server-side Firebase Admin access;
- server session verification;
- protected application routes;
- server-authoritative order values;
- validation of public Firebase configuration;
- server-only environment credentials;
- header-based revalidation authentication;
- ignored local environment files.

## Dependency audit

Dependency security auditing is part of the validation workflow.

## Evidence requirement

Statements in this document describe repository implementation and verified project gates.

They should not be interpreted as a third-party security certification or penetration-test result.
