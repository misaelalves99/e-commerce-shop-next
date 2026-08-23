// app/components/ProductCard/ProductCard.tsx

"use client";

import { useContext } from "react";
import Image from "next/image";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import AppContext from "../../context/AppContext";
import styles from "./ProductCard.module.css";
import type { Product as ProductType } from "../../types/product";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { addToCart, addToFavorites, removeFromFavorites, favorites } = context;
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const discountValue = product.discount
    ? Number(product.discount.toString().replace(/\D/g, ""))
    : null;

  return (
    <div className={styles.card}>
      <button className={styles.favoriteButton} onClick={toggleFavorite}>
        <FaHeart color={isFavorite ? "red" : "#989898"} />
      </button>

      <div className={styles.imageWrapper}>
        <Image
          src={
            typeof product.mainImage === "string"
              ? product.mainImage
              : product.mainImage.src
          }
          alt={product.title}
          width={300}
          height={300}
          className={styles.image}
        />
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.rating}>
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar key={index} color={index < product.rating ? "#f39c12" : "#ddd"} />
          ))}
        </div>

        <div className={styles.priceDetails}>
          {product.priceOld && (
            <span className={styles.priceOld}>
              R${product.priceOld.toFixed(2)}
            </span>
          )}
          {typeof discountValue === "number" && (
            <span className={styles.discount}>-{discountValue}%</span>
          )}
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
