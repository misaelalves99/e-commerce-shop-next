// src/shared/layout/MainShell/MainShell.tsx

'use client';

import type { ReactNode } from 'react';
import styles from './MainShell.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export interface MainShellProps {
  children: ReactNode;
}

/**
 * Shell principal da aplicação:
 * - Aplica o background global (tokens.css)
 * - Envolve todas as páginas com Header e Footer
 * - Mantém o conteúdo centralizado e responsivo
 */
export function MainShell({ children }: MainShellProps) {
  return (
    <div className={styles.shell}>
      <Header />

      <main className={styles.main}>
        <div className={styles.pageContainer}>{children}</div>
      </main>

      <Footer />
    </div>
  );
}

export default MainShell;
