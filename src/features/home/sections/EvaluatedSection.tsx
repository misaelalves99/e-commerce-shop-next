// src/features/home/sections/EvaluatedSection.tsx

import type { Product } from '../../../core/types/product';
import { HighlightGrid } from '../components/HighlightGrid';

interface EvaluatedSectionProps {
  /** Lista de produtos já filtrados como “bem avaliados / mais vendidos” */
  products: Product[];
}

export function EvaluatedSection({ products }: EvaluatedSectionProps) {
  const bestRated = products
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const mostReviewed = products
    .slice()
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, 6);

  return (
    <section
      className="app-section"
      data-section-id="home-evaluated"
      aria-label="Mais bem avaliados e mais buscados"
    >
      <div className="page-container">
        <HighlightGrid
          sections={[
            {
              id: 'best-rated',
              title: 'Mais bem avaliados',
              subtitle:
                'Produtos com notas altas e feedbacks positivos, para você comprar com confiança.',
              products: bestRated,
              href: '/products?sort=rating',
            },
            {
              id: 'most-reviewed',
              title: 'Mais buscados do momento',
              subtitle:
                'Itens em destaque no catálogo, reunidos para facilitar a descoberta de produtos populares.',
              products: mostReviewed,
              href: '/products?sort=trending',
            },
          ]}
        />
      </div>
    </section>
  );
}

export default EvaluatedSection;
