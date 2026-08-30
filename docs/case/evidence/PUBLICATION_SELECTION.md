# Publication Evidence Selection

## Status

Primary evidence set frozen for publication review.

## Selected primary evidence

1. `01-home-catalog/home-catalog.png`
2. `02-product-detail/product-detail.png`
3. `03-cart/cart.png`
4. `04-checkout/checkout.png`
5. `05-order-success/order-success.png`
6. `06-orders/orders.png`

## Narrative

The selected evidence forms one continuous commerce narrative:

`Home / Catalog -> Product Detail -> Guest Cart -> Authenticated Checkout -> Order Success -> Persisted Orders`

## Secondary evidence decision

`07-account-profile` is not selected for the primary publication set.

The authenticated checkout and persisted-orders evidence already demonstrate authenticated application state and persisted customer-facing behavior. A profile screenshot would add limited distinct evidence while increasing the privacy surface.

`optional-auth-entry` is not selected for the primary publication set.

Authentication entry is operationally relevant but does not add enough distinct value to the primary commerce narrative.

## Privacy boundary

Authenticated screenshots in the selected set use a dedicated demonstration identity and must remain compliant with `AUTHENTICATED_EVIDENCE_POLICY.md`.

No screenshot containing the operator's personal account information belongs to the public evidence set.

## Selection principle

The primary set favors distinct evidence over screenshot volume.

A secondary screenshot may be added later only if it demonstrates a materially different capability that is necessary to the publication narrative.