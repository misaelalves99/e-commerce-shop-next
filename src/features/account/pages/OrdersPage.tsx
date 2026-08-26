// src/features/account/pages/OrdersPage.tsx
'use client';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FaShoppingBag } from 'react-icons/fa';

import {
  listOrdersFromApi,
  OrderClientError,
} from '@/core/data/order/order-client';
import { useAuth } from '@/core/hooks/useAuth';
import type { Order } from '@/core/types/order';

import OrderList from '../components/OrderList';

import styles from '../styles/OrdersPage.module.css';

function resolveOrdersError(
  error: unknown,
): string {
  if (error instanceof OrderClientError) {
    return error.status === 401
      ? 'Sua sessão expirou. Entre novamente para consultar seus pedidos.'
      : error.message;
  }

  return 'Não foi possível carregar seus pedidos. Tente novamente.';
}

export default function OrdersPage() {
  const {
    loading: authLoading,
    isAuthenticated,
    serverSessionReady,
  } = useAuth();

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (
      authLoading ||
      !isAuthenticated ||
      !serverSessionReady
    ) {
      return;
    }

    let active = true;

    listOrdersFromApi()
      .then((nextOrders) => {
        if (!active) {
          return;
        }

        setOrders(nextOrders);
        setError(null);
      })
      .catch((loadError: unknown) => {
        if (!active) {
          return;
        }

        setError(
          resolveOrdersError(loadError),
        );
      })
      .finally(() => {
        if (!active) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [
    authLoading,
    isAuthenticated,
    serverSessionReady,
  ]);

  const handleRetry =
    useCallback(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const nextOrders =
          await listOrdersFromApi();

        setOrders(nextOrders);
      } catch (loadError: unknown) {
        setError(
          resolveOrdersError(loadError),
        );
      } finally {
        setIsLoading(false);
      }
    }, []);

  const waitingForSession =
    authLoading ||
    (
      isAuthenticated &&
      !serverSessionReady
    );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <span className={styles.headerIcon}>
            <FaShoppingBag />
          </span>

          <div>
            <h1 className={styles.headerTitle}>
              Meus pedidos
            </h1>

            <p className={styles.headerSubtitle}>
              Acompanhe seu histórico de compras e o status
              dos pedidos realizados na loja.
            </p>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                Pedidos recentes
              </h2>

              <p className={styles.cardSubtitle}>
                Seus pedidos são carregados da sua conta e
                exibidos do mais recente para o mais antigo.
              </p>
            </div>

            {(waitingForSession || isLoading) && (
              <div
                className={styles.stateBox}
                aria-live="polite"
              >
                <p className={styles.stateTitle}>
                  Carregando seus pedidos...
                </p>

                <p className={styles.stateDescription}>
                  Estamos consultando o histórico vinculado
                  à sua conta.
                </p>
              </div>
            )}

            {!waitingForSession &&
              !isLoading &&
              error && (
                <div
                  className={`${styles.stateBox} ${styles.stateBoxError}`}
                  role="alert"
                >
                  <p className={styles.stateTitle}>
                    Não foi possível carregar os pedidos
                  </p>

                  <p className={styles.stateDescription}>
                    {error}
                  </p>

                  <button
                    type="button"
                    className="btn-secondary btn-secondary--ghost"
                    onClick={() => {
                      void handleRetry();
                    }}
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

            {!waitingForSession &&
              !isLoading &&
              !error && (
                <OrderList orders={orders} />
              )}
          </div>
        </section>
      </main>
    </div>
  );
}
