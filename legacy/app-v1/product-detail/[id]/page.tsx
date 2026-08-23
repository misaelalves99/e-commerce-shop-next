// app/product-detail/[id]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CardProducts } from "../../lib/products";
import Image, { StaticImageData } from "next/image";
import styles from "../ProductDetail.module.css";
import { ProductAPI } from "../../types/product-api";
import { Product } from "../../types/product";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData>("");

  useEffect(() => {
    if (id) {
      const foundProduct = CardProducts.find((item: ProductAPI) => item.id === parseInt(id as string));
      if (foundProduct) {
        const productToSet: Product = {
          ...foundProduct,
          price: foundProduct.price,
          priceOld: foundProduct.priceOld,
          mainImage:
            typeof foundProduct.images[0] === "string"
              ? foundProduct.images[0]
              : foundProduct.images[0].src,
          images: foundProduct.images.filter(
            (image): image is string | StaticImageData =>
              typeof image === "string" || typeof image === "object"
          ),
        };
        setProduct(productToSet);
        setSelectedImage(productToSet.images[0] || "");
      }
    }
  }, [id]);

  if (!product) return <p>Produto não encontrado!</p>;

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productHeader}>
        <h1>{product.title}</h1>
        <p>Categoria: {product.category}</p>
      </div>

      <div className={styles.productContent}>
        <div className={styles.productImages}>
          <div className={styles.mainImage}>
            <Image 
              src={selectedImage} 
              alt={product.title} 
              width={500}
              height={500}
            />
          </div>
          <div className={styles.imageThumbnails}>
            {product.images.map((image, index) => (
              <div
                key={index}
                className={selectedImage === image ? styles.active : ""}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`Imagem ${index + 1}`}
                  width={50}
                  height={50}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.rating}>
            <p>⭐⭐⭐⭐⭐ {product.rating} avaliações</p>
          </div>
          <div className={styles.price}>
            {product.priceOld && (
              <div className={styles.oldDiscount}>
                <p className={styles.oldPrice}>R${product.priceOld.toFixed(2)}</p>
                <p className={styles.discount}>{product.discount}</p>
              </div>
            )}
            <h3 className={styles.priceOrigin}>R${product.price.toFixed(2)}</h3>
          </div>
          <button className={styles.buyButton}>Comprar</button>
          <div className={styles.freteContainer}>
            <p>Calcule o frete e prazo de entrega:</p>
            <input type="text" placeholder="Digite o CEP" />
            <button>Consultar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
