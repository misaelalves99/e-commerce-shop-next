// "app/components/ProductCard/page.tsx"
"use client";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import styles from "./ProductCard.module.css";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";

import { Product as ProductType } from "../../api/page"; 

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { addToCart, addToFavorites, removeFromFavorites, favorites } = context;

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const discountValue = product.discount ? Number(product.discount.toString().replace(/\D/g, "")) : null;

  return (
    <div className={styles.card} style={{ cursor: "pointer" }}>
      {/* Ícone de Favoritos no topo direito */}
      <button className={styles.favoriteButton} onClick={toggleFavorite}>
        <FaHeart color={isFavorite ? "red" : "#989898;;"} />
      </button>

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
              e.stopPropagation();
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

export default ProductCard;
