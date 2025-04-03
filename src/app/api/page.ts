// "app/api/page.ts"
import React from "react";
import { StaticImageData } from "next/image";

import { FaBorderAll } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";
import { RiCellphoneFill } from "react-icons/ri";
import { IoHeadset } from "react-icons/io5";
import { GiBilledCap } from "react-icons/gi";
import { BsFillSpeakerFill } from "react-icons/bs";
import { MdToys } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";
import { FaTabletAlt } from "react-icons/fa";

export interface CardCategories {
    id: number;
    title: string;
    icon: React.ElementType; // Tipo correto para componentes React
  }

export interface Product {
    id: number;
    title: string;
    rating: number;
    priceOld: number;
    discount: string;
    mainImage: StaticImageData | string; // Agora aceita ambos os tipos
    images: (StaticImageData | string)[]; // Agora aceita array de ambos os tipos
    price: number;
    category: string;
}

export const CardCategories: CardCategories[] = [
    {
        id: 1,
        title: "Todos",
        icon: FaBorderAll
    },

    {
        id: 2,
        title: "Roupas",
        icon: GiClothes
    },

    {
        id: 3,
        title: "Sapatos",
        icon: GiRunningShoe
    },

    {
        id: 4,
        title: "Celulares",
        icon: RiCellphoneFill
    },

    {
        id: 5,
        title: "Fones",
        icon: IoHeadset
    },

    {
        id: 6,
        title: "Acessórios",
        icon: GiBilledCap
    },

    {
        id: 7,
        title: "Eletrônicos",
        icon: BsFillSpeakerFill
    },

    {
        id: 8,
        title: "Brinquedos",
        icon: MdToys
    },

    {
        id: 9,
        title: "Computadores",
        icon: FaComputer
    },

    {
        id: 10,
        title: "Tablets",
        icon: FaTabletAlt
    },
];

