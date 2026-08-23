// src/shared/layout/Header/UserMenu.tsx

'use client';

import { ROUTES, type AppRoute } from '@/core/config/routes';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import styles from './UserMenu.module.css';

import type { AuthUser } from '../../../core/types/auth';
import { useAuth } from '../../../core/hooks/useAuth';

import {
  FiUser,
  FiLogOut,
  FiSettings,
  FiPackage,
  FiMapPin,
} from '../../icons';

interface UserMenuProps {
  user: AuthUser;
}

function getInitials(name?: string | null) {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
  return (first + last).toUpperCase();
}

export default function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleToggle = () => setOpen((prev) => !prev);

  const handleNavigate = (href: AppRoute) => {
    setOpen(false);
    router.push(href);
  };

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push('/');
  };

  const initials = getInitials(user.name);

  return (
    <div className={styles.menuRoot}>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className={styles.avatarWrapper}>
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name ?? 'UsuÃ¡rio'}
              width={32}
              height={32}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {user.name || 'Minha conta'}
          </span>
          <span className={styles.userEmail}>
            {user.email}
          </span>
        </div>
      </button>

      {open && (
        <div
          className={styles.dropdown}
          role="menu"
        >
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownAvatar}>
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name ?? 'UsuÃ¡rio'}
                  width={40}
                  height={40}
                  className={styles.avatarImage}
                />
              ) : (
                <div className={styles.avatarFallbackLg}>{initials}</div>
              )}
            </div>
            <div className={styles.dropdownUserText}>
              <span className={styles.dropdownName}>
                {user.name || 'UsuÃ¡rio'}
              </span>
              <span className={styles.dropdownEmail}>{user.email}</span>
            </div>
          </div>

          <div className={styles.dropdownSection}>
            <button
              type="button"
              className={
                pathname.startsWith('/profile')
                  ? `${styles.item} ${styles.itemActive}`
                  : styles.item
              }
              onClick={() => handleNavigate('/profile')}
            >
              <FiUser className={styles.itemIcon} />
              <span>Perfil</span>
            </button>

            <button
              type="button"
              className={
                pathname.startsWith('/orders')
                  ? `${styles.item} ${styles.itemActive}`
                  : styles.item
              }
              onClick={() => handleNavigate('/orders')}
            >
              <FiPackage className={styles.itemIcon} />
              <span>Pedidos</span>
            </button>

            <button
              type="button"
              className={
                pathname.startsWith('/address')
                  ? `${styles.item} ${styles.itemActive}`
                  : styles.item
              }
              onClick={() => handleNavigate('/address')}
            >
              <FiMapPin className={styles.itemIcon} />
              <span>EndereÃ§os</span>
            </button>

            <button
              type="button"
              className={
                pathname.startsWith('/security')
                  ? `${styles.item} ${styles.itemActive}`
                  : styles.item
              }
              onClick={() => handleNavigate('/security')}
            >
              <FiSettings className={styles.itemIcon} />
              <span>SeguranÃ§a</span>
            </button>
          </div>

          <div className={styles.dropdownFooter}>
            <button
              type="button"
              className={`${styles.item} ${styles.logoutItem}`}
              onClick={handleLogout}
            >
              <FiLogOut className={styles.itemIcon} />
              <span>Sair</span>
            </button>

            <Link
              href={ROUTES.account.root}
              className={styles.manageAccountLink}
              onClick={() => setOpen(false)}
            >
              Gerenciar conta completa
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}




