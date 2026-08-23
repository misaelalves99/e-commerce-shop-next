
// src/features/product-detail/components/ProductGallery.tsx

'use client';

import type { ReactElement } from 'react';

import { useState } from 'react';
import Image from 'next/image';

import styles from '../styles/ProductGallery.module.css';

export interface ProductGalleryImage {
  src: string;
  alt?: string;
}

export interface ProductGalleryProps {
  name: string;
  images: ProductGalleryImage[];
}

export default function ProductGallery({
  name,
  images,
}: ProductGalleryProps): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = images.length > 0 ? images : [{ src: '', alt: name }];
  const activeImage = safeImages[activeIndex] ?? safeImages[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        {activeImage?.src ? (
          <Image
            src={activeImage.src}
            alt={activeImage.alt || name}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 480px"
            className={styles.mainImage}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>Imagem indisponível</span>
          </div>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className={styles.thumbsRow}>
          {safeImages.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                className={
                  isActive
                    ? `${styles.thumbButton} ${styles.thumbButtonActive}`
                    : styles.thumbButton
                }
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver imagem ${index + 1} de ${safeImages.length}`}
                aria-pressed={isActive}
              >
                {image.src ? (
                  <Image
                    src={image.src}
                    alt={image.alt || `${name} thumb ${index + 1}`}
                    fill
                    sizes="80px"
                    className={styles.thumbImage}
                  />
                ) : (
                  <div className={styles.thumbPlaceholder} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
