'use client';

import type { AppRoute } from '@/core/config/routes';

import Link from 'next/link';

import type { Product } from '../../../core/types/product';
import ProductCard from '@/shared/ui/ProductCard/ProductCard';

import styles from '../styles/HighlightGrid.module.css';

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
              <ProductCard
                key={product.id}
                product={product}
                showFavoriteControl={false}
                showCartAction={false}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
