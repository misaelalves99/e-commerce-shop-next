// "app/components/Home/Evaluated/page.tsx"
"use client";
import { CardProducts, Product } from '../../../lib/products';
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductCard from "../../ProductCard/ProductCard";
import styles from './Evaluated.module.css';

const Evaluated: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const visibleCards = 4;
  const cardWidth = 300;
  const scrollByAmount = visibleCards * cardWidth;

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
