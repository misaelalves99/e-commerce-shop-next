// "app/products/page.tsx"
"use client";
import React, { useState, useEffect } from "react";
import { CardCategories, CardProducts, Product as ProductType } from "../api/page";
import ProductCard from "../components/ProductCard/page";
import MainContainer from "../components/MainContainer/page";
import styles from "./Products.module.css"; // Importando o CSS Module

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const convertedProducts = CardProducts.map((product) => ({
      ...product,
      discount: product.discount.toString(), // Garantindo que permaneça como string
    }));

    if (selectedCategory === "Todos") {
      setFilteredProducts(convertedProducts);
    } else {
      setFilteredProducts(
        convertedProducts.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <MainContainer>
      {/* Filtro de Categorias */}
      <div className={styles.filterCategory}>
        <div className={styles.listCategory}>
          <div className={styles.titleCategory}>
            <h2>Categorias</h2>
          </div>
          <div className={styles.inputCategories}>
            {CardCategories.map((category) => (
              <label className={styles.categoryLabelContainer} key={category.id}>
                <div className={styles.iconCategory}>
                  <category.icon />
                </div>
                <input
                  type="radio"
                  name="category"
                  value={category.title}
                  checked={selectedCategory === category.title}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.inputCategory}
                />
                <p className={styles.nameCategory}>{category.title}</p>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Produtos Filtrados */}
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </MainContainer>
  );
};

export default Products;
