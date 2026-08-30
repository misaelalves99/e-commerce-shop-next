# Engineering Decisions

## Server authority for order creation

The client does not define authoritative financial order data.

Order creation is validated and enriched server-side using the application catalog source before persistence.

This prevents client-provided totals or prices from becoming authoritative order data.

## Session boundary

Authentication state in the browser is complemented by server-side session verification for protected application behavior.

This creates a clearer trust boundary between browser identity state and server authorization.

## Feature-first application organization

Feature-specific presentation and behavior live under `src/features`, while shared infrastructure and domain concerns remain under `src/core`.

This reduces direct coupling between route files and implementation details.

## Persisted commerce state

Authenticated cart and favorites state are persisted rather than existing only in browser memory.

The implementation also preserves controlled write sequencing for persisted commerce updates.

## Persisted order history

The account order-history view consumes the persisted orders API.

Loading, error, retry, and empty states are handled explicitly instead of assuming successful data availability.

## Environment boundaries

Public Firebase configuration is validated when the Firebase client initializes.

Server-only Firebase Admin credentials and revalidation credentials remain outside the public runtime configuration contract.

## Revalidation authentication

The revalidation endpoint uses a dedicated request header rather than accepting the revalidation credential through the URL query string.

This avoids placing the credential directly in request URLs.