export const CardProducts: Product[] = [
    {
        id: 1,
        title: "Blusa Tricô",
        rating: 4.7,
        priceOld: 129.90,
        discount: 'Desconto 20%',
        mainImage: "/assets/products/roupas/roupas-01.png",
        images: [
            "/assets/products/roupas/roupas-01.png",
            "/assets/products/roupas/roupas-01.png",
            "/assets/products/roupas/roupas-01.png"
        ],
        price: 103.92,
        category: "Roupas"
    },

    {
        id: 2,
        title: "Calça Jeans",
        rating: 4.6,
        priceOld: 199.90,
        discount: 'Desconto 25%',
        mainImage: "/assets/products/roupas/roupas-02.png",
        images: [
            "/assets/products/roupas/roupas-02.png",
            "/assets/products/roupas/roupas-02.png",
            "/assets/products/roupas/roupas-02.png"
        ],
        price: 149.92,
        category: "Roupas"
    },

    {
        id: 3,
        title: "Camiseta",
        rating: 4.5,
        priceOld: 89.90,
        discount: 'Desconto 15%',
        mainImage: "/assets/products/roupas/roupas-03.png",
        images: [
            "/assets/products/roupas/roupas-03.png",
            "/assets/products/roupas/roupas-03.png",
            "/assets/products/roupas/roupas-03.png"
        ],
        price: 76.42,
        category: "Roupas"
    },

    {
        id: 4,
        title: "Vestido",
        rating: 4.8,
        priceOld: 189.90,
        discount: 'Desconto 18%',
        mainImage: "/assets/products/roupas/roupas-04.png",
        images: [
            "/assets/products/roupas/roupas-04.png",
            "/assets/products/roupas/roupas-04.png",
            "/assets/products/roupas/roupas-04.png"
        ],
        price: 155.72,
        category: "Roupas"
    },

    {
        id: 5,
        title: "Jaqueta Moletom",
        rating: 4.9,
        priceOld: 249.90,
        discount: 'Desconto 30%',
        mainImage: "/assets/products/roupas/roupas-05.png",
        images: [
            "/assets/products/roupas/roupas-05.png",
            "/assets/products/roupas/roupas-05.png",
            "/assets/products/roupas/roupas-05.png"
        ],
        price: 174.93,
        category: "Roupas"
    },

    {
        id: 6,
        title: "Bermuda Jeans",
        rating: 4.4,
        priceOld: 119.90,
        discount: 'Desconto 20%',
        mainImage: "/assets/products/roupas/roupas-06.png",
        images: [
            "/assets/products/roupas/roupas-06.png",
            "/assets/products/roupas/roupas-06.png",
            "/assets/products/roupas/roupas-06.png"
        ],
        price: 95.92,
        category: "Roupas"
    },

    {
        id: 7,
        title: "Sapato Marrom",
        rating: 4.6,
        priceOld: 249.90,
        discount: 'Desconto 25%',
        mainImage: "/assets/products/sapatos/sapatos-01.png",
        images: [
            "/assets/products/sapatos/sapatos-01.png",
            "/assets/products/sapatos/sapatos-01.png",
            "/assets/products/sapatos/sapatos-01.png"
        ],
        price: 187.42,
        category: "Sapatos"
    },

    {
        id: 8,
        title: "Sapato Bicudo",
        rating: 4.3,
        priceOld: 199.90,
        discount: 'Desconto 22%',
        mainImage: "/assets/products/sapatos/sapatos-02.png",
        images: [
            "/assets/products/sapatos/sapatos-02.png",
            "/assets/products/sapatos/sapatos-02.png",
            "/assets/products/sapatos/sapatos-02.png"
        ],
        price: 155.92,
        category: "Sapatos"
    },

    {
        id: 9,
        title: "Tênis Marrom",
        rating: 4.7,
        priceOld: 299.90,
        discount: 'Desconto 30%',
        mainImage: "/assets/products/sapatos/sapatos-03.png",
        images: [
            "/assets/products/sapatos/sapatos-03.png",
            "/assets/products/sapatos/sapatos-03.png",
            "/assets/products/sapatos/sapatos-03.png"
        ],
        price: 209.93,
        category: "Sapatos"
    },

    {
        id: 10,
        title: "Tênis Bota",
        rating: 4.8,
        priceOld: 349.90,
        discount: 'Desconto 25%',
        mainImage: "/assets/products/sapatos/sapatos-04.png",
        images: [
            "/assets/products/sapatos/sapatos-04.png",
            "/assets/products/sapatos/sapatos-04.png",
            "/assets/products/sapatos/sapatos-04.png"
        ],
        price: 262.42,
        category: "Sapatos"
    },

    {
        id: 11,
        title: "Tamanco Vermelho",
        rating: 4.5,
        priceOld: 129.90,
        discount: 'Desconto 20%',
        mainImage: "/assets/products/sapatos/sapatos-05.png",
        images: [
            "/assets/products/sapatos/sapatos-05.png",
            "/assets/products/sapatos/sapatos-05.png",
            "/assets/products/sapatos/sapatos-05.png"
        ],
        price: 103.92,
        category: "Sapatos"
    },

    {
        id: 12,
        title: "Celular",
        rating: 4.9,
        priceOld: 1499.90,
        discount: 'Desconto 15%',
        mainImage: "/assets/products/celulares/celulares-01.png",
        images: [
            "/assets/products/celulares/celulares-01.png",
            "/assets/products/celulares/celulares-01.png",
            "/assets/products/celulares/celulares-01.png"
        ],
        price: 1274.92,
        category: "Celulares"
    },

    {
        id: 13,
        title: "Fone de Ouvido",
        rating: 4.4,
        priceOld: 199.90,
        discount: 'Desconto 25%',
        mainImage: "/assets/products/fones/fones-01.png",
        images: [
            "/assets/products/fones/fones-01.png",
            "/assets/products/fones/fones-01.png",
            "/assets/products/fones/fones-01.png"
        ],
        price: 149.92,
        category: "Fones"
    },

    {
        id: 14,
        title: "Fone de Ouvido Bluetooth",
        rating: 4.7,
        priceOld: 299.90,
        discount: 'Desconto 30%',
        mainImage: "/assets/products/fones/fones-02.png",
        images: [
            "/assets/products/fones/fones-02.png",
            "/assets/products/fones/fones-02.png",
            "/assets/products/fones/fones-02.png"
        ],
        price: 209.93,
        category: "Fones"
    },

    {
        id: 15,
        title: "Mouse Gamer",
        rating: 4.8,
        priceOld: 249.90,
        discount: 'Desconto 20%',
        mainImage: "/assets/products/acessorios/mouse-01.png",
        images: [
            "/assets/products/acessorios/mouse-01.png",
            "/assets/products/acessorios/mouse-01.png",
            "/assets/products/acessorios/mouse-01.png"
        ],
        price: 199.92,
        category: "Acessórios"
    },

    {
        id: 16,
        title: "Teclado Mecânico",
        rating: 4.9,
        priceOld: 399.90,
        discount: 'Desconto 25%',
        mainImage: "/assets/products/acessorios/teclado-01.png",
        images: [
            "/assets/products/acessorios/teclado-01.png",
            "/assets/products/acessorios/teclado-01.png",
            "/assets/products/acessorios/teclado-01.png"
        ],
        price: 299.92,
        category: "Acessórios"
    },

    {
        id: 17,
        title: "Monitor Full HD",
        rating: 4.7,
        priceOld: 999.90,
        discount: 'Desconto 15%',
        mainImage: "/assets/products/acessorios/monitor-01.png",
        images: [
            "/assets/products/acessorios/monitor-01.png",
            "/assets/products/acessorios/monitor-01.png",
            "/assets/products/acessorios/monitor-01.png"
        ],
        price: 849.92,
        category: "Acessórios"
    },

    {
        id: 18,
        title: "Cadeira Gamer",
        rating: 4.6,
        priceOld: 1299.90,
        discount: 'Desconto 20%',
        mainImage: "/assets/products/acessorios/cadeira-01.png",
        images: [
            "/assets/products/acessorios/cadeira-01.png",
            "/assets/products/acessorios/cadeira-01.png",
            "/assets/products/acessorios/cadeira-01.png"
        ],
        price: 1039.92,
        category: "Acessórios"
    },

    {
        id: 19,
        title: "Relógio Smartwatch",
        rating: 4.5,
        priceOld: 499.90,
        discount: 'Desconto 30%',
        mainImage: "/assets/products/acessorios/smartwatch-01.png",
        images: [
            "/assets/products/acessorios/smartwatch-01.png",
            "/assets/products/acessorios/smartwatch-01.png",
            "/assets/products/acessorios/smartwatch-01.png"
        ],
        price: 349.93,
        category: "Acessórios"
    },

    {
        id: 20,
        title: "Mochila Executiva",
        rating: 4.8,
        priceOld: 199.90,
        discount: 'Desconto 25%',
        mainImage: "/assets/products/acessorios/mochila-01.png",
        images: [
            "/assets/products/acessorios/mochila-01.png",
            "/assets/products/acessorios/mochila-01.png",
            "/assets/products/acessorios/mochila-01.png"
        ],
        price: 149.92,
        category: "Acessórios"
    },

    {
        id: 21,
        title: "Fone de Ouvido",
        rating: 4.5,
        priceOld: 299.00,
        discount: 'Desconto 60%',
        mainImage: "/assets/products/fones/fones-03.png",
        images: [
            "/assets/products/fones/fones-03.png",
            "/assets/products/fones/fones-03.png",
            "/assets/products/fones/fones-03.png"
        ],
        price: 119.90,
        category: "Fones"
    },
    
    {
        id: 22,
        title: "Fone de Ouvido",
        rating: 4.2,
        priceOld: 199.00,
        discount: 'Desconto 50%',
        mainImage: "/assets/products/fones/fones-04.png",
        images: [
            "/assets/products/fones/fones-04.png",
            "/assets/products/fones/fones-04.png",
            "/assets/products/fones/fones-04.png"
        ],
        price: 99.90,
        category: "Fones"
    },
    
    {
        id: 23,
        title: "Fone de Ouvido",
        rating: 4.3,
        priceOld: 399.00,
        discount: 'Desconto 45%',
        mainImage: "/assets/products/fones/fones-05.png",
        images: [
            "/assets/products/fones/fones-05.png",
            "/assets/products/fones/fones-05.png",
            "/assets/products/fones/fones-05.png"
        ],
        price: 219.90,
        category: "Fones"
    },
    
    {
        id: 24,
        title: "Fone de Ouvido",
        rating: 4.4,
        priceOld: 399.00,
        discount: 'Desconto 48%',
        mainImage: "/assets/products/fones/fones-06.png",
        images: [
            "/assets/products/fones/fones-06.png",
            "/assets/products/fones/fones-06.png",
            "/assets/products/fones/fones-06.png"
        ],
        price: 209.99,
        category: "Fones"
    },
    
    {
        id: 25,
        title: "Bolsa",
        rating: 4.0,
        priceOld: 199.00,
        discount: 'Desconto 20%',
        mainImage: "/assets/products/acessorios/acessorios-01.png",
        images: [
            "/assets/products/acessorios/acessorios-01.png",
            "/assets/products/acessorios/acessorios-01.png",
            "/assets/products/acessorios/acessorios-01.png"
        ],
        price: 159.00,
        category: "Acessórios"
    },
    
    {
        id: 26,
        title: "Bolsa de Couro",
        rating: 4.7,
        priceOld: 350.00,
        discount: 'Desconto 25%',
        mainImage: "/assets/products/acessorios/acessorios-02.png",
        images: [
            "/assets/products/acessorios/acessorios-02.png",
            "/assets/products/acessorios/acessorios-02.png",
            "/assets/products/acessorios/acessorios-02.png"
        ],
        price: 262.50,
        category: "Acessórios"
    },
    
    {
        id: 27,
        title: "Relógio",
        rating: 4.2,
        priceOld: 180.00,
        discount: 'Desconto 30%',
        mainImage: "/assets/products/acessorios/acessorios-03.png",
        images: [
            "/assets/products/acessorios/acessorios-03.png",
            "/assets/products/acessorios/acessorios-03.png",
            "/assets/products/acessorios/acessorios-03.png"
        ],
        price: 126.00,
        category: "Acessórios"
    },
    
    {
        id: 28,
        title: "Anel",
        rating: 4.6,
        priceOld: 80.00,
        discount: 'Desconto 50%',
        mainImage: "/assets/products/acessorios/acessorios-04.png",
        images: [
            "/assets/products/acessorios/acessorios-04.png",
            "/assets/products/acessorios/acessorios-04.png",
            "/assets/products/acessorios/acessorios-04.png"
        ],
        price: 40.00,
        category: "Acessórios"
    },
    
    {
        id: 29,
        title: "Colar",
        rating: 4.3,
        priceOld: 120.00,
        discount: 'Desconto 35%',
        mainImage: "/assets/products/acessorios/acessorios-05.png",
        images: [
            "/assets/products/acessorios/acessorios-05.png",
            "/assets/products/acessorios/acessorios-05.png",
            "/assets/products/acessorios/acessorios-05.png"
        ],
        price: 78.00,
        category: "Acessórios"
    },
    
    {
        id: 30,
        title: "Pulseira",
        rating: 4.1,
        priceOld: 70.00,
        discount: 'Desconto 10%',
        mainImage: "/assets/products/acessorios/acessorios-06.png",
        images: [
            "/assets/products/acessorios/acessorios-06.png",
            "/assets/products/acessorios/acessorios-06.png",
            "/assets/products/acessorios/acessorios-06.png"
        ],
        price: 63.00,
        category: "Acessórios"
    },
    
    {
        id: 31,
        title: "Pendrive",
        rating: 4.4,
        priceOld: 70.00,
        discount: 'Desconto 20%',
        mainImage: "/assets/products/eletronicos/eletronicos-01.png",
        images: [
            "/assets/products/eletronicos/eletronicos-01.png",
            "/assets/products/eletronicos/eletronicos-01.png",
            "/assets/products/eletronicos/eletronicos-01.png"
        ],
        price: 56.00,
        category: "Eletrônicos"
    },
    
    {
        id: 32,
        title: "Termômetro",
        rating: 4.3,
        priceOld: 100.00,
        discount: 'Desconto 25%',
        mainImage: "/assets/products/eletronicos/eletronicos-02.png",
        images: [
            "/assets/products/eletronicos/eletronicos-02.png",
            "/assets/products/eletronicos/eletronicos-02.png",
            "/assets/products/eletronicos/eletronicos-02.png"
        ],
        price: 75.00,
        category: "Eletrônicos"
    },
    
    {
        id: 33,
        title: "Memória RAM",
        rating: 4.6,
        priceOld: 250.00,
        discount: 'Desconto 20%',
        mainImage: "/assets/products/eletronicos/eletronicos-03.png",
        images: [
            "/assets/products/eletronicos/eletronicos-03.png",
            "/assets/products/eletronicos/eletronicos-03.png",
            "/assets/products/eletronicos/eletronicos-03.png"
        ],
        price: 200.00,
        category: "Eletrônicos"
    },
    
    {
        id: 34,
        title: "Cabo USB",
        rating: 4.0,
        priceOld: 30.00,
        discount: 'Desconto 50%',
        mainImage: "/assets/products/eletronicos/eletronicos-04.png",
        images: [
            "/assets/products/eletronicos/eletronicos-04.png",
            "/assets/products/eletronicos/eletronicos-04.png",
            "/assets/products/eletronicos/eletronicos-04.png"
        ],
        price: 15.00,
        category: "Eletrônicos"
    },
    
    {
        id: 35,
        title: "Arduino",
        rating: 4.8,
        priceOld: 150.00,
        discount: 'Desconto 15%',
        mainImage: "/assets/products/eletronicos/eletronicos-05.png",
        images: [
            "/assets/products/eletronicos/eletronicos-05.png",
            "/assets/products/eletronicos/eletronicos-05.png",
            "/assets/products/eletronicos/eletronicos-05.png"
        ],
        price: 127.50,
        category: "Eletrônicos"
    },
    
    {
        id: 36,
        title: "Cabo RS 232",
        rating: 4.2,
        priceOld: 55.00,
        discount: 'Desconto 18%',
        mainImage: "/assets/products/eletronicos/eletronicos-06.png",
        images: [
            "/assets/products/eletronicos/eletronicos-06.png",
            "/assets/products/eletronicos/eletronicos-06.png",
            "/assets/products/eletronicos/eletronicos-06.png"
        ],
        price: 45.00,
        category: "Eletrônicos"
    },    

    {
        id: 37,
        title: "Blocos de Montar",
        rating: 4.8,
        priceOld: 89.90,
        discount: "Desconto 10%",
        mainImage: "/assets/products/brinquedos/brinquedos-01.png",
        images: [
          "/assets/products/brinquedos/brinquedos-01.png",
          "/assets/products/brinquedos/brinquedos-01.png",
          "/assets/products/brinquedos/brinquedos-01.png"
        ],
        price: 69.90,
        category: "Brinquedos"
    },

    {
        id: 38,
        title: "Cubo Mágico",
        rating: 4.6,
        priceOld: 45.00,
        discount: "Desconto 15%",
        mainImage: "/assets/products/brinquedos/brinquedos-02.png",
        images: [
          "/assets/products/brinquedos/brinquedos-02.png",
          "/assets/products/brinquedos/brinquedos-02.png",
          "/assets/products/brinquedos/brinquedos-02.png"
        ],
        price: 38.00,
        category: "Brinquedos"
    },

    {
        id: 39,
        title: "Blocos Alfabeto",
        rating: 4.7,
        priceOld: 59.90,
        discount: "Desconto 20%",
        mainImage: "/assets/products/brinquedos/brinquedos-03.png",
        images: [
          "/assets/products/brinquedos/brinquedos-03.png",
          "/assets/products/brinquedos/brinquedos-03.png",
          "/assets/products/brinquedos/brinquedos-03.png"
        ],
        price: 47.90,
        category: "Brinquedos"
    },

    {
        id: 40,
        title: "Ursinho de Pelúcia",
        rating: 4.9,
        priceOld: 99.90,
        discount: "Desconto 10%",
        mainImage: "/assets/products/brinquedos/brinquedos-04.png",
        images: [
          "/assets/products/brinquedos/brinquedos-04.png",
          "/assets/products/brinquedos/brinquedos-04.png",
          "/assets/products/brinquedos/brinquedos-04.png"
        ],
        price: 89.90,
        category: "Brinquedos"
    },

    {
        id: 41,
        title: "Ioiô",
        rating: 4.3,
        priceOld: 25.00,
        discount: "Desconto 12%",
        mainImage: "/assets/products/brinquedos/brinquedos-05.png",
        images: [
          "/assets/products/brinquedos/brinquedos-05.png",
          "/assets/products/brinquedos/brinquedos-05.png",
          "/assets/products/brinquedos/brinquedos-05.png"
        ],
        price: 21.90,
        category: "Brinquedos"
    },

    {
        id: 42,
        title: "Avião de Brinquedo",
        rating: 4.7,
        priceOld: 85.00,
        discount: "Desconto 15%",
        mainImage: "/assets/products/brinquedos/brinquedos-06.png",
        images: [
          "/assets/products/brinquedos/brinquedos-06.png",
          "/assets/products/brinquedos/brinquedos-06.png",
          "/assets/products/brinquedos/brinquedos-06.png"
        ],
        price: 72.00,
        category: "Brinquedos"
    },

    {
        id: 43,
        title: "Monitor",
        rating: 4.5,
        priceOld: 899.00,
        discount: "Desconto 20%",
        mainImage: "/assets/products/computadores/computadores-01.png",
        images: [
          "/assets/products/computadores/computadores-01.png",
          "/assets/products/computadores/computadores-01.png",
          "/assets/products/computadores/computadores-01.png"
        ],
        price: 719.00,
        category: "Computadores"
    },

    {
        id: 44,
        title: "Notebook",
        rating: 4.6,
        priceOld: 2499.00,
        discount: "Desconto 15%",
        mainImage: "/assets/products/computadores/computadores-02.png",
        images: [
          "/assets/products/computadores/computadores-02.png",
          "/assets/products/computadores/computadores-02.png",
          "/assets/products/computadores/computadores-02.png"
        ],
        price: 2129.00,
        category: "Computadores"
    },

    {
        id: 45,
        title: "Notebook",
        rating: 4.5,
        priceOld: 1599.00,
        discount: "Desconto 18%",
        mainImage: "/assets/products/computadores/computadores-03.png",
        images: [
          "/assets/products/computadores/computadores-03.png",
          "/assets/products/computadores/computadores-03.png",
          "/assets/products/computadores/computadores-03.png"
        ],
        price: 1319.00,
        category: "Computadores"
    },

    {
        id: 46,
        title: "Monitor",
        rating: 4.3,
        priceOld: 699.90,
        discount: "Desconto 12%",
        mainImage: "/assets/products/computadores/computadores-04.png",
        images: [
          "/assets/products/computadores/computadores-04.png",
          "/assets/products/computadores/computadores-04.png",
          "/assets/products/computadores/computadores-04.png"
        ],
        price: 615.00,
        category: "Computadores"
    },

    {
        id: 47,
        title: "Notebook",
        rating: 4.6,
        priceOld: 1999.00,
        discount: "Desconto 14%",
        mainImage: "/assets/products/computadores/computadores-05.png",
        images: [
          "/assets/products/computadores/computadores-05.png",
          "/assets/products/computadores/computadores-05.png",
          "/assets/products/computadores/computadores-05.png"
        ],
        price: 1719.00,
        category: "Computadores"
    },

    {
        id: 48,
        title: "Computador",
        rating: 4.4,
        priceOld: 1999.00,
        discount: "Desconto 10%",
        mainImage: "/assets/products/computadores/computadores-06.png",
        images: [
          "/assets/products/computadores/computadores-06.png",
          "/assets/products/computadores/computadores-06.png",
          "/assets/products/computadores/computadores-06.png"
        ],
        price: 1799.00,
        category: "Computadores"
    },

    {
        id: 49,
        title: "Tablet",
        rating: 4.7,
        priceOld: 799.00,
        discount: "Desconto 13%",
        mainImage: "/assets/products/tablets/tablets-01.png",
        images: [
          "/assets/products/tablets/tablets-01.png",
          "/assets/products/tablets/tablets-01.png",
          "/assets/products/tablets/tablets-01.png"
        ],
        price: 699.00,
        category: "Tablets"
    },

    {
        id: 50,
        title: "Tablet",
        rating: 4.6,
        priceOld: 649.00,
        discount: "Desconto 15%",
        mainImage: "/assets/products/tablets/tablets-02.png",
        images: [
          "/assets/products/tablets/tablets-02.png",
          "/assets/products/tablets/tablets-02.png",
          "/assets/products/tablets/tablets-02.png"
        ],
        price: 549.90,
        category: "Tablets"
    },

    {
        id: 51,
        title: "Tablet",
        rating: 4.8,
        priceOld: 599.00,
        discount: "Desconto 10%",
        mainImage: "/assets/products/tablets/tablets-03.png",
        images: [
          "/assets/products/tablets/tablets-03.png",
          "/assets/products/tablets/tablets-03.png",
          "/assets/products/tablets/tablets-03.png"
        ],
        price: 536.00,
        category: "Tablets"
    },

    {
        id: 52,
        title: "Tablet",
        rating: 4.4,
        priceOld: 699.00,
        discount: "Desconto 15%",
        mainImage: "/assets/products/tablets/tablets-04.png",
        images: [
          "/assets/products/tablets/tablets-04.png",
          "/assets/products/tablets/tablets-04.png",
          "/assets/products/tablets/tablets-04.png"
        ],
        price: 599.00,
        category: "Tablets"
    },

    {
        id: 53,
        title: "Tablet",
        rating: 4.9,
        priceOld: 1099.00,
        discount: "Desconto 5%",
        mainImage: "/assets/products/tablets/tablets-05.png",
        images: [
          "/assets/products/tablets/tablets-05.png",
          "/assets/products/tablets/tablets-05.png",
          "/assets/products/tablets/tablets-05.png"
        ],
        price: 999.90,
        category: "Tablets"
    },

    {
        id: 54,
        title: "Tablet",
        rating: 4.6,
        priceOld: 599.00,
        discount: "Desconto 8%",
        mainImage: "/assets/products/tablets/tablets-06.png",
        images: [
          "/assets/products/tablets/tablets-06.png",
          "/assets/products/tablets/tablets-06.png",
          "/assets/products/tablets/tablets-06.png"
        ],
        price: 490.00,
        category: "Tablets"
    }      
];
