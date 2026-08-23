// src/features/home/sections/EmphasisSection.tsx

import type { Product } from '../../../core/types/product';
import { HighlightGrid } from '../components/HighlightGrid';

interface EmphasisSectionProps {
  products: Product[];
}

export function EmphasisSection({ products }: EmphasisSectionProps) {
  const sectionProducts = products.slice(0, 8);

  return (
    <section
      className="app-section app-section--alt"
      data-section-id="home-emphasis"
      aria-label="Produtos em destaque"
    >
      <div className="page-container">
        <HighlightGrid
          sections={[
            {
              id: 'emphasis-for-you',
              title: 'Em destaque para você',
              subtitle:
                'Sugestões selecionadas com base nas vitrines mais clicadas e melhores avaliações.',
              products: sectionProducts,
              href: '/products',
            },
          ]}
        />
      </div>
    </section>
  );
}

export default EmphasisSection;
