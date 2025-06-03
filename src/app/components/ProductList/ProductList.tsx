// app/components/ProductCard/ProductList.tsx

"use client";

import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductList.module.css";
import { Product as ProductType } from "../../lib/products";

interface ProductListProps {
  products: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
