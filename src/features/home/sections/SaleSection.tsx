// src/features/home/sections/SaleSection.tsx

import type { Product } from '../../../core/types/product';
import { DealsCarousel } from '../components/DealsCarousel';

interface SaleSectionProps {
  /** Produtos em promoção (já filtrados na camada de domínio/mocks) */
  products: Product[];
}

export function SaleSection({ products }: SaleSectionProps) {
  const saleProducts = products.slice(0, 12);

  return (
    <section
      className="app-section app-section--alt"
      data-section-id="home-sale"
      aria-label="Ofertas especiais e promoções"
    >
      <div className="page-container">
        <DealsCarousel
          title="Ofertas do dia"
          subtitle="Seleções especiais com preços atrativos para você aproveitar as melhores oportunidades do dia."
          products={saleProducts}
          seeAllHref="/products?filter=offers"
        />
      </div>
    </section>
  );
}

export default SaleSection;
