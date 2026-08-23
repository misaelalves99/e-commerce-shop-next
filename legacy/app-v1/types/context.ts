import { Product as ProductType } from "../lib/products";
import { CartItem } from "./cart";

export interface AppContextType {
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
