// "app/products/page.tsx"

"use client";

import React, { useState, useEffect } from "react";
import { CardCategories, CardProducts, Product as ProductType } from "../lib/products";
import ProductCard from "../components/ProductCard/ProductCard";
import styles from "./Products.module.css"; // Importando o CSS Module

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const convertedProducts = CardProducts.map((product) => ({
      ...product,
      discount: product.discount?.toString(), // Evita erro se for undefined
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
    <div className={styles.productsPageContainer}>
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

      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
