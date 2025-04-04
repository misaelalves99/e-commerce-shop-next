// "app/components/Home/Emphasis/page.tsx"
"use client";
import styles from './Emphasis.module.css'; // Importando o CSS Module
import { CardProducts, Product } from '../../../api/products'; // Importação de tipos e dados
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductCard from "../../../components/ProductCard/page";

const Emphasis: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const scrollByAmount = 300; // Quantidade de deslocamento por clique

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const maxScrollLeft = 
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

      if (carouselRef.current.scrollLeft + scrollByAmount <= maxScrollLeft) {
        carouselRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
      } else {
        carouselRef.current.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      }
    }
  };

  return (
    <section className={styles.sectionEmphasis}>
      <div className={styles.containerProductsEmphasis}>
        <div className={styles.emphasisTitle}>
          <h1>Produtos Destaque</h1>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eaque iusto recusandae corporis harum natus itaque</h2>
        </div>
        <div className={styles.carouselContainer}>
          <button className={`${styles.scrollBtn} ${styles.left}`} onClick={scrollLeft}>
            <FaArrowLeft />
          </button>
          <div className={styles.carousel} ref={carouselRef}>
            {CardProducts.map((product: Product, index) => (
              <div key={`${product.id}-${index}`} className={styles.carouselCard}>
                <ProductCard 
                  product={{ 
                    ...product, 
                    mainImage: typeof product.mainImage === 'string' ? product.mainImage : product.mainImage.src
                  }} 
                />
              </div>
            ))}
          </div>
          <button className={`${styles.scrollBtn} ${styles.right}`} onClick={scrollRight}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Emphasis;
