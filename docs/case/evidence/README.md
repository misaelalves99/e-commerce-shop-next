# Visual Evidence Manifest

## Purpose

This directory stores publication-selected visual evidence for the E-Commerce Shop Next case study.

The primary evidence set demonstrates verified application behavior while preserving the privacy boundary defined for public case material.

## Primary publication evidence

### 01 — Home / Catalog

Asset:
[`01-home-catalog/home-catalog.png`](./01-home-catalog/home-catalog.png)

Evidence value:
Demonstrates the public storefront, product discovery surface, and overall visual identity.

### 02 — Product Detail

Asset:
[`02-product-detail/product-detail.png`](./02-product-detail/product-detail.png)

Evidence value:
Demonstrates an individual product view, catalog integration, pricing presentation, quantity controls, and purchase-oriented actions.

### 03 — Guest Cart

Asset:
[`03-cart/cart.png`](./03-cart/cart.png)

Evidence value:
Demonstrates guest commerce state, selected product state, quantity controls, purchase summary, and transition toward authenticated checkout.

### 04 — Authenticated Checkout

Asset:
[`04-checkout/checkout.png`](./04-checkout/checkout.png)

Evidence value:
Demonstrates authenticated checkout state and the multi-step payment and order-review workflow.

### 05 — Order Creation Success

Asset:
[`05-order-success/order-success.png`](./05-order-success/order-success.png)

Evidence value:
Demonstrates successful completion of the implemented checkout-to-order flow.

### 06 — Persisted Orders

Asset:
[`06-orders/orders.png`](./06-orders/orders.png)

Evidence value:
Demonstrates authenticated order history backed by persisted application data after successful order creation.

## Canonical narrative

The selected primary evidence forms one continuous commerce narrative:

`Home / Catalog -> Product Detail -> Guest Cart -> Authenticated Checkout -> Order Success -> Persisted Orders`

## Secondary evidence

### Account / Profile

Status:
Not selected for primary publication.

The primary set already demonstrates authenticated state and persisted customer-facing behavior. A profile screenshot would provide limited additional evidence while increasing the privacy surface.

### Authentication Entry

Status:
Not selected for primary publication.

Authentication remains operationally relevant, but the login screen does not add enough distinct evidence to the primary commerce narrative.

## Evidence contracts

Capture requirements:
[`CAPTURE_PROTOCOL.md`](./CAPTURE_PROTOCOL.md)

Authenticated evidence privacy boundary:
[`AUTHENTICATED_EVIDENCE_POLICY.md`](./AUTHENTICATED_EVIDENCE_POLICY.md)

Final publication selection:
[`PUBLICATION_SELECTION.md`](./PUBLICATION_SELECTION.md)

## Publication rules

Final public evidence must not expose:

- passwords;
- authentication tokens;
- cookies;
- local environment values;
- Firebase Admin credentials;
- revalidation secrets;
- private browser or session information;
- unnecessary personal information.

Avoid publication screenshots containing DevTools, browser extension overlays, console warnings, unrelated desktop content, or debugging UI.

A screenshot belongs to the publication set only when it demonstrates distinct verified behavior and passes the applicable privacy review.