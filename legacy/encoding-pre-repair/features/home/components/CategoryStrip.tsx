// src/features/home/components/CategoryStrip.tsx
'use client';

import type { CardCategory } from '../../../core/types/category';
import styles from '../styles/CategoryStrip.module.css';
import { Chip } from '../../../shared/ui/Chip/Chip';
import { IconButton } from '../../../shared/ui/IconButton/IconButton';
import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export interface CategoryStripProps {
  categories: CardCategory[];
  selectedCategoryId?: string;
  onCategorySelect?: (categoryId: string) => void;
  /** TÃ­tulo opcional acima da faixa (ex.: "Compre por categoria") */
  title?: string;
  /** Se true, mostra os botÃµes de navegaÃ§Ã£o lateral no desktop */
  showNavButtons?: boolean;
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
  title = 'Compre por categoria',
  showNavButtons = true,
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
    <section className={styles.strip} aria-label="Categorias do catÃ¡logo">
      <div className={styles.stripHeader}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            Navegue pelas principais categorias e encontre ofertas em poucos cliques.
          </p>
        </div>

        {showNavButtons && (
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
        )}
      </div>

      <div className={styles.scrollerWrapper}>
        <div ref={scrollerRef} className={styles.scroller}>
          {categories.map((category) => {
            const isActive = category.id === selectedCategoryId;

            return (
              <Chip
                key={category.id}
                variant={isActive ? 'brand' : 'default'}
                size="md"
                selected={isActive}
                className={`${styles.categoryButton} ${styles.categoryChip}`}
                onClick={() => onCategorySelect?.(category.id)}
              >
                  <span className={styles.categoryContent}>
                    {category.icon && (
                      <span className={styles.categoryIcon} aria-hidden="true">
                        {/* Ãcone Ã© opcional; vocÃª pode mapear o slug do Ã­cone em shared/icons */}
                        <span>{category.icon}</span>
                      </span>
                    )}
                    <span className={styles.categoryLabel}>{category.label}</span>
                  </span>
                </Chip>
            );
          })}
        </div>
      </div>
    </section>
  );
};



