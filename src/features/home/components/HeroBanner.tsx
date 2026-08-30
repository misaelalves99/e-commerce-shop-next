// src/features/home/components/HeroBanner.tsx
'use client';

import type { AppRoute } from '@/core/config/routes';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';

import styles from '../styles/HeroBanner.module.css';
import { Badge } from '../../../shared/ui/Badge/Badge';

export interface HeroBannerStat {
  label: string;
  value: string;
}

export interface HeroBannerProps {
  /** Título principal do hero (ex.: "Tudo o que você precisa em um só lugar") */
  title: string;
  /** Texto de destaque pequeno acima do título (ex.: "Mega Festival de Ofertas") */
  eyebrow?: string;
  /** Subtítulo abaixo do título principal */
  subtitle?: string;
  /** Label e link do CTA principal ("Ver ofertas", "/products") */
  primaryCta: {
    label: string;
    href: AppRoute;
  };
  /** CTA secundário opcional ("Ver cupons", etc.) */
  secondaryCta?: {
    label: string;
    href: AppRoute;
  };
  /** Cupom em destaque (ex.: "FRETEGRATIS") */
  highlightCouponCode?: string;
  /** Lista de stats (ex.: "Frete grátis", "+500 produtos", etc.) */
  stats?: HeroBannerStat[];
  /** Caminho da imagem principal do hero (banner, mockup, etc.) */
  heroImageSrc?: string;
  /** Texto alternativo da imagem do hero */
  heroImageAlt?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  eyebrow = 'Festival de Ofertas',
  subtitle = 'Ofertas em tempo real, frete inteligente e uma experiência pensada para o seu dia a dia.',
  primaryCta,
  secondaryCta,
  highlightCouponCode,
  stats = [
    { label: 'Produtos selecionados', value: '+50' },
    { label: 'Avaliações 5 estrelas', value: '+1.2K' },
    { label: 'Entrega para todo o Brasil', value: 'Frete rápido' },
  ],
  heroImageSrc,
  heroImageAlt = 'Destaques da loja',
}) => {
  const hasCoupon = Boolean(highlightCouponCode);

  const couponLabel = useMemo(
    () =>
      hasCoupon
        ? `Use o cupom ${highlightCouponCode} hoje`
        : 'Descontos exclusivos liberados hoje',
    [hasCoupon, highlightCouponCode],
  );

  return (
    <section className={styles.hero} aria-label="Ofertas em destaque">
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

            {hasCoupon && (
              <Badge variant="brand" size="sm" className={styles.couponBadge}>
                {couponLabel}
              </Badge>
            )}
          </div>

          <h1 className={styles.title}>{title}</h1>

          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

          <div className={styles.ctaRow}>
            <Link
              href={primaryCta.href}
              className={styles.primaryCta}
            >
              {primaryCta.label}
            </Link>

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={styles.secondaryCta}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>

          {stats.length > 0 && (
            <dl className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <dt className={styles.statLabel}>{stat.label}</dt>
                  <dd className={styles.statValue}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className={styles.heroMedia}>
          {heroImageSrc ? (
            <div className={styles.heroImageWrapper}>
              <Image
                src={heroImageSrc}
                alt={heroImageAlt}
                fill
                priority
                className={styles.heroImage}
                sizes="(min-width: 1024px) 520px, 100vw"
              />
            </div>
          ) : (
            <div className={styles.heroPlaceholder}>
              <span className={styles.heroPlaceholderBadge}>Seleção em destaque</span>
              <p className={styles.heroPlaceholderText}>
                Explore produtos selecionados, ofertas especiais e categorias pensadas para
                facilitar sua próxima compra.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
