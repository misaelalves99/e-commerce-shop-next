// "app/product-detail/[id]/page.tsx"
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Importação correta do hook
import { CardProducts } from "../../api/products"; // Caminho pode variar
import Image from "next/image"; // Importando o componente Image do Next.js
import { StaticImageData } from "next/image";
import styles from "../ProductDetail.module.css"; // Importando o CSS Module

interface ProductAPI {
  id: number;
  title: string;
  category: string;
  rating: number;
  price: number;
  priceOld?: number;
  discount?: string;
  images: (string | StaticImageData)[]; // Permitindo imagens de tipos variados
}

interface Product {
  id: number;
  title: string;
  category: string;
  rating: number;
  price: string;
  priceOld?: string;
  discount?: string;
  images: string[]; // Usando apenas string para a lista de imagens
}

const ProductDetail = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (id) {
      const foundProduct = CardProducts.find((item: ProductAPI) => item.id === parseInt(id as string));
      if (foundProduct) {
        const productToSet: Product = {
          ...foundProduct,
          price: foundProduct.price.toString(),
          priceOld: foundProduct.priceOld ? foundProduct.priceOld.toString() : undefined,
          images: foundProduct.images
            .map(image => (typeof image === "string" ? image : image.src)) // Garantir que estamos lidando com strings
            .filter(image => typeof image === "string" && image !== ""), // Remover imagens inválidas
        };
        setProduct(productToSet);
        setSelectedImage(productToSet.images[0] || ""); // Setando a primeira imagem como selecionada
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
            {/* Usando o componente Image do Next.js */}
            <Image 
              src={selectedImage} 
              alt={product.title} 
              width={500} // Definindo a largura da imagem
              height={500} // Definindo a altura da imagem
            />
          </div>
          <div className={styles.imageThumbnails}>
            {product.images.map((image, index) => (
              <div
                key={index}
                className={selectedImage === image ? styles.active : ""}
                onClick={() => setSelectedImage(image)} // Mudando a imagem principal
              >
                <Image
                  src={image} // Passando a URL da imagem
                  alt={`Imagem ${index + 1}`}
                  width={50} // Largura das miniaturas
                  height={50} // Altura das miniaturas
                  className={styles.thumbnailImage} // Classe para a miniatura
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
                <p className={styles.oldPrice}>{product.priceOld}</p>
                <p className={styles.discount}>{product.discount}</p>
              </div>
            )}
            <h3 className={styles.priceOrigin}>R${product.price}</h3>
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
