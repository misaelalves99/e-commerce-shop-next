// src/features/checkout/components/PaymentMethods.tsx
'use client';

import { useState } from 'react';
import styles from '../styles/CheckoutPage.module.css';

type PaymentMethodId = 'pix' | 'credit-card' | 'boleto';

type Props = {
  selectedMethodId?: string;
  onSubmit: (methodId: string) => void;
  onBack?: () => void;
};

type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  description: string;
  highlight?: string;
  badge?: string;
};

const METHODS: PaymentMethod[] = [
  {
    id: 'pix',
    label: 'PIX',
    description: 'Aprovação instantânea, mais agilidade no envio do seu pedido.',
    highlight: 'Até 5% OFF à vista no PIX',
    badge: 'Recomendado',
  },
  {
    id: 'credit-card',
    label: 'Cartão de crédito',
    description: 'Parcele sua compra com segurança nas principais bandeiras.',
    highlight: 'Até 10x sem juros',
  },
  {
    id: 'boleto',
    label: 'Boleto bancário',
    description:
      'Pague em qualquer banco ou lotérica. Liberação após compensação.',
    highlight: 'Prazo de compensação de 1 a 2 dias úteis',
  },
];

export default function PaymentMethods({
  selectedMethodId,
  onSubmit,
  onBack,
}: Props) {
  const [current, setCurrent] = useState<PaymentMethodId>(
    (selectedMethodId as PaymentMethodId) || 'pix'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    if (!current) return;
    setIsSubmitting(true);
    onSubmit(current);
    setIsSubmitting(false);
  };

  return (
    <div className={styles.paymentSection}>
      <div className={styles.paymentGrid}>
        <div className={styles.paymentList}>
          {METHODS.map((method) => {
            const isActive = current === method.id;

            return (
              <button
                key={method.id}
                type="button"
                className={`${styles.paymentOption} ${
                  isActive ? styles.paymentOptionActive : ''
                }`}
                onClick={() => setCurrent(method.id)}
                aria-pressed={isActive}
              >
                <div className={styles.paymentOptionHeader}>
                  <div className={styles.paymentOptionMain}>
                    <span className={styles.paymentOptionRadio}>
                      <span className={styles.paymentOptionRadioOuter} />
                      <span className={styles.paymentOptionRadioInner} />
                    </span>

                    <div className={styles.paymentOptionText}>
                      <span className={styles.paymentOptionLabel}>
                        {method.label}
                      </span>
                      <span className={styles.paymentOptionDescription}>
                        {method.description}
                      </span>
                    </div>
                  </div>

                  {method.badge && (
                    <span className={styles.paymentOptionBadge}>
                      {method.badge}
                    </span>
                  )}
                </div>

                {method.highlight && (
                  <p className={styles.paymentOptionHighlight}>
                    {method.highlight}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        <aside className={styles.paymentAside}>
          <h3 className={styles.paymentAsideTitle}>Resumo da forma de pagamento</h3>
          <p className={styles.paymentAsideText}>
            Você pode ajustar as regras e integrações reais depois, conectando
            este fluxo às APIs do seu provedor de pagamento favorito (Stripe,
            Mercado Pago, Pagar.me, etc.).
          </p>

          <ul className={styles.paymentAsideList}>
            <li>Layout inspirado em e-commerces de alto volume.</li>
            <li>Cards responsivos, prontos para mobile e desktop.</li>
            <li>Preparado para exibir taxas, parcelas, juros e prazos.</li>
          </ul>
        </aside>
      </div>

      <div className={styles.paymentActions}>
        {onBack && (
          <button
            type="button"
            className={styles.ghostButton}
            onClick={onBack}
          >
            Voltar para endereço
          </button>
        )}

        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Aplicando método...' : 'Continuar para revisão'}
        </button>
      </div>
    </div>
  );
}
