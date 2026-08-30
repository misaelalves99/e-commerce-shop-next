'use client';

import type { AppRoute } from '@/core/config/routes';

import { useRef } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import type { Product } from '../../../core/types/product';
import ProductCard from '@/shared/ui/ProductCard/ProductCard';
import { IconButton } from '../../../shared/ui/IconButton/IconButton';

import styles from '../styles/DealsCarousel.module.css';

export interface DealsCarouselProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  seeAllHref?: AppRoute;
}

export const DealsCarousel: React.FC<DealsCarouselProps> = ({
  title = 'Ofertas relâmpago',
  subtitle = 'Descontos por tempo limitado em uma seleção especial de produtos.',
  products,
  seeAllHref = '/products',
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollerRef.current;
    if (!container) return;

    const amount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.deals} aria-label="Ofertas relâmpago">
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.navButtons}>
            <IconButton
              aria-label="Rolagem para a esquerda"
              variant="ghost"
              size="sm"
              onClick={() => handleScroll('left')}
              icon={<FiChevronLeft />}
            />

            <IconButton
              aria-label="Rolagem para a direita"
              variant="ghost"
              size="sm"
              onClick={() => handleScroll('right')}
              icon={<FiChevronRight />}
            />
          </div>

          <Link
            href={seeAllHref}
            className={styles.seeAllButton}
          >
            Ver todas as ofertas
          </Link>
        </div>
      </div>

      <div className={styles.scrollerWrapper}>
        <div ref={scrollerRef} className={styles.scroller}>
          {products.map((product) => (
            <div key={product.id} className={styles.slide}>
              <ProductCard
                product={product}
                showFavoriteControl={false}
                showCartAction={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
