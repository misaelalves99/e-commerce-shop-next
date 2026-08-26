import 'server-only';

import {
  Timestamp,
  type DocumentData,
} from 'firebase-admin/firestore';

import {
  getFirebaseAdminFirestore,
} from '@/core/lib/firebase/admin/firebase-admin';
import type {
  Order,
  OrderDraft,
  OrderPaymentMethod,
  OrderStatus,
} from '@/core/types/order';

const USERS_COLLECTION = 'users';
const ORDERS_COLLECTION = 'orders';

function ordersCollection(
  uid: string,
) {
  return getFirebaseAdminFirestore()
    .collection(USERS_COLLECTION)
    .doc(uid)
    .collection(ORDERS_COLLECTION);
}

function orderNumber(
  id: string,
): string {
  return `ORD-${id
    .slice(0, 8)
    .toUpperCase()}`;
}

function timestampToIso(
  value: unknown,
): string | null {
  if (value instanceof Timestamp) {
    return value
      .toDate()
      .toISOString();
  }

  if (typeof value === 'string') {
    return value;
  }

  return null;
}

function normalizePersistedOrder(
  id: string,
  data: DocumentData,
): Order | null {
  if (
    !Array.isArray(data.items) ||
    typeof data.number !== 'string' ||
    typeof data.status !== 'string' ||
    typeof data.paymentMethod !==
      'string' ||
    typeof data.itemsCount !==
      'number' ||
    typeof data.subtotal !==
      'number' ||
    typeof data.total !== 'number' ||
    typeof data.address !== 'object' ||
    data.address === null
  ) {
    return null;
  }

  const createdAt =
    timestampToIso(
      data.createdAt,
    );

  const updatedAt =
    timestampToIso(
      data.updatedAt,
    );

  if (
    !createdAt ||
    !updatedAt
  ) {
    return null;
  }

  return {
    id,
    number: data.number,
    status:
      data.status as OrderStatus,
    paymentMethod:
      data.paymentMethod as
        OrderPaymentMethod,
    items: data.items,
    address: data.address,
    itemsCount: data.itemsCount,
    subtotal: data.subtotal,
    total: data.total,
    createdAt,
    updatedAt,
  } as Order;
}

export async function createOrder(
  uid: string,
  draft: OrderDraft,
): Promise<Order> {
  const reference =
    ordersCollection(uid).doc();

  const now = Timestamp.now();

  const order: Order = {
    id: reference.id,
    number:
      orderNumber(reference.id),
    status: 'pending',
    ...draft,
    createdAt:
      now.toDate().toISOString(),
    updatedAt:
      now.toDate().toISOString(),
  };

  await reference.set({
    ...draft,
    number: order.number,
    status: order.status,
    createdAt: now,
    updatedAt: now,
  });

  return order;
}

export async function listOrders(
  uid: string,
): Promise<Order[]> {
  const snapshot =
    await ordersCollection(uid)
      .orderBy(
        'createdAt',
        'desc',
      )
      .get();

  return snapshot.docs
    .map((document) =>
      normalizePersistedOrder(
        document.id,
        document.data(),
      ),
    )
    .filter(
      (order): order is Order =>
        order !== null,
    );
}
