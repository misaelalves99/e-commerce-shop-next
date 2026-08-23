// src/features/home/sections/EvaluatedSection.tsx

import type { Product } from '../../../core/types/product';
import { HighlightGrid } from '../components/HighlightGrid';

interface EvaluatedSectionProps {
  /** Lista de produtos jÃ¡ filtrados como â€œbem avaliados / mais vendidosâ€ */
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
                'Produtos com notas altas e feedbacks positivos, para vocÃª comprar com confianÃ§a.',
              products: bestRated,
              href: '/products?sort=rating',
            },
            {
              id: 'most-reviewed',
              title: 'Mais buscados do momento',
              subtitle:
                'Itens que estÃ£o em alta agora no catÃ¡logo, inspirados nas experiÃªncias de grandes marketplaces.',
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

