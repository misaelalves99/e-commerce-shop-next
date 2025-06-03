// "app/components/Home/Sale/page.tsx"

"use client";

import { FaRegCreditCard, FaTags } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { AiFillSafetyCertificate } from "react-icons/ai";
import styles from "./Sale.module.css";
import Link from "next/link";
import Image from "next/image";

const Sale: React.FC = () => {
  return (
    <section className={styles.sectionSale}>
      <div className={styles.containerSale}>
        <div className={styles.offSale}>
          <Link href="/sale">
            <Image
              src="/assets/desc-off.png"
              alt="Imagem de oferta"
              width={300}
              height={300}
              className={styles.saleImage}
            />
          </Link>
        </div>

        <div className={styles.infoSale}>
          <div className={styles.titleDesc}>
            <h1>Aproveite a oferta até 50% de desconto</h1>
            <h2>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              reiciendis inventore iste ratione ex alias quis
            </h2>
          </div>

          <div className={styles.infoList}>
            <div className={styles.listI}>
              <div className={styles.iconList}><FaTruckFast /></div>
              <h3>Entrega rápida</h3>
            </div>

            <div className={styles.listI}>
              <div className={styles.iconList}><FaRegCreditCard /></div>
              <h3>Parcela em até 12x sem juros</h3>
            </div>

            <div className={styles.listI}>
              <div className={styles.iconList}><AiFillSafetyCertificate /></div>
              <h3>Compra segura</h3>
            </div>

            <div className={styles.listI}>
              <div className={styles.iconList}><FaTags /></div>
              <h3>Temos ótimas promoções</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sale;
