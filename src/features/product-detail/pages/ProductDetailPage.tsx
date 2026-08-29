// src/features/product-detail/pages/ProductDetailPage.tsx

'use client';

import ProductGallery from '../components/ProductGallery';
import ProductPriceBlock from '../components/ProductPriceBlock';
import ProductInfoTabs from '../components/ProductInfoTabs';
import AddToCartSection from '../components/AddToCartSection';

import ProductCard from '@/shared/ui/ProductCard/ProductCard';
import type { Product } from '@/core/types/product';

import styles from '../styles/ProductDetail.module.css';

export interface ProductDetailPageProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetailPage({
  product,
  relatedProducts = [],
}: ProductDetailPageProps) {
  const {
    title,
    brand,
    categoryId,
    image,
    images,
    price,
    originalPrice,
    discountPercentage,
    maxInstallments,
    rating,
    ratingCount,
    description,
    stock,
    tags,
  } = product;

  const galleryImages = images.length > 0 ? images : [image];
  const freeShipping = tags.includes('frete-gratis');

  return (
    <div className={styles.page}>
      <section className={styles.mainSection}>
        <div className={styles.galleryColumn}>
          <ProductGallery
            name={title}
            images={galleryImages.map((src, index) => ({
              src,
              alt: index === 0 ? title : `${title} - imagem ${index + 1}`,
            }))}
          />
        </div>

        <div className={styles.infoColumn}>
          <header className={styles.header}>
            <p className={styles.breadcrumb}>
              {brand && <span className={styles.brand}>{brand}</span>}
              {brand && categoryId && (
                <span className={styles.separator}>•</span>
              )}
              {categoryId && (
                <span className={styles.category}>{categoryId}</span>
              )}
            </p>

            <h1 className={styles.title}>{title}</h1>

            {description && (
              <p className={styles.subtitle}>{description}</p>
            )}
          </header>

          <ProductPriceBlock
            price={price}
            originalPrice={originalPrice}
            discountPercentage={discountPercentage}
            maxInstallments={maxInstallments}
            freeShipping={freeShipping}
          />

          <AddToCartSection product={product} stock={stock} />

          <ProductInfoTabs
            description={description}
            rating={rating}
            ratingCount={ratingCount}
          />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <h2 className={styles.relatedTitle}>Você também pode gostar</h2>
            <p className={styles.relatedSubtitle}>
              Selecionamos produtos com base na categoria e no comportamento de compras
              em e-commerces modernos.
            </p>
          </div>

          <div className={styles.relatedGrid}>
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
