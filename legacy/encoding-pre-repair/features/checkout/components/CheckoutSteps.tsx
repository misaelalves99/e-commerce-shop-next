
// src/features/checkout/components/CheckoutSteps.tsx
'use client';

import type { ReactElement } from 'react';

import styles from '../styles/CheckoutSteps.module.css';

type CheckoutStep = 'address' | 'payment' | 'review';

type Props = {
  currentStep: CheckoutStep;
  onStepChange?: (step: CheckoutStep) => void;
};

const steps: { id: CheckoutStep; label: string; description: string }[] = [
  {
    id: 'address',
    label: 'EndereÃ§o',
    description: 'Dados de entrega',
  },
  {
    id: 'payment',
    label: 'Pagamento',
    description: 'Forma de pagamento',
  },
  {
    id: 'review',
    label: 'Revisar',
    description: 'ConfirmaÃ§Ã£o do pedido',
  },
];

export default function CheckoutSteps({
  currentStep,
  onStepChange,
}: Props): ReactElement {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <nav
      className={styles.wrapper}
      aria-label="Etapas do checkout"
      data-step={currentStep}
    >
      <ol className={styles.list}>
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentIndex;

          const status = isActive
            ? 'active'
            : isCompleted
            ? 'completed'
            : 'upcoming';

          const canClick = typeof onStepChange === 'function' && isCompleted;

          return (
            <li
              key={step.id}
              className={`${styles.item} ${styles[status]}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <button
                type="button"
                className={styles.button}
                onClick={canClick ? () => onStepChange(step.id) : undefined}
                disabled={!canClick}
              >
                <span className={styles.indicator} aria-hidden="true">
                  {isCompleted ? 'âœ“' : index + 1}
                </span>

                <span className={styles.textBox}>
                  <span className={styles.label}>{step.label}</span>
                  <span className={styles.description}>
                    {step.description}
                  </span>
                </span>
              </button>

              {index < steps.length - 1 && (
                <span className={styles.separator} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}



