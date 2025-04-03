// "app/components/ProductList/page.tsx"
"use client";
import { useContext } from "react";
import AppContext from "../../context/AppContext"; // Importando o contexto
import styles from "./ProductCard.module.css";
// import { StaticImageData } from "next/image";
import { FaShoppingCart, FaStar } from "react-icons/fa";

import { Product as ProductType } from "../../api/page"; // Importa o tipo correto

interface ProductCardProps {
  product: ProductType; // Usa o tipo correto da API
}

const ProductList: React.FC<ProductCardProps> = ({ product }) => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { addToCart } = context;
  
  // Garantindo que o desconto seja sempre um número
  const discountValue = product.discount ? Number(product.discount.toString().replace(/\D/g, "")) : null;

  return (
    <div className={styles.card} style={{ cursor: "pointer" }}>
      <img
        src={typeof product.mainImage === "string" ? product.mainImage : product.mainImage.src}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.rating}>
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar key={index} color={index < product.rating ? "#f39c12" : "#ddd"} />
          ))}
        </div>

        <div className={styles.priceDetails}>
          {product.priceOld && <span className={styles.priceOld}>R${product.priceOld.toFixed(2)}</span>}
          {discountValue !== null && <span className={styles.discount}>-{discountValue}%</span>}
        </div>

        <div className={styles.priceContainer}>
          <p className={styles.price}>R${product.price.toFixed(2)}</p>
          <button
            className={styles.buyButton}
            onClick={(e) => {
              e.stopPropagation(); // Evita que o clique redirecione para a página do produto
              addToCart(product);
            }}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
