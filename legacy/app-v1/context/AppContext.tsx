// "app/context/AppContext.tsx"

"use client";

import React, { createContext, useState, ReactNode } from "react";
import { Product as ProductType } from "../lib/products";
import type { StaticImageData } from "next/image";
import { CartItem } from "../types/cart";
import { AppContextType } from "../types/context";

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
            quantity: 1,
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
        .filter((item) => item.quantity > 0)
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
