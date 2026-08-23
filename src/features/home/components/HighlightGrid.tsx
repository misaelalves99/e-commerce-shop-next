// src/features/home/components/HighlightGrid.tsx
'use client';

import type { AppRoute } from '@/core/config/routes';

import Link from 'next/link';

import type { Product } from '../../../core/types/product';
import styles from '../styles/HighlightGrid.module.css';
import { RatingStars } from '../../../shared/ui/RatingStars/RatingStars';
import { Badge } from '../../../shared/ui/Badge/Badge';

export interface HighlightSection {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
  /** Link opcional "ver todos" da seção */
  href?: AppRoute;
}

export interface HighlightGridProps {
  sections: HighlightSection[];
}

export const HighlightGrid: React.FC<HighlightGridProps> = ({ sections }) => {
  if (!sections.length) return null;

  return (
    <section className={styles.grid} aria-label="Seções de destaques do catálogo">
      {sections.map((section) => (
        <div key={section.id} className={styles.section}>
          <header className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              {section.subtitle && (
                <p className={styles.sectionSubtitle}>{section.subtitle}</p>
              )}
            </div>

            {section.href && (
              <Link
                href={section.href}
                className={styles.sectionSeeAllButton}
              >
                Ver tudo
              </Link>
            )}
          </header>

          <div className={styles.productsGrid}>
            {section.products.map((product) => (
              <article key={product.id} className={styles.productCard}>
                <Link
                  href={`/product/${product.slug}`}
                  className={styles.productCardLink}
                >
                  <div className={styles.productImageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className={styles.productImage}
                    />

                    {product.tags?.length ? (
                      <div className={styles.badgesRow}>
                        {product.tags.slice(0, 2).map((badge) => (
                          <Badge
                            key={badge}
                            variant="default"
                            size="sm"
                            className={styles.productBadge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className={styles.productBody}>
                    <h3 className={styles.productTitle}>{product.title}</h3>

                    <div className={styles.productMeta}>
                      <div className={styles.productRatingRow}>
                        <RatingStars rating={product.rating} />
                        <span className={styles.productReviews}>
                          {product.ratingCount.toLocaleString('pt-BR')} avaliações
                        </span>
                      </div>

                      {product.brand && (
                        <span className={styles.productBrand}>{product.brand}</span>
                      )}
                    </div>

                    <div className={styles.productPriceRow}>
                      <span className={styles.productPrice}>
                        {product.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>

                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className={styles.productOriginalPrice}>
                          {product.originalPrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
