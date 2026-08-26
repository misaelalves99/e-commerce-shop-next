import {
  normalizeAddress,
} from '@/core/data/account/account-normalize';
import {
  productsMock,
} from '@/core/mocks/products.mock';
import type {
  CreateOrderInput,
  CreateOrderItemInput,
  OrderDraft,
  OrderItemSnapshot,
  OrderPaymentMethod,
} from '@/core/types/order';

const PAYMENT_METHODS:
  readonly OrderPaymentMethod[] = [
    'pix',
    'credit-card',
    'boleto',
  ];

interface CatalogOrderProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  stock?: number;
}

interface CreateOrderBody {
  items?: unknown;
  address?: unknown;
  paymentMethod?: unknown;
}

export class OrderValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderValidationError';
  }
}

function roundCurrency(
  value: number,
): number {
  return Number(value.toFixed(2));
}

function normalizeOrderItemInput(
  value: unknown,
): CreateOrderItemInput | null {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value)
  ) {
    return null;
  }

  const candidate =
    value as Record<string, unknown>;

  if (
    typeof candidate.productId !== 'string' ||
    candidate.productId.trim().length === 0 ||
    typeof candidate.quantity !== 'number' ||
    !Number.isFinite(candidate.quantity)
  ) {
    return null;
  }

  const quantity =
    Math.trunc(candidate.quantity);

  if (quantity < 1) {
    return null;
  }

  return {
    productId:
      candidate.productId.trim(),
    quantity,
  };
}

function normalizeOrderItems(
  value: unknown,
): CreateOrderItemInput[] | null {
  if (
    !Array.isArray(value) ||
    value.length === 0
  ) {
    return null;
  }

  const quantities =
    new Map<string, number>();

  for (const entry of value) {
    const item =
      normalizeOrderItemInput(entry);

    if (!item) {
      return null;
    }

    quantities.set(
      item.productId,
      (quantities.get(
        item.productId,
      ) ?? 0) + item.quantity,
    );
  }

  return [
    ...quantities.entries(),
  ].map(
    ([productId, quantity]) => ({
      productId,
      quantity,
    }),
  );
}

function normalizePaymentMethod(
  value: unknown,
): OrderPaymentMethod | null {
  if (
    typeof value !== 'string'
  ) {
    return null;
  }

  return PAYMENT_METHODS.includes(
    value as OrderPaymentMethod,
  )
    ? (value as OrderPaymentMethod)
    : null;
}

export function normalizeCreateOrderInput(
  value: unknown,
): CreateOrderInput | null {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value)
  ) {
    return null;
  }

  const body =
    value as CreateOrderBody;

  const items =
    normalizeOrderItems(body.items);

  const address =
    normalizeAddress(body.address);

  const paymentMethod =
    normalizePaymentMethod(
      body.paymentMethod,
    );

  if (
    !items ||
    !address ||
    !paymentMethod
  ) {
    return null;
  }

  return {
    items,
    address,
    paymentMethod,
  };
}

function catalogProducts():
  CatalogOrderProduct[] {
  return productsMock.map(
    (product) => ({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      stock: product.stock,
    }),
  );
}

export function createOrderDraft(
  input: CreateOrderInput,
  catalog:
    readonly CatalogOrderProduct[] =
      catalogProducts(),
): OrderDraft {
  const catalogById =
    new Map(
      catalog.map(
        (product) => [
          product.id,
          product,
        ],
      ),
    );

  const items:
    OrderItemSnapshot[] = [];

  for (const requestedItem of input.items) {
    const product =
      catalogById.get(
        requestedItem.productId,
      );

    if (!product) {
      throw new OrderValidationError(
        `Product not found: ${requestedItem.productId}`,
      );
    }

    if (
      !Number.isFinite(product.price) ||
      product.price < 0
    ) {
      throw new OrderValidationError(
        `Product has invalid price: ${requestedItem.productId}`,
      );
    }

    if (
      typeof product.stock === 'number' &&
      requestedItem.quantity >
        product.stock
    ) {
      throw new OrderValidationError(
        `Insufficient stock for product: ${requestedItem.productId}`,
      );
    }

    const unitPrice =
      roundCurrency(product.price);

    const lineTotal =
      roundCurrency(
        unitPrice *
          requestedItem.quantity,
      );

    items.push({
      productId: product.id,
      title: product.title,
      image: product.image,
      unitPrice,
      quantity:
        requestedItem.quantity,
      lineTotal,
    });
  }

  const itemsCount =
    items.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    );

  const subtotal =
    roundCurrency(
      items.reduce(
        (total, item) =>
          total + item.lineTotal,
        0,
      ),
    );

  return {
    items,
    address: input.address,
    paymentMethod:
      input.paymentMethod,
    itemsCount,
    subtotal,
    total: subtotal,
  };
}
