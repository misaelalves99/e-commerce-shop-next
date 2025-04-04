// "app/favorites/page.jsx":
"use client";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import styles from "./Favorites.module.css";
import ProductCard from "../components/ProductCard/ProductCard";

const FavoritesPage = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <p className={styles.loadingMessage}>Carregando favoritos...</p>;
  }

  const { favorites } = context;

  return (
    <div className={styles.favoritesContainer}>
      <h2 className={styles.title}>Meus Favoritos</h2>

      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>Você ainda não adicionou itens aos favoritos.</p>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
