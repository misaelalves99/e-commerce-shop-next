
// src/features/checkout/pages/CheckoutPage.tsx
'use client';

import type { ReactElement } from 'react';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import { useCart } from '@/core/hooks/useCart';
import { ROUTES } from '@/core/config/routes';
import type { AddressData } from '@/core/types/address';
import type {
  Order,
  OrderPaymentMethod,
} from '@/core/types/order';
import {
  createOrderFromCheckout,
  OrderClientError,
} from '@/core/data/order/order-client';

import CartSummary from '@/features/cart/components/CartSummary';
import EmptyCartState from '@/features/cart/components/EmptyCartState';
import CheckoutSteps from '../components/CheckoutSteps';
// estes dois componentes serão implementados depois
import AddressForm from '../components/AddressForm';
import PaymentMethods from '../components/PaymentMethods';

import styles from '../styles/CheckoutPage.module.css';

type CheckoutStep = 'address' | 'payment' | 'review';

export default function CheckoutPage(): ReactElement {
  const { items, subtotal, totalItems, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<OrderPaymentMethod | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const placingOrderRef = useRef(false);

  const currency = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    []
  );

  const hasItems = totalItems > 0;

  const handleAddressSubmit = (data: AddressData) => {
    setAddressData(data);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (methodId: OrderPaymentMethod) => {
    setPaymentMethod(methodId);
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    if (
      !hasItems ||
      !addressData ||
      !paymentMethod ||
      placingOrderRef.current
    ) {
      return;
    }

    placingOrderRef.current = true;
    setIsPlacingOrder(true);
    setOrderError(null);

    try {
      const order = await createOrderFromCheckout(
        items,
        addressData,
        paymentMethod,
      );

      setPlacedOrder(order);

      // The cart is cleared only after authoritative order creation.
      clearCart();
      setOrderPlaced(true);
    } catch (error: unknown) {
      const message =
        error instanceof OrderClientError
          ? error.status === 401
            ? 'Sua sessão expirou. Entre novamente antes de finalizar o pedido.'
            : error.message
          : 'Não foi possível finalizar o pedido. Seu carrinho foi preservado.';

      setOrderError(message);
    } finally {
      placingOrderRef.current = false;
      setIsPlacingOrder(false);
    }
  };

  if (!hasItems && !orderPlaced) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Finalizar compra</h1>
          <p className={styles.subtitle}>
            Ainda não há produtos no seu carrinho. Explore as ofertas e volte
            para concluir sua compra.
          </p>
        </header>

        <EmptyCartState
          ctaLabel="Ver ofertas"
          description="Adicione produtos ao carrinho para visualizar o fluxo completo de checkout, como nos grandes e-commerces do mercado."
          href={ROUTES.catalog}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Finalizar compra</h1>
        <p className={styles.subtitle}>
          Revise seus dados, escolha a forma de pagamento e confirme seu pedido
          com segurança, em uma experiência inspirada nos grandes players como
          Shopee, Shein e Amazon.
        </p>

        {!orderPlaced && (
          <div className={styles.headerMeta}>
            <span className={styles.badgeInfo}>
              {totalItems} {totalItems === 1 ? 'item' : 'itens'} no carrinho
            </span>
            <span className={styles.badgeAmount}>
              Subtotal: <strong>{currency.format(subtotal)}</strong>
            </span>
          </div>
        )}
      </header>

      {!orderPlaced && (
        <CheckoutSteps
          currentStep={currentStep}
          onStepChange={(step) => {
            // só permite voltar, nunca avançar por clique
            if (step === 'address') setCurrentStep('address');
            if (step === 'payment' && addressData) setCurrentStep('payment');
          }}
        />
      )}

      <section className={styles.content}>
        <div className={styles.mainColumn}>
          {orderPlaced ? (
            <section className={styles.confirmationCard}>
              <div className={styles.confirmationIcon}>✅</div>
              <h2 className={styles.confirmationTitle}>
                Pedido confirmado com sucesso
              </h2>
              <p className={styles.confirmationText}>
                {placedOrder ? (
                  <>
                    Pedido <strong>#{placedOrder.number}</strong> criado com
                    sucesso. Você poderá acompanhar o status em{' '}
                    <Link href={ROUTES.account.orders}>Meus pedidos</Link>.
                  </>
                ) : (
                  <>
                    Seu pedido foi confirmado. Você poderá acompanhar o status
                    em{' '}
                    <Link href={ROUTES.account.orders}>Meus pedidos</Link>.
                  </>
                )}
              </p>

              <div className={styles.confirmationActions}>
                <Link href={ROUTES.catalog} className={styles.primaryButton}>
                  Continuar comprando
                </Link>
                <Link
                  href={ROUTES.account.orders}
                  className={styles.secondaryLink}
                >
                  Ver pedidos
                </Link>
              </div>
            </section>
          ) : (
            <>
              {currentStep === 'address' && (
                <section
                  className={styles.sectionCard}
                  aria-label="Endereço de entrega"
                >
                  <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Endereço de entrega</h2>
                    <p className={styles.sectionSubtitle}>
                      Informe um endereço completo para calcular frete e prazo
                      de entrega.
                    </p>
                  </header>

                  <AddressForm
                    initialValue={addressData ?? undefined}
                    onSubmit={handleAddressSubmit}
                  />
                </section>
              )}

              {currentStep === 'payment' && (
                <section
                  className={styles.sectionCard}
                  aria-label="Forma de pagamento"
                >
                  <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Pagamento</h2>
                    <p className={styles.sectionSubtitle}>
                      Escolha a forma de pagamento que preferir. Este fluxo
                      está pronto para ser integrado com APIs reais depois.
                    </p>
                  </header>

                  <PaymentMethods
                    selectedMethodId={paymentMethod ?? undefined}
                    onSubmit={handlePaymentSubmit}
                    onBack={() => setCurrentStep('address')}
                  />
                </section>
              )}

              {currentStep === 'review' && (
                <section
                  className={styles.sectionCard}
                  aria-label="Revisar pedido"
                >
                  <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Revisar pedido</h2>
                    <p className={styles.sectionSubtitle}>
                      Confirme os dados antes de finalizar. Depois, você será
                      redirecionado para a página de confirmação.
                    </p>
                  </header>

                  <div className={styles.reviewGrid}>
                    <div className={styles.reviewColumn}>
                      <h3 className={styles.reviewTitle}>Produtos</h3>
                      <ul className={styles.itemsList}>
                        {items.map((item) => (
                          <li
                            key={item.productId}
                            className={styles.reviewItemRow}
                          >
                            <div className={styles.reviewItemInfo}>
                              <span className={styles.reviewItemName}>
                                {item.title}
                              </span>
                              <span className={styles.reviewItemMeta}>
                                Quantidade: {item.quantity}
                              </span>
                            </div>
                            <span className={styles.reviewItemPrice}>
                              {currency.format(item.price * item.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {addressData && (
                      <div className={styles.reviewColumn}>
                        <h3 className={styles.reviewTitle}>Endereço</h3>
                        <div className={styles.reviewAddressBox}>
                          <p className={styles.reviewAddressLine}>
                            {addressData.street}, {addressData.number}{' '}
                            {addressData.complement &&
                              `- ${addressData.complement}`}
                          </p>
                          <p className={styles.reviewAddressLine}>
                            {addressData.district} - {addressData.city}/
                            {addressData.state}
                          </p>
                          <p className={styles.reviewAddressLine}>
                            CEP {addressData.zipCode}
                          </p>

                          <button
                            type="button"
                            className={styles.inlineButton}
                            onClick={() => setCurrentStep('address')}
                          >
                            Editar endereço
                          </button>
                        </div>
                      </div>
                    )}

                    {paymentMethod && (
                      <div className={styles.reviewColumn}>
                        <h3 className={styles.reviewTitle}>Pagamento</h3>
                        <p className={styles.reviewText}>
                          Método selecionado:{' '}
                          <strong>{paymentMethod.toUpperCase()}</strong>
                        </p>

                        <button
                          type="button"
                          className={styles.inlineButton}
                          onClick={() => setCurrentStep('payment')}
                        >
                          Alterar forma de pagamento
                        </button>
                      </div>
                    )}
                  </div>

                  {orderError && (
                    <p
                      role="alert"
                      aria-live="polite"
                      className={styles.reviewText}
                    >
                      {orderError}
                    </p>
                  )}

                  <div className={styles.reviewActions}>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => setCurrentStep('payment')}
                    >
                      Voltar para pagamento
                    </button>

                    <button
                      type="button"
                      className={styles.primaryButton}
                      onClick={handlePlaceOrder}
                      disabled={isPlacingOrder}
                    >
                      {isPlacingOrder ? 'Finalizando...' : 'Confirmar pedido'}
                    </button>
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        {!orderPlaced && (
          <aside className={styles.summaryColumn}>
            <CartSummary subtotal={subtotal} totalItems={totalItems} />
          </aside>
        )}
      </section>
    </div>
  );
}
