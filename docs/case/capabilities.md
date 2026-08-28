# Capabilities

## Customer experience

The current application includes:

- product catalog browsing;
- product detail pages;
- favorites;
- cart;
- checkout;
- account profile;
- address management;
- authentication;
- security/account area;
- persisted order history.

## Authentication

The operational authentication path uses Firebase Authentication. Auth0-related scaffolding exists for future integration, but Auth0 authentication is not currently enabled.

The application also maintains a server-side session boundary for protected application behavior.

## Persistence

Firestore-backed persistence is used for authenticated application data.

Current persisted concerns include:

- account profile;
- address data;
- cart state;
- favorites;
- orders.

## Checkout and orders

Checkout supports the current application payment-method contract and creates persisted orders.

Order creation uses server-owned authority for catalog-derived values such as price and stock validation.

The account orders page reads persisted order history rather than static mock order data.

## Runtime behavior

The application includes dedicated API routes for:

- account;
- authentication session;
- commerce state;
- orders;
- cache revalidation.

## Current boundaries

This project should not currently be presented as having:

- a production payment-provider integration;
- measured production-scale traffic;
- verified commercial conversion metrics;
- verified performance benchmarks unless separately captured as evidence.
