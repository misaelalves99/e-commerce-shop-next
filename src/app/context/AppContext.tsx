// "app/context/AppContext.jsx"
"use client";
import React, { createContext, useState, ReactNode } from "react";
import { Product as ProductType } from "../api/page"; // Renomeando para evitar conflito
import type { StaticImageData } from "next/image";

// Definindo os tipos das informações armazenadas no contexto
interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string; // Garantindo que seja apenas uma string
  quantity: number; // Adicionando a quantidade
}

interface AppContextType {
  cart: CartItem[];
  favorites: ProductType[];
  addToCart: (product: ProductType) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  addToFavorites: (product: ProductType) => void;
  removeFromFavorites: (id: number) => void;
  setFavorites: (favorites: ProductType[]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<ProductType[]>([]);

  const addToCart = (product: ProductType) => {
    const getImage = (image: string | StaticImageData): string => {
      return typeof image === "string" ? image : image.src;
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            images: Array.isArray(product.images) ? getImage(product.images[0]) : getImage(product.images),
            quantity: 1, // Definindo a quantidade inicial como 1
          },
        ];
      }
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0) // Remover item se a quantidade for 0
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const addToFavorites = (product: ProductType) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== id));
  };

  const setFavoritesContext = (favorites: ProductType[]) => {
    setFavorites(favorites);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
        setFavorites: setFavoritesContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
