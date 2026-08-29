
// src/shared/ui/ProductCard/ProductCard.tsx

'use client';

import type { ReactElement } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

import type { Product } from '@/core/types/product';
import { ROUTES } from '@/core/config/routes';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: (product: Product) => void;
  showFavoriteControl?: boolean;
  showCartAction?: boolean;
}

export default function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
  showFavoriteControl = true,
  showCartAction = true,
}: ProductCardProps): ReactElement {
  const {
    id,
    slug,
    title,
    image,

    price,
    originalPrice,
    discountPercentage,
    rating,
    ratingCount,
    maxInstallments,
    tags,
  } = product;

  const freeShipping = tags.includes('frete-gratis');

  const hasOriginalPrice =
    typeof originalPrice === 'number' && originalPrice > price;

  const computedDiscount =
    typeof discountPercentage === 'number'
      ? discountPercentage
      : hasOriginalPrice
      ? Math.round(((originalPrice! - price) / originalPrice!) * 100)
      : 0;

  const hasDiscount = computedDiscount > 0;

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  const detailHref = ROUTES.productDetail(slug ?? id);

  return (
    <article className={styles.card} data-product-id={id}>
      <div className={styles.cardInner}>
        {showFavoriteControl && (
          <button
                    type="button"
                    className={
                      isFavorite
                        ? `${styles.favoriteButton} ${styles.favoriteButtonActive}`
                        : styles.favoriteButton
                    }
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    onClick={handleFavoriteClick}
                  >
                    <FiHeart className={styles.favoriteIcon} />
                  </button>
        )}

        {hasDiscount && (
          <div className={styles.discountBadge} aria-label={`-${computedDiscount}%`}>
            -{computedDiscount}%
          </div>
        )}

        <div className={styles.imageWrapper}>
          <Link href={detailHref} className={styles.mediaLink}>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={styles.image}
            />
          </Link>
        </div>

        <div className={styles.content}>
          <Link href={detailHref} className={styles.titleLink}>
            <h3 className={styles.title}>{title}</h3>
          </Link>

          <div className={styles.ratingRow}>
            {typeof rating === 'number' && rating > 0 ? (
              <>
                <div className={styles.stars}>
                  {/* Simples visual de estrelas usando caracteres */}
                  <span className={styles.starValue}>{rating.toFixed(1)}</span>
                  <span className={styles.starSymbol}>★</span>
                </div>
                {typeof ratingCount === 'number' && ratingCount > 0 && (
                  <span className={styles.ratingCount}>
                    ({ratingCount.toLocaleString('pt-BR')})
                  </span>
                )}
              </>
            ) : (
              <span className={styles.noRating}>Novo</span>
            )}
          </div>

          <div className={styles.badgesRow}>
            {freeShipping && <span className={styles.badgeFree}>Frete grátis</span>}
            {tags.length > 0 &&
              tags.filter((tag) => tag !== 'frete-gratis').slice(0, 2).map((badge) => (
                <span key={badge} className={styles.badgeGeneric}>
                  {badge}
                </span>
              ))}
          </div>

          <div className={styles.priceBlock}>
            <div className={styles.priceMain}>
              <span className={styles.currentPrice}>
                {price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>

              {hasOriginalPrice && (
                <span className={styles.originalPrice}>
                  {originalPrice!.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              )}
            </div>

            {maxInstallments && maxInstallments > 1 && (
              <p className={styles.installments}>
                em até <strong>{maxInstallments}x</strong> sem juros
              </p>
            )}
          </div>
        </div>

        {showCartAction && (
          <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.primaryButton}
                      onClick={handleAddToCartClick}
                    >
                      <FiShoppingCart className={styles.primaryButtonIcon} />
                      <span>Adicionar ao carrinho</span>
                    </button>
                  </div>
        )}
      </div>
    </article>
  );
}
