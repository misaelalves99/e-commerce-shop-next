
// src/features/checkout/pages/CheckoutPage.tsx
'use client';

import type { ReactElement } from 'react';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { useCart } from '@/core/hooks/useCart';
import { ROUTES } from '@/core/config/routes';
import type { CartItem } from '@/core/types/cart';
import type { AddressData } from '@/core/types/address';

import CartSummary from '@/features/cart/components/CartSummary';
import EmptyCartState from '@/features/cart/components/EmptyCartState';
import CheckoutSteps from '../components/CheckoutSteps';
// estes dois componentes serÃ£o implementados depois
import AddressForm from '../components/AddressForm';
import PaymentMethods from '../components/PaymentMethods';

import styles from '../styles/CheckoutPage.module.css';

type CheckoutStep = 'address' | 'payment' | 'review';

export default function CheckoutPage(): ReactElement {
  const { items, subtotal, totalItems, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const handlePaymentSubmit = (methodId: string) => {
    setPaymentMethod(methodId);
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    if (!hasItems || !addressData || !paymentMethod) return;

    setIsPlacingOrder(true);

    try {
      // aqui futuramente vocÃª integra com API /order
      await new Promise((resolve) => setTimeout(resolve, 900));
      if (typeof clearCart === 'function') {
        clearCart();
      }
      setOrderPlaced(true);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!hasItems && !orderPlaced) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Finalizar compra</h1>
          <p className={styles.subtitle}>
            Ainda nÃ£o hÃ¡ produtos no seu carrinho. Explore as ofertas e volte
            para concluir sua compra.
          </p>
        </header>

        <EmptyCartState
          ctaLabel="Ver ofertas"
          description="Adicione produtos ao carrinho para visualizar o fluxo completo de checkout, como nos grandes e-commerces do mercado."
          href={ROUTES.catalog}
        />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Finalizar compra</h1>
        <p className={styles.subtitle}>
          Revise seus dados, escolha a forma de pagamento e confirme seu pedido
          com seguranÃ§a, em uma experiÃªncia inspirada nos grandes players como
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
            // sÃ³ permite voltar, nunca avanÃ§ar por clique
            if (step === 'address') setCurrentStep('address');
            if (step === 'payment' && addressData) setCurrentStep('payment');
          }}
        />
      )}

      <section className={styles.content}>
        <div className={styles.mainColumn}>
          {orderPlaced ? (
            <section className={styles.confirmationCard}>
              <div className={styles.confirmationIcon}>âœ…</div>
              <h2 className={styles.confirmationTitle}>
                Pedido confirmado com sucesso
              </h2>
              <p className={styles.confirmationText}>
                Enviamos os detalhes do seu pedido para o e-mail cadastrado.
                VocÃª poderÃ¡ acompanhar o status em{' '}
                <Link href={ROUTES.account.orders}>Meus pedidos</Link>.
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
                  aria-label="EndereÃ§o de entrega"
                >
                  <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>EndereÃ§o de entrega</h2>
                    <p className={styles.sectionSubtitle}>
                      Informe um endereÃ§o completo para calcular frete e prazo
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
                      estÃ¡ pronto para ser integrado com APIs reais depois.
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
                      Confirme os dados antes de finalizar. Depois, vocÃª serÃ¡
                      redirecionado para a pÃ¡gina de confirmaÃ§Ã£o.
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
                        <h3 className={styles.reviewTitle}>EndereÃ§o</h3>
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
                            Editar endereÃ§o
                          </button>
                        </div>
                      </div>
                    )}

                    {paymentMethod && (
                      <div className={styles.reviewColumn}>
                        <h3 className={styles.reviewTitle}>Pagamento</h3>
                        <p className={styles.reviewText}>
                          MÃ©todo selecionado:{' '}
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
    </main>
  );
}





