// "app/components/Home/Evaluated/page.tsx"
"use client";
import { CardProducts, Product } from '../../../api/page'; // Importação de tipos e dados
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductCard from "../../../components/ProductCard/page";
import styles from './Evaluated.module.css'; // Importando o CSS Module

const Evaluated: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const visibleCards = 4; // Quantidade de cards visíveis ao mesmo tempo
  const cardWidth = 300; // Largura de um card (ajuste para corresponder ao seu design)
  const scrollByAmount = visibleCards * cardWidth; // Calcula o deslocamento total com base nos cards visíveis

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
    <section className={styles.sectionEvaluated}>
      <div className={styles.containerProductsEvaluated}>
        <div className={styles.evaluatedTitle}>
          <h1>Produtos Avaliados</h1>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eaque iusto recusandae corporis harum natus itaque</h2>
        </div>
        <div className={styles.carouselContainer}>
          <button className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`} onClick={scrollLeft}>
            <FaArrowLeft />
          </button>
          <div className={styles.carousel} ref={carouselRef}>
            {CardProducts.map((product: Product) => (
              <div 
                key={product.id} 
                className={styles.carouselCard} 
                style={{ flex: `0 0 calc(${100 / visibleCards}% - 16px)` }}
              >
                <ProductCard 
                  product={{ 
                    ...product, 
                    mainImage: typeof product.mainImage === 'string' ? product.mainImage : product.mainImage.src
                  }} 
                />
              </div>
            ))}
          </div>
          <button className={`${styles.scrollBtn} ${styles.scrollBtnRight}`} onClick={scrollRight}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Evaluated;
