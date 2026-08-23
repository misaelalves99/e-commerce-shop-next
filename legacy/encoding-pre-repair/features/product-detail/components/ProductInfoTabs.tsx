
// src/features/product-detail/components/ProductInfoTabs.tsx

'use client';

import type { ReactElement } from 'react';

import { useState } from 'react';
import styles from '../styles/ProductInfoTabs.module.css';

export interface ProductInfoTabsProps {
  description?: string | null;
  specs?: Record<string, string> | null;
  additionalInfo?: string | null;
  rating?: number | null;
  ratingCount?: number | null;
}

type TabKey = 'description' | 'details' | 'reviews';

export default function ProductInfoTabs({
  description,
  specs,
  additionalInfo,
  rating,
  ratingCount,
}: ProductInfoTabsProps): ReactElement {
  const [activeTab, setActiveTab] = useState<TabKey>('description');

  const safeDescription =
    description ||
    'DescriÃ§Ã£o nÃ£o disponÃ­vel no momento. Estamos atualizando as informaÃ§Ãµes deste produto.';

  const hasSpecs = specs && Object.keys(specs).length > 0;

  const hasReviews =
    typeof rating === 'number' && rating > 0 && typeof ratingCount === 'number';

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className={styles.panel}>
            <p className={styles.paragraph}>{safeDescription}</p>

            {additionalInfo && (
              <p className={styles.paragraphSecondary}>{additionalInfo}</p>
            )}

            <ul className={styles.list}>
              <li>Compra segura com proteÃ§Ã£o ao cliente.</li>
              <li>Envio rÃ¡pido com rastreio atualizado.</li>
              <li>Suporte dedicado para dÃºvidas sobre o produto.</li>
            </ul>
          </div>
        );

      case 'details':
        return (
          <div className={styles.panel}>
            {hasSpecs ? (
              <dl className={styles.specsGrid}>
                {Object.entries(specs!).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <dt className={styles.specLabel}>{key}</dt>
                    <dd className={styles.specValue}>{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className={styles.paragraphMuted}>
                As especificaÃ§Ãµes detalhadas ainda nÃ£o estÃ£o disponÃ­veis. Em breve
                vocÃª poderÃ¡ conferir todas as informaÃ§Ãµes tÃ©cnicas deste produto aqui.
              </p>
            )}
          </div>
        );

      case 'reviews':
        return (
          <div className={styles.panel}>
            {hasReviews ? (
              <>
                <div className={styles.ratingHeader}>
                  <div className={styles.ratingMain}>
                    <span className={styles.ratingValue}>{rating!.toFixed(1)}</span>
                    <span className={styles.ratingStar}>â˜…</span>
                  </div>
                  <p className={styles.ratingText}>
                    baseado em{' '}
                    <strong>
                      {ratingCount!.toLocaleString('pt-BR')} avaliaÃ§Ã£o
                      {ratingCount! > 1 ? 'es' : ''}
                    </strong>
                  </p>
                </div>

                <div className={styles.reviewsPlaceholder}>
                  <p className={styles.paragraphMuted}>
                    Nesta versÃ£o do projeto, os depoimentos estÃ£o representados apenas
                    como placeholder, focando na arquitetura de frontend e no design do
                    fluxo de avaliaÃ§Ãµes.
                  </p>
                  <p className={styles.paragraphMuted}>
                    Em um cenÃ¡rio real, este bloco seria integrado a uma API de
                    reviews, com notas, comentÃ¡rios, fotos de compradores e filtros por
                    classificaÃ§Ã£o.
                  </p>
                </div>
              </>
            ) : (
              <p className={styles.paragraphMuted}>
                Ainda nÃ£o hÃ¡ avaliaÃ§Ãµes para este produto. Seja o primeiro a avaliar e
                ajude outros clientes na decisÃ£o de compra.
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className={styles.root} aria-label="InformaÃ§Ãµes adicionais do produto">
      <div className={styles.tabList} role="tablist" aria-label="Detalhes do produto">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'description'}
          className={
            activeTab === 'description'
              ? `${styles.tab} ${styles.tabActive}`
              : styles.tab
          }
          onClick={() => setActiveTab('description')}
        >
          DescriÃ§Ã£o
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'details'}
          className={
            activeTab === 'details' ? `${styles.tab} ${styles.tabActive}` : styles.tab
          }
          onClick={() => setActiveTab('details')}
        >
          Detalhes tÃ©cnicos
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'reviews'}
          className={
            activeTab === 'reviews' ? `${styles.tab} ${styles.tabActive}` : styles.tab
          }
          onClick={() => setActiveTab('reviews')}
        >
          AvaliaÃ§Ãµes
        </button>
      </div>

      <div className={styles.tabPanel}>{renderContent()}</div>
    </section>
  );
}



