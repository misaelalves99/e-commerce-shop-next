// src/features/account/components/OrderList.tsx
'use client';

import OrderCard, {
  type OrderSummary,
} from './OrderCard';

const MOCK_ORDERS: OrderSummary[] = [
  {
    id: '1',
    number: '2025-0001',
    createdAt: '10/12/2025',
    status: 'delivered',
    total: 459.9,
    itemsCount: 3,
    paymentMethod: 'pix',
    deliveryForecast: 'Entregue em 05/12/2025',
  },
  {
    id: '2',
    number: '2025-0002',
    createdAt: '08/12/2025',
    status: 'shipped',
    total: 1299.9,
    itemsCount: 1,
    paymentMethod: 'card',
    deliveryForecast: 'Previsto para 14/12/2025',
  },
  {
    id: '3',
    number: '2025-0003',
    createdAt: '07/12/2025',
    status: 'processing',
    total: 89.9,
    itemsCount: 2,
    paymentMethod: 'boleto',
    deliveryForecast: 'Aguardando atualização',
  },
];

export default function OrderList() {
  const hasOrders = MOCK_ORDERS.length > 0;

  if (!hasOrders) {
    return (
      <div className="empty-state">
        <div className="empty-state__content">
          <p className="empty-state__title">
            Você ainda não fez nenhum pedido
          </p>
          <p className="empty-state__description">
            Assim que você realizar compras, elas aparecerão
            aqui com status de pagamento e acompanhamento de
            entrega.
          </p>
          <a
            href="/products"
            className="btn-primary empty-state__action"
          >
            Começar a comprar
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="order-list">
      <div className="order-list__summary">
        <p className="order-list__summary-text">
          {MOCK_ORDERS.length} pedido
          {MOCK_ORDERS.length !== 1 ? 's' : ''} registrado
          {MOCK_ORDERS.length !== 1 ? 's' : ''}.
        </p>
      </div>

      <div className="order-list__grid">
        {MOCK_ORDERS.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
