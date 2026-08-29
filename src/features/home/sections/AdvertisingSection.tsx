// src/features/home/sections/AdvertisingSection.tsx

import type { CardCategory } from '../../../core/types/category';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryStrip } from '../components/CategoryStrip';

interface AdvertisingSectionProps {
  categories: CardCategory[];
}

export function AdvertisingSection({ categories }: AdvertisingSectionProps) {
  return (
    <section
      className="app-section"
      data-section-id="home-advertising"
      aria-label="Destaques e categorias principais"
    >
      <div className="page-container">
        <HeroBanner
          title="Tudo o que você precisa em um só lugar"
          eyebrow="Festival de Ofertas"
          subtitle="Ofertas selecionadas, categorias para todos os momentos e uma experiência de compra simples para o seu dia a dia."
          primaryCta={{ label: 'Ver ofertas de hoje', href: '/products' }}
          secondaryCta={{ label: 'Explorar categorias', href: '/products' }}
          highlightCouponCode="PRIMEIRA10"
        />

        <div className="app-section-gap-lg" />

        <CategoryStrip
          title="Compre por categoria"
          categories={categories}
          showNavButtons
        />
      </div>
    </section>
  );
}

export default AdvertisingSection;
