// src/features/account/components/OrderCard.tsx
'use client';

import { FaArrowRight, FaBox, FaCreditCard } from 'react-icons/fa';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderSummary {
  id: string;
  number: string;
  createdAt: string; // ISO ou string simples
  status: OrderStatus;
  total: number;
  itemsCount: number;
  paymentMethod: 'pix' | 'card' | 'boleto';
  deliveryForecast?: string;
}

interface OrderCardProps {
  order: OrderSummary;
}

function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return 'Pagamento pendente';
    case 'processing':
      return 'Em preparação';
    case 'shipped':
      return 'Enviado';
    case 'delivered':
      return 'Entregue';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
}

function getStatusClass(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return 'status-badge status-badge--warning';
    case 'processing':
      return 'status-badge status-badge--info';
    case 'shipped':
      return 'status-badge status-badge--accent';
    case 'delivered':
      return 'status-badge status-badge--success';
    case 'cancelled':
      return 'status-badge status-badge--danger';
    default:
      return 'status-badge';
  }
}

function getPaymentLabel(
  method: OrderSummary['paymentMethod'],
): string {
  switch (method) {
    case 'pix':
      return 'PIX';
    case 'card':
      return 'Cartão de crédito';
    case 'boleto':
      return 'Boleto bancário';
    default:
      return method;
  }
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="order-card">
      <header className="order-card__header">
        <div className="order-card__title-group">
          <span className="order-card__icon">
            <FaBox />
          </span>
          <div>
            <h3 className="order-card__title">
              Pedido #{order.number}
            </h3>
            <p className="order-card__meta">
              Realizado em{' '}
              <time dateTime={order.createdAt}>
                {order.createdAt}
              </time>
            </p>
          </div>
        </div>

        <span className={getStatusClass(order.status)}>
          {getStatusLabel(order.status)}
        </span>
      </header>

      <div className="order-card__body">
        <div className="order-card__row">
          <span className="order-card__label">
            Itens
          </span>
          <span className="order-card__value">
            {order.itemsCount} item
            {order.itemsCount !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="order-card__row">
          <span className="order-card__label">
            Pagamento
          </span>
          <span className="order-card__value order-card__value--payment">
            <FaCreditCard
              className="order-card__value-icon"
              aria-hidden="true"
            />
            {getPaymentLabel(order.paymentMethod)}
          </span>
        </div>

        {order.deliveryForecast && (
          <div className="order-card__row">
            <span className="order-card__label">
              Previsão de entrega
            </span>
            <span className="order-card__value">
              {order.deliveryForecast}
            </span>
          </div>
        )}
      </div>

      <footer className="order-card__footer">
        <div className="order-card__total">
          <span className="order-card__total-label">
            Total
          </span>
          <span className="order-card__total-value">
            {formatCurrency(order.total)}
          </span>
        </div>

        <button
          type="button"
          className="btn-secondary btn-secondary--ghost"
        >
          Ver detalhes
          <FaArrowRight
            className="btn-secondary__icon"
            aria-hidden="true"
          />
        </button>
      </footer>
    </article>
  );
}
