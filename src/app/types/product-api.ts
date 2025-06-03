import { StaticImageData } from "next/image";

export interface ProductAPI {
  id: number;
  title: string;
  category: string;
  rating: number;
  price: number;
  priceOld?: number;
  discount?: string;
  images: (string | StaticImageData)[];
}
