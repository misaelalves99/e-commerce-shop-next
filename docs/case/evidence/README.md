# Visual Evidence Manifest

## Purpose

This directory stores publication-selected evidence for the E-Commerce Shop Next case study.

Evidence must demonstrate verified application behavior without exposing private or security-sensitive information.

## Planned captures

### 01 — Home / Catalog

Purpose:
Show the public storefront, product discovery experience, and overall visual identity.

Expected route:
`/` or `/products`

Evidence value:
Demonstrates the public commerce surface and catalog presentation.

### 02 — Product Detail

Purpose:
Show an individual product view and purchase-oriented interaction context.

Expected route:
`/product/[id]`

Evidence value:
Demonstrates product detail composition and catalog integration.

### 03 — Cart

Purpose:
Show selected products, quantities, and transition toward checkout.

Expected route:
`/cart`

Evidence value:
Demonstrates commerce-state behavior before order creation.

### 04 — Checkout

Purpose:
Show the multi-step authenticated checkout flow.

Expected route:
`/checkout`

Evidence value:
Demonstrates address, payment-method, and review workflow.

### 05 — Order Creation Success

Purpose:
Show the successful result of creating a persisted order.

Expected context:
Checkout success state or immediate post-order state.

Evidence value:
Demonstrates completion of the checkout-to-order flow.

### 06 — Persisted Orders

Purpose:
Show authenticated order history backed by persisted application data.

Expected route:
`/orders`

Evidence value:
Demonstrates that orders survive navigation/reload and are read from the persisted order source.

### 07 — Account / Profile

Purpose:
Show the authenticated account experience and persisted profile/address context.

Expected route:
`/profile` or `/address`

Evidence value:
Demonstrates the account persistence surface.

## Optional capture

### Authentication Entry

Expected route:
`/login`

Use only if it improves the case narrative.

The final publication set does not need to include every operational screen.

## Capture rules

Final evidence must not expose:

- passwords;
- authentication tokens;
- cookies;
- local environment values;
- Firebase Admin credentials;
- revalidation secrets;
- private browser/session information;
- unnecessary personal information.

Avoid final screenshots containing:

- DevTools;
- browser extension overlays;
- console warnings;
- unrelated desktop content;
- debugging UI.

## Selection rule

A screenshot should be versioned only when it adds distinct evidence to the case.

Multiple images showing the same capability should be avoided unless they demonstrate materially different states.
