# Evidence Plan

## Purpose

This document records the evidence strategy used to support the project as a publication-ready technical case study.

The publication evidence must represent verified application behavior and repository validation rather than inferred capability.

## Selected visual evidence

The primary publication set contains six screenshots:

1. Home / Catalog
2. Product Detail
3. Guest Cart
4. Authenticated Checkout
5. Order Creation Success
6. Persisted Orders

Together they form the following commerce narrative:

`Home / Catalog -> Product Detail -> Guest Cart -> Authenticated Checkout -> Order Success -> Persisted Orders`

The canonical image paths and final selection rationale are recorded in [`evidence/PUBLICATION_SELECTION.md`](./evidence/PUBLICATION_SELECTION.md).

## Evidence intentionally excluded from the primary set

Account / Profile is not part of the primary publication sequence because authenticated checkout and persisted orders already demonstrate authenticated customer-facing state. Excluding the additional screen reduces redundant evidence and privacy surface.

Authentication Entry is also excluded from the primary sequence because it does not add enough distinct value to the commerce narrative.

These screens may be reconsidered only if a later publication requires evidence of a materially different capability.

## Technical validation evidence

Publication claims are supported by repository validation that includes:

- automated tests;
- TypeScript type checking;
- ESLint;
- dependency security audit;
- production build validation;
- repository quality workflow.

Runtime screenshots and repository gates serve different purposes.

Visual evidence demonstrates implemented user-facing behavior. Technical validation demonstrates repository integrity and build readiness.

## Privacy and security boundary

Evidence must not expose:

- passwords;
- authentication tokens;
- cookies;
- Firebase Admin credentials;
- revalidation credentials;
- local environment values;
- private browser or session information;
- unnecessary personal information.

Authenticated public evidence follows [`evidence/AUTHENTICATED_EVIDENCE_POLICY.md`](./evidence/AUTHENTICATED_EVIDENCE_POLICY.md).

Capture requirements are defined in [`evidence/CAPTURE_PROTOCOL.md`](./evidence/CAPTURE_PROTOCOL.md).

## Publication rule

Runtime assets are not automatically case-study evidence.

Evidence becomes publication evidence only after intentional capture, privacy review, selection, and documentation.

The current primary visual evidence set is frozen for publication review.