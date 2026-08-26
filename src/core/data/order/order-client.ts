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

interface ListOrdersResponse {
  orders?: Order[];
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

async function readJsonResponse<T>(
  response: Response,
): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function listOrdersFromApi():
  Promise<Order[]> {
  const response = await fetch(
    '/api/orders',
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  const body =
    await readJsonResponse<ListOrdersResponse>(
      response,
    );

  if (
    !response.ok ||
    !body ||
    !Array.isArray(body.orders)
  ) {
    throw new OrderClientError(
      body?.error ??
        'Não foi possível carregar seus pedidos.',
      response.status,
    );
  }

  return body.orders;
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

  const body =
    await readJsonResponse<CreateOrderResponse>(
      response,
    );

  if (
    response.status !== 201 ||
    !body?.order
  ) {
    throw new OrderClientError(
      body?.error ??
        'Não foi possível criar o pedido.',
      response.status,
    );
  }

  return body.order;
}
