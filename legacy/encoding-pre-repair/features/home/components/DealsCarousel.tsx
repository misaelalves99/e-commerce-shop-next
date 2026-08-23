// src/features/home/components/DealsCarousel.tsx
'use client';

import type { AppRoute } from '@/core/config/routes';

import { useRef } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import type { Product } from '../../../core/types/product';
import styles from '../styles/DealsCarousel.module.css';
import { Badge } from '../../../shared/ui/Badge/Badge';
import { RatingStars } from '../../../shared/ui/RatingStars/RatingStars';
import { IconButton } from '../../../shared/ui/IconButton/IconButton';

export interface DealsCarouselProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  seeAllHref?: AppRoute;
}

export const DealsCarousel: React.FC<DealsCarouselProps> = ({
  title = 'Ofertas relÃ¢mpago',
  subtitle = 'Descontos por tempo limitado inspirados nos modelos de Shopee, Shein e Amazon.',
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
    <section className={styles.deals} aria-label="Ofertas relÃ¢mpago">
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
          {products.map((product) => {
            const hasDiscount = Boolean(
              product.originalPrice && product.originalPrice > product.price,
            );

            return (
              <article key={product.id} className={styles.card}>
                <Link href={`/product/${product.slug}`} className={styles.cardLink}>
                  <div className={styles.cardImageWrapper}>
                    {/* Podemos substituir por next/image se quiser, mas aqui deixo um wrapper flexÃ­vel */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />

                    {product.isFlashDeal && (
                      <Badge variant="brand" size="sm" className={styles.flashBadge}>
                        RelÃ¢mpago
                      </Badge>
                    )}

                    {hasDiscount && product.discountPercentage && (
                      <Badge variant="danger" size="sm" className={styles.discountBadge}>
                        -{product.discountPercentage}%
                      </Badge>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{product.title}</h3>

                    <div className={styles.ratingRow}>
                      <RatingStars rating={product.rating} />
                      <span className={styles.reviews}>
                        ({product.ratingCount.toLocaleString('pt-BR')})
                      </span>
                    </div>

                    <div className={styles.priceRow}>
                      <span className={styles.price}>
                        {product.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                      {hasDiscount && product.originalPrice && (
                        <span className={styles.originalPrice}>
                          {product.originalPrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      )}
                    </div>

                    <p className={styles.pixText}>ou em atÃ© 10x sem juros no cartÃ£o</p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};








