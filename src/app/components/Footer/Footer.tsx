// app/components/Footer/Footer.tsx

import { FaShoppingBag, FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaPhoneVolume, FaAppStoreIos, FaGooglePlay } from 'react-icons/fa';
import { TbLocationFilled } from 'react-icons/tb';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerFooter}>
        <div className={styles.contactCompany}>
          <Link href="/" className={styles.nameCompany}>
            <FaShoppingBag className={styles.iconCC} />
            <h2>E-Commerce Shop</h2>
          </Link>

          <div className={styles.descCompany}>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aque reiciendis inveiste ratione ex alias quis.</p>
          </div>

          <div className={styles.socialMediaFooter}>
            <Link href="https://www.linkedin.com/in/misael-alves-dos-santos-8510b11b0/" passHref>
              <FaLinkedin className={styles.iconSm} />
            </Link>
            <Link href="https://github.com/misaelalves99" passHref>
              <FaGithub className={styles.iconSm} />
            </Link>
            <Link href="https://www.instagram.com/misael_alves_99/" passHref>
              <FaInstagram className={styles.iconSm} />
            </Link>
            <Link href="https://www.facebook.com/misael.alves.92317/" passHref>
              <FaFacebook className={styles.iconSm} />
            </Link>
          </div>

          <div className={styles.contactLocation}>
            <div className={styles.locationF}>
              <div className={styles.iconCl}>
                <TbLocationFilled />
              </div>
              <h3>Teófilo Otoni-MG</h3>
            </div>
            <div className={styles.contactF}>
              <div className={styles.iconCl}>
                <FaPhoneVolume />
              </div>
              <h3>(33) 99941-6186</h3>
            </div>
          </div>
        </div>

        <div className={styles.aboutUsService}>
          <div className={styles.aboutUs}>
            <h1>Sobre nós</h1>
            <ul>
              <li><Link href="#">Carreiras</Link></li>
              <li><Link href="#">Nossas histórias</Link></li>
              <li><Link href="#">Termos e Condições</Link></li>
              <li><Link href="#">Política de Privacidade</Link></li>
            </ul>
          </div>
          <div className={styles.service}>
            <h1>Atendimento</h1>
            <ul>
              <li><Link href="#">Central de ajuda</Link></li>
              <li><Link href="#">Como comprar</Link></li>
              <li><Link href="#">Acompanhe seu pedido</Link></li>
              <li><Link href="#">Devoluções</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.ourApp}>
          <h1>Nosso Aplicativo</h1>
          <div className={styles.apps}>
            <Link href="#" className={styles.app}>
              <FaAppStoreIos className={styles.iconApp} />
              <h3>App Store</h3>
            </Link>
            <Link href="#" className={styles.app}>
              <FaGooglePlay className={styles.iconApp} />
              <h3>Play Store</h3>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <div className={styles.containerCopyright}>
          <p>&copy; 2024 E-Commerce Shop. Todos os direitos reservados.</p>
          <p>Desenvolvido por <Link href="https://misael-alves-portfolio-next.vercel.app/" target='_blank' passHref> Misael Alves </Link></p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
