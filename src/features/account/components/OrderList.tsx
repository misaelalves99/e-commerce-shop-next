// src/features/account/components/OrderList.tsx
'use client';

import Link from 'next/link';

import { ROUTES } from '@/core/config/routes';
import type { Order } from '@/core/types/order';

import OrderCard from './OrderCard';

interface OrderListProps {
  orders: readonly Order[];
}

export default function OrderList({
  orders,
}: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__content">
          <p className="empty-state__title">
            Você ainda não fez nenhum pedido
          </p>

          <p className="empty-state__description">
            Assim que você realizar compras, elas aparecerão
            aqui com status e informações do pedido.
          </p>

          <Link
            href={ROUTES.catalog}
            className="btn-primary empty-state__action"
          >
            Começar a comprar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-list">
      <div className="order-list__summary">
        <p className="order-list__summary-text">
          {orders.length} pedido
          {orders.length !== 1 ? 's' : ''} registrado
          {orders.length !== 1 ? 's' : ''}.
        </p>
      </div>

      <div className="order-list__grid">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </div>
  );
}
