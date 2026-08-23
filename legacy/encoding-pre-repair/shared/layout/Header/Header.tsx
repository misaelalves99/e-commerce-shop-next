// src/shared/layout/Header/Header.tsx

'use client';

import type { AppRoute } from '@/core/config/routes';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

import { useAuth } from '../../../core/hooks/useAuth';
import { useCart } from '../../../core/hooks/useCart';
import { useFavorites } from '../../../core/hooks/useFavorites';

import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiTag,
  FiHome,
} from '../../icons';

import CartIndicator from './CartIndicator';
import UserMenu from './UserMenu';

const NAV_LINKS: Array<{
  label: string;
  href: AppRoute;
  icon: typeof FiHome;
}> = [
  { label: 'InÃ­cio', href: '/', icon: FiHome },
  { label: 'CatÃ¡logo', href: '/products', icon: FiTag },
  { label: 'Favoritos', href: '/favorites', icon: FiHeart },
];

export function Header() {
  const pathname = usePathname();

  const { user, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const { favoriteIds } = useFavorites();
  const totalFavorites = favoriteIds.length;

  const isActive = (href: AppRoute) =>
    href === '/'
      ? pathname === '/'
      : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      {/* Top bar (promo / mensagem rÃ¡pida) */}
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <span className={styles.topBarHighlight}>Frete rÃ¡pido</span>
          <span className={styles.topBarText}>
            Aproveite ofertas relÃ¢mpago e descontos exclusivos hoje.
          </span>
        </div>
      </div>

      {/* Barra principal */}
      <div className={styles.mainBar}>
        <div className={styles.mainBarInner}>
          {/* Logo + menu mobile */}
          <div className={styles.brandArea}>
            <button
              type="button"
              className={styles.menuButton}
              aria-label="Abrir menu"
            >
              <FiMenu />
            </button>

            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>MS</span>
              <span className={styles.logoText}>
                <span className={styles.logoName}>Misael Store</span>
                <span className={styles.logoTagline}>
                  E-commerce moderno em Next.js
                </span>
              </span>
            </Link>
          </div>

          {/* Busca central (desktop / tablet) */}
          <div className={styles.searchWrapper}>
            <form
              className={styles.searchForm}
              onSubmit={(event) => event.preventDefault()}
            >
              <FiSearch className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Buscar por produtos, categorias ou ofertas..."
                aria-label="Buscar produtos"
              />
              <button
                type="submit"
                className={styles.searchButton}
              >
                Buscar
              </button>
            </form>
          </div>

          {/* AÃ§Ãµes Ã  direita */}
          <div className={styles.actions}>
            <Link
              href="/favorites"
              className={styles.iconAction}
              aria-label="Favoritos"
            >
              <div className={styles.iconBadgeWrapper}>
                <FiHeart />
                {totalFavorites > 0 && (
                  <span className={styles.iconBadge}>
                    {totalFavorites > 9 ? '9+' : totalFavorites}
                  </span>
                )}
              </div>
              <span className={styles.iconLabel}>Favoritos</span>
            </Link>

            <Link
              href="/cart"
              className={styles.iconAction}
              aria-label="Carrinho"
            >
              <CartIndicator
                count={totalItems}
                icon={FiShoppingCart}
              />
              <span className={styles.iconLabel}>Carrinho</span>
            </Link>

            <div className={styles.userArea}>
              {isAuthenticated && user ? (
                <UserMenu user={user} />
              ) : (
                <Link
                  href="/login"
                  className={styles.loginButton}
                >
                  <FiUser className={styles.loginIcon} />
                  <span>Entrar</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NavegaÃ§Ã£o secundÃ¡ria (links principais) */}
      <nav className={styles.navBar} aria-label="NavegaÃ§Ã£o principal">
        <div className={styles.navInner}>
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={
                isActive(href)
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              <Icon className={styles.navIcon} />
              <span className={styles.navLabel}>{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Busca compacta para mobile */}
      <div className={styles.mobileSearch}>
        <form
          className={styles.mobileSearchForm}
          onSubmit={(event) => event.preventDefault()}
        >
          <FiSearch className={styles.mobileSearchIcon} />
          <input
            className={styles.mobileSearchInput}
            type="search"
            placeholder="Buscar produtos..."
            aria-label="Buscar produtos"
          />
        </form>
      </div>
    </header>
  );
}

export default Header;




