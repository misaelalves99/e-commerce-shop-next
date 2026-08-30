# Capture Protocol

## Purpose

This protocol defines how public visual evidence is captured, reviewed, and selected for the E-Commerce Shop Next case study.

Evidence must remain technically truthful, visually consistent, privacy-safe, and tied to verified runtime behavior.

## Runtime source

Final screenshots must come from the production runtime generated from the verified Stage 08 case branch.

Required runtime sequence:

- npm run build
- npm run start

Development-mode screenshots should not be used as final evidence when a production-runtime capture is available.

## Browser state

Prefer a clean incognito or private browser window.

Final evidence must not contain:

- DevTools;
- console output;
- browser-extension overlays;
- autofill suggestion overlays;
- password-manager overlays;
- unrelated desktop content;
- private browser or session information.

## Viewport

Preferred desktop viewport: 1440 x 900.

An equivalent desktop viewport between approximately 1366 and 1536 pixels wide is acceptable when necessary.

Use one consistent viewport across the primary evidence set whenever practical.

Prioritize the application viewport rather than browser chrome.

## Format

Preferred format: PNG.

## Canonical artifacts

- 01-home-catalog/home-catalog.png
- 02-product-detail/product-detail.png
- 03-cart/cart.png
- 04-checkout/checkout.png
- 05-order-success/order-success.png
- 06-orders/orders.png
- 07-account-profile/account-profile.png
- optional-auth-entry/auth-entry.png

## Primary publication sequence

1. Home / Catalog
2. Product Detail
3. Cart
4. Checkout
5. Order Creation Success
6. Persisted Orders

Account / Profile remains a secondary candidate.

Authentication Entry remains optional.

## Guest-safe evidence

Prefer guest state for Home / Catalog, Product Detail, Cart, and Authentication Entry.

Guest screenshots should not expose authenticated account information.

## Authenticated evidence

Checkout, Order Success, Orders, and Account / Profile may require authentication.

Public authenticated evidence must use fictitious or intentionally sanitized customer information.

Do not publish real names, real email addresses, real phone numbers, real postal addresses, account identifiers, authentication information, session information, secrets, or credentials.

A screenshot containing real personal information is internal verification evidence only and must not be versioned as public case evidence.

## Checkout evidence

The checkout capture should demonstrate the workflow rather than customer identity.

Prefer a state that demonstrates the multi-step structure, light-form presentation, payment choices, exactly one selected payment option, and order summary.

Do not include browser autofill overlays.

## Order evidence

Order Success should demonstrate successful completion of checkout.

Persisted Orders should demonstrate that created orders remain available through order history.

Show only the information necessary to prove those behaviors.

## Product selection

When possible, choose a product whose title and image are semantically coherent.

Do not manipulate product data solely to improve a screenshot.

Known catalog-data limitations must not be hidden through falsified evidence.

## Review before versioning

Before copying an image into this directory, verify:

- correct production runtime;
- correct route and application state;
- distinct evidence value;
- no unnecessary personal information;
- no secrets or session information;
- no DevTools;
- no browser or extension overlay;
- no unrelated desktop content;
- correct canonical filename.

If any requirement fails, do not version the screenshot.

## Internal versus public evidence

Screenshots used during engineering verification are not automatically public case assets.

Only intentionally reviewed and approved screenshots belong in the public evidence set.

## Publication principle

Evidence must document what the application actually does.

Do not stage or edit screenshots in a way that misrepresents runtime behavior.
