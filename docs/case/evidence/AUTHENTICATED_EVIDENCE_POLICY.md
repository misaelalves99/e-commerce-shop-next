# Authenticated Evidence Policy

## Purpose

This policy defines the privacy boundary for authenticated case-study screenshots.

Authenticated public evidence must demonstrate real application behavior without publishing the operator's personal identity or private account data.

## Approved strategy

Use a dedicated demonstration identity for public authenticated evidence.

The demonstration identity must not reuse the operator's personal account information.

Use fictitious customer and address information where application fields require profile or checkout data.

## Credential boundary

Credentials used for the demonstration identity must never be:

- committed to Git;
- written into this documentation;
- stored in screenshot filenames;
- exposed in screenshots;
- copied into public case material.

## Allowed evidence

Authenticated screenshots may demonstrate:

- checkout steps;
- fictitious delivery information;
- payment-method selection;
- order review;
- successful order creation;
- persisted order history.

## Forbidden public data

Do not publish:

- the operator's real name;
- the operator's real email address;
- the operator's real phone number;
- the operator's real postal address;
- authentication tokens;
- cookies;
- account identifiers;
- credentials;
- environment values;
- private session information.

## Demonstration data

Demonstration profile and delivery values should be obviously fictitious while remaining valid enough for the application's form rules.

Do not alter application validation or production behavior solely to make evidence capture easier.

## Runtime truth

Screenshots must come from the actual application runtime.

Do not fabricate order-success or order-history evidence.

An order shown as persisted evidence must have been created through the implemented checkout flow.

## Fallback rule

If a privacy-safe authenticated state cannot be produced without changing application behavior or exposing real personal information, omit that public screenshot rather than publishing unsafe evidence.

## Publication sequence

The preferred authenticated evidence sequence is:

1. Checkout
2. Order Creation Success
3. Persisted Orders

Account / Profile remains optional and should be included only when it adds distinct evidence.
