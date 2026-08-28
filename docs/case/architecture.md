# Architecture

## Application structure

The application uses Next.js App Router with a feature-first organization supported by shared core and layout layers.

Primary source structure:

- `src/app` — routing, layouts, metadata, and route handlers;
- `src/features` — feature-owned UI and behavior;
- `src/core` — application infrastructure and domain concerns;
- `src/shared` — reusable cross-feature presentation.

## Feature areas

Current feature areas include:

- account;
- authentication;
- cart;
- catalog;
- checkout;
- home;
- product detail.

## Data and authentication

Firebase Authentication is used for the operational authentication flow, while Firestore provides persisted application data.

Server-side Firebase Admin integration supports trusted operations such as session validation and Firestore access.

Persisted authenticated data includes account information, commerce state, and orders.

## Order flow

Checkout creates orders through the application API.

Financial values and catalog-derived order data are resolved server-side rather than accepted as authoritative client input.

Persisted orders are later read through the orders API and displayed in the authenticated account area.

## Legacy material

Historical implementation material is preserved separately under `legacy/` and is not part of the current operational application architecture.
