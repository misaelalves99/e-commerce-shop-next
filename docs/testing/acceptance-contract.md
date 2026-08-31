# Stage 09 — Acceptance Automation & Release Hardening

## Status

Scope frozen for implementation planning.

## Primary goal

Introduce reproducible browser-level acceptance coverage for the
already implemented publication-critical commerce journey without
weakening authentication, security, persistence, or privacy boundaries.

## Current verified gap

The repository has unit/domain/integration-style automated tests and
quality gates for lint, typecheck, tests, dependency audit, and
production build, but it does not yet have browser-level acceptance
automation.

## Acceptance layers

### Layer 1 — deterministic guest acceptance

Must be executable without private credentials.

Initial targets:

- storefront home renders successfully;
- catalog/product navigation is functional;
- product detail exposes a usable add-to-cart action;
- guest cart updates in a real browser;
- guest cart persistence survives navigation or reload where appropriate;
- protected checkout redirects an unauthenticated visitor to login;
- redirect intent preserves the requested checkout destination.

### Layer 2 — authenticated acceptance

Authenticated scenarios must not depend on personal accounts or
credentials committed to the repository.

Targets may include:

- successful authenticated checkout;
- order-success confirmation;
- persisted order history.

These scenarios enter CI only after a deterministic privacy-safe
authentication strategy is proven.

Possible implementation strategies must be evaluated before adoption,
including isolated test identity provisioning, emulator-backed auth, or
another architecture-compatible test seam.

No strategy may bypass production security boundaries merely to make
tests pass.

## Testability principles

Prefer accessible and user-visible selectors:

- role;
- label;
- heading;
- button/link name;
- stable visible text when appropriate.

Use data-testid only when semantic selectors are insufficient or would
make tests materially brittle.

Application behavior must not be redesigned solely for automation.

## Runtime strategy

Browser acceptance should execute against a production-equivalent Next.js
runtime when practical:

1. build;
2. start;
3. execute browser acceptance.

Development-only overlays or tooling must not be considered part of the
acceptance surface.

## CI rollout

Browser acceptance must not be added to the required Quality workflow
until it is deterministic locally.

Rollout sequence:

1. establish Playwright infrastructure;
2. prove deterministic guest acceptance locally;
3. validate failure diagnostics and artifacts;
4. evaluate authenticated strategy;
5. integrate stable acceptance into CI.

## Privacy and security boundary

Never commit or print:

- passwords;
- session cookies;
- Firebase private credentials;
- local environment files;
- real personal account data;
- authentication tokens.

Existing `.env` and `.env.local` remain local and ignored.

## Release-hardening scope

Stage 09 may also remove verified stale implementation comments or
documentation that contradict the current working application.

Such cleanup must not be used to introduce unrelated redesigns.

## In scope

- Playwright-based browser acceptance infrastructure;
- deterministic guest acceptance;
- product/cart browser flow;
- protected checkout redirect verification;
- privacy-safe authenticated test strategy;
- order-success and persisted-orders automation when deterministic;
- CI integration after reliability is demonstrated;
- release-readiness documentation;
- narrowly scoped stale-comment cleanup discovered during acceptance work.

## Out of scope

- real payment provider integration;
- replacing Firebase authentication;
- production Auth0 integration;
- storefront redesign;
- changing catalog data solely for tests;
- committing demonstration credentials;
- bypassing server session verification;
- weakening protected-route behavior;
- unrelated feature development.

## Stage completion criteria

Stage 09 is complete only when:

- browser acceptance tooling is reproducible;
- deterministic guest acceptance passes;
- protected checkout behavior is verified in-browser;
- authenticated acceptance has an explicit documented disposition;
- CI integration is either implemented and green or explicitly deferred
  with technical justification;
- existing quality gates remain green;
- production build remains green;
- no sensitive test material is tracked;
- acceptance architecture and limitations are documented.