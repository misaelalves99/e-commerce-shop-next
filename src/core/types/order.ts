import type { AddressData } from './address';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type OrderPaymentMethod =
  | 'pix'
  | 'credit-card'
  | 'boleto';

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
  address: AddressData;
  paymentMethod: OrderPaymentMethod;
}

export interface OrderItemSnapshot {
  productId: string;
  title: string;
  image: string;

  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderDraft {
  items: OrderItemSnapshot[];
  address: AddressData;
  paymentMethod: OrderPaymentMethod;

  itemsCount: number;
  subtotal: number;
  total: number;
}

export interface Order extends OrderDraft {
  id: string;
  number: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
