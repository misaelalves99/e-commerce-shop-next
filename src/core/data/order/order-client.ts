import type { AddressData } from '@/core/types/address';
import type { CartItem } from '@/core/types/cart';
import type {
  Order,
  OrderPaymentMethod,
} from '@/core/types/order';

interface CreateOrderResponse {
  order?: Order;
  error?: string;
}

export class OrderClientError extends Error {
  readonly status: number;

  constructor(
    message: string,
    status: number,
  ) {
    super(message);
    this.name = 'OrderClientError';
    this.status = status;
  }
}

export async function createOrderFromCheckout(
  items: readonly CartItem[],
  address: AddressData,
  paymentMethod: OrderPaymentMethod,
): Promise<Order> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      address,
      paymentMethod,
    }),
  });

  let body: CreateOrderResponse = {};

  try {
    body =
      (await response.json()) as CreateOrderResponse;
  } catch {
    // Preserve the HTTP status even if the body is malformed.
  }

  if (
    response.status !== 201 ||
    !body.order
  ) {
    throw new OrderClientError(
      body.error ??
        'Não foi possível criar o pedido.',
      response.status,
    );
  }

  return body.order;
}
