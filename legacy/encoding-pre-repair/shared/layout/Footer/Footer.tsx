// src/shared/layout/Footer/Footer.tsx

import Link from 'next/link';
import styles from './Footer.module.css';

import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
} from '../../icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* Coluna 1 - Marca */}
        <div className={styles.columnWide}>
          <div className={styles.logoRow}>
            <div className={styles.logoMark}>MS</div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Misael Store</span>
              <span className={styles.logoTagline}>
                E-commerce moderno construído em Next.js 15, React 19 e TypeScript.
              </span>
            </div>
          </div>

          <p className={styles.description}>
            Projeto pessoal focado em performance, UX de alto nível e boas práticas
            de arquitetura frontend — inspirado em experiências de grandes players
            como Shopee, Shein e Amazon.
          </p>
        </div>

        {/* Coluna 2 - Navegação */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Navegação</h3>
          <ul className={styles.linkList}>
            <li>
              <Link href="/" className={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className={styles.link}>
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/favorites" className={styles.link}>
                Favoritos
              </Link>
            </li>
            <li>
              <Link href="/cart" className={styles.link}>
                Carrinho
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3 - Conta */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Minha conta</h3>
          <ul className={styles.linkList}>
            <li>
              <Link href="/login" className={styles.link}>
                Entrar / criar conta
              </Link>
            </li>
            <li>
              <Link href="/profile" className={styles.link}>
                Perfil
              </Link>
            </li>
            <li>
              <Link href="/orders" className={styles.link}>
                Meus pedidos
              </Link>
            </li>
            <li>
              <Link href="/address" className={styles.link}>
                Endereços
              </Link>
            </li>
            <li>
              <Link href="/security" className={styles.link}>
                Segurança
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 4 - Contato & redes */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Contato & redes</h3>
          <p className={styles.helperText}>
            Quer ver o código, falar sobre o projeto ou oportunidades?
          </p>

          <ul className={styles.socialList}>
            <li>
              <a
                href="mailto:misaelalves110@gmail.com"
                className={styles.socialLink}
                target="_blank"
                rel="noreferrer"
              >
                <FiMail className={styles.socialIcon} />
                <span>Email</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/misaelalves99"
                className={styles.socialLink}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub className={styles.socialIcon} />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/misael-alves-dev"
                className={styles.socialLink}
                target="_blank"
                rel="noreferrer"
              >
                <FiLinkedin className={styles.socialIcon} />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                className={styles.socialLink}
                target="_blank"
                rel="noreferrer"
              >
                <FiInstagram className={styles.socialIcon} />
                <span>Instagram</span>
              </a>
            </li>
          </ul>

          <div className={styles.tagsRow}>
            <span className={styles.techTag}>Next.js 15</span>
            <span className={styles.techTag}>React 19</span>
            <span className={styles.techTag}>TypeScript</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <span className={styles.bottomText}>
            © {year} Misael Store — Projeto pessoal para portfólio.
          </span>
          <span className={styles.bottomTextMuted}>
            Interface inspirada em grandes e-commerces, com foco em UX, performance e código limpo.
          </span>
        </div>
      </div>
    </footer>
  );
}
