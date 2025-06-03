import { StaticImageData } from 'next/image';

export interface Product {
  id: number;
  title: string;
  rating: number;
  priceOld: number;
  discount: string;
  mainImage: StaticImageData | string;
  images: (StaticImageData | string)[];
  price: number;
  category: string;
}
