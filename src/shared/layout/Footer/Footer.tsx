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
        <div className={styles.columnWide}>
          <div className={styles.logoRow}>
            <div className={styles.logoMark}>MS</div>

            <div className={styles.logoText}>
              <span className={styles.logoName}>Misael Store</span>
              <span className={styles.logoTagline}>
                Compras simples para todos os momentos.
              </span>
            </div>
          </div>

          <p className={styles.description}>
            Encontre produtos, ofertas e categorias em uma experiência de compra
            prática, organizada e pensada para facilitar suas escolhas.
          </p>

          <p className={styles.storePromise}>
            Descubra. Escolha. Compre do seu jeito.
          </p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>Navegação</h3>

          <ul className={styles.linkList}>
            <li>
              <Link href="/" className={styles.link}>
                Início
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

        <div className={styles.column}>
          <h3 className={styles.heading}>Atendimento & contato</h3>

          <p className={styles.helperText}>
            Canais para contato, novidades e informações sobre a loja.
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
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <span className={styles.bottomText}>
            © {year} Misael Store. Todos os direitos reservados.
          </span>

          <span className={styles.bottomTextMuted}>
            Uma experiência de compra simples, rápida e organizada.
          </span>
        </div>
      </div>
    </footer>
  );
}