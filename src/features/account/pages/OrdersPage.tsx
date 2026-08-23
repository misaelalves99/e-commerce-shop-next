// src/features/account/pages/OrdersPage.tsx
'use client';

import { FaShoppingBag } from 'react-icons/fa';

import OrderList from '../components/OrderList';

import styles from '../styles/OrdersPage.module.css';

export default function OrdersPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <span className={styles.headerIcon}>
            <FaShoppingBag />
          </span>
          <div>
            <h1 className={styles.headerTitle}>Meus pedidos</h1>
            <p className={styles.headerSubtitle}>
              Acompanhe o histórico de compras, status de entrega e detalhes de
              cada pedido feito na loja.
            </p>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Pedidos recentes</h2>
              <p className={styles.cardSubtitle}>
                Aqui você encontra os pedidos mais recentes. Em breve, essa
                área pode se integrar a uma API real.
              </p>
            </div>

            <OrderList />
          </div>
        </section>
      </main>
    </div>
  );
}
