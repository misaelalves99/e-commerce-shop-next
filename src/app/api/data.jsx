import Roupas1 from '../assets/products/roupas/roupas-01.png';
import Roupas2 from '../assets/products/roupas/roupas-02.png';
import Roupas3 from '../assets/products/roupas/roupas-03.png';
import Roupas4 from '../assets/products/roupas/roupas-04.png';
import Roupas5 from '../assets/products/roupas/roupas-05.png';
import Roupas6 from '../assets/products/roupas/roupas-06.png';

import Sapatos1 from '../assets/products/sapatos/sapatos-01.png';
import Sapatos2 from '../assets/products/sapatos/sapatos-02.png';
import Sapatos3 from '../assets/products/sapatos/sapatos-03.png';
import Sapatos4 from '../assets/products/sapatos/sapatos-04.png';
import Sapatos5 from '../assets/products/sapatos/sapatos-05.png';
import Sapatos6 from '../assets/products/sapatos/sapatos-06.png';

import Celulares1 from '../assets/products/celulares/celulares-01.png';
import Celulares2 from '../assets/products/celulares/celulares-02.png';
import Celulares3 from '../assets/products/celulares/celulares-03.png';
import Celulares4 from '../assets/products/celulares/celulares-04.png';
import Celulares5 from '../assets/products/celulares/celulares-05.png';
import Celulares6 from '../assets/products/celulares/celulares-06.png';

import Fones1 from '../assets/products/fones/fones-01.png';
import Fones2 from '../assets/products/fones/fones-02.png';
import Fones3 from '../assets/products/fones/fones-03.png';
import Fones4 from '../assets/products/fones/fones-04.png';
import Fones5 from '../assets/products/fones/fones-05.png';
import Fones6 from '../assets/products/fones/fones-06.png';

import Acessorios1 from '../assets/products/acessorios/acessorios-01.png';
import Acessorios2 from '../assets/products/acessorios/acessorios-02.png';
import Acessorios3 from '../assets/products/acessorios/acessorios-03.png';
import Acessorios4 from '../assets/products/acessorios/acessorios-04.png';
import Acessorios5 from '../assets/products/acessorios/acessorios-05.png';
import Acessorios6 from '../assets/products/acessorios/acessorios-06.png';

import Eletronicos1 from '../assets/products/eletronicos/eletronicos-01.png';
import Eletronicos2 from '../assets/products/eletronicos/eletronicos-02.png';
import Eletronicos3 from '../assets/products/eletronicos/eletronicos-03.png';
import Eletronicos4 from '../assets/products/eletronicos/eletronicos-04.png';
import Eletronicos5 from '../assets/products/eletronicos/eletronicos-05.png';
import Eletronicos6 from '../assets/products/eletronicos/eletronicos-06.png';

import Brinquedos1 from '../assets/products/brinquedos/brinquedos-01.png';
import Brinquedos2 from '../assets/products/brinquedos/brinquedos-02.png';
import Brinquedos3 from '../assets/products/brinquedos/brinquedos-03.png';
import Brinquedos4 from '../assets/products/brinquedos/brinquedos-04.png';
import Brinquedos5 from '../assets/products/brinquedos/brinquedos-05.png';
import Brinquedos6 from '../assets/products/brinquedos/brinquedos-06.png';

import Computadores1 from '../assets/products/computadores/computadores-01.png';
import Computadores2 from '../assets/products/computadores/computadores-02.png';
import Computadores3 from '../assets/products/computadores/computadores-03.png';
import Computadores4 from '../assets/products/computadores/computadores-04.png';
import Computadores5 from '../assets/products/computadores/computadores-05.png';
import Computadores6 from '../assets/products/computadores/computadores-06.png';

import Tablets1 from '../assets/products/tablets/tablets-01.png';
import Tablets2 from '../assets/products/tablets/tablets-02.png';
import Tablets3 from '../assets/products/tablets/tablets-03.png';
import Tablets4 from '../assets/products/tablets/tablets-04.png';
import Tablets5 from '../assets/products/tablets/tablets-05.png';
import Tablets6 from '../assets/products/tablets/tablets-06.png';

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

export const CardCategories = [ 
    {
        id: 1,
        title: "Todos",
        icon: <FaBorderAll />
    },

    {
        id: 2,
        title: "Roupas",
        icon: <GiClothes />
    },

    {
        id: 3,
        title: "Sapatos",
        icon: <GiRunningShoe />
    },

    {
        id: 4,
        title: "Celulares",
        icon: <RiCellphoneFill />
    },

    {
        id: 5,
        title: "Fones",
        icon: <IoHeadset />
    },

    {
        id: 6,
        title: "Acessórios",
        icon: <GiBilledCap  />
    },

    {
        id: 7,
        title: "Eletrônicos",
        icon: <BsFillSpeakerFill />
    },

    {
        id: 8,
        title: "Brinquedos",
        icon: <MdToys />
    },

    {
        id: 9,
        title: "Computadores",
        icon: <FaComputer />
    },

    {
        id: 10,
        title: "Tablets",
        icon: <FaTabletAlt />
    },
];
    
export const CardProducts = [ 
    {
        id: 1,
        title: "Blusa Tricô",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Roupas1, // Imagem principal para o card
        images: [Roupas1, Roupas1, Roupas1], // Array de imagens para os detalhes
        price: "R$ 74,90",
        category: "Roupas"
    },

    {
        id: 2,
        title: "Calsa Jeans",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Roupas2,
        images: [Roupas2, Roupas2, Roupas2],
        price: "R$ 99,90",
        category: "Roupas"
    },

    {
        id: 3,
        title: "Camiseta",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Roupas3,
        images: [Roupas3, Roupas3, Roupas3],
        price: "R$ 94,99",
        category: "Roupas"
    },

    {
        id: 4,
        title: "Vestido",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Roupas4,
        images: [Roupas4, Roupas4, Roupas4],
        price: "R$ 126,90",
        category: "Roupas"
    },

    {
        id: 5,
        title: "Jaqueta Moletom",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Roupas5,
        images: [Roupas5, Roupas5, Roupas5],
        price: "R$ 75,99",
        category: "Roupas"
    },
    
    {
        id: 6,
        title: "Bermuda Jeans",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Roupas6,
        images: [Roupas6, Roupas6, Roupas6],
        price: "R$ 59,90",
        category: "Roupas"
    },
    {
        id: 7,
        title: "Sapato Marrom",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Sapatos1,
        images: [Sapatos1, Sapatos1, Sapatos1],
        price: "R$ 125,99",
        category: "Sapatos"
    },
    {
        id: 8,
        title: "Sapato Bicudo",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Sapatos2,
        images: [Sapatos2, Sapatos2, Sapatos2],
        price: "R$ 120,90",
        category: "Sapatos"
    },
    {
        id: 9,
        title: "Tênis Marrom",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Sapatos3,
        images: [Sapatos3, Sapatos3, Sapatos3],
        price: "R$ 110,00",
        category: "Sapatos"
    },
    {
        id: 10,
        title: "Tênis Bota",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Sapatos4,
        images: [Sapatos4, Sapatos4, Sapatos4],
        price: "R$ 135,50",
        category: "Sapatos"
    },
    {
        id: 11,
        title: "Tamanco Vermelho",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Sapatos5,
        images: [Sapatos5, Sapatos5, Sapatos5],
        price: "R$ 390,50",
        category: "Sapatos"
    },
    {
        id: 12,
        title: "Tênis Infantil",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Sapatos6,
        images: [Sapatos6, Sapatos6, Sapatos6],
        price: "R$ 80,00",
        category: "Sapatos"
    },
    {
        id: 13,
        title: "Celular",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Celulares1,
        images: [Celulares1, Celulares1, Celulares1],
        price: "R$ 930,90",
        category: "Celulares"
    },
    {
        id: 14,
        title: "Celular",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Celulares2,
        images: [Celulares2, Celulares2, Celulares2],
        price: "R$ 999,90",
        category: "Celulares"
    },
    {
        id: 15,
        title: "Celular",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Celulares3,
        images: [Celulares3, Celulares3, Celulares3],
        price: "R$ 1720,00",
        category: "Celulares"
    },
    {
        id: 16,
        title: "Celular",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Celulares4,
        images: [Celulares4, Celulares4, Celulares4],
        price: "R$ 1250,00",
        category: "Celulares"
    },
    {
        id: 17,
        title: "Celular",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Celulares5,
        images: [Celulares5, Celulares5, Celulares5],
        price: "R$ 2299,90",
        category: "Celulares"
    },
    {
        id: 18,
        title: "Celular",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Celulares6,
        images: [Celulares6, Celulares6, Celulares6],
        price: "R$ 799,90",
        category: "Celulares"
    },
    {
        id: 19,
        title: "Fone de Ouvido",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Fones1,
        images: [Fones1, Fones1, Fones1],
        price: "R$ 30,00",
        category: "Fones"
    },
    {
        id: 20,
        title: "Fone de Ouvido",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Fones2,
        images: [Fones2, Fones2, Fones2],
        price: "R$ 125,00",
        category: "Fones"
    },
    {
        id: 21,
        title: "Fone de Ouvido",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Fones3,
        images: [Fones3, Fones3, Fones3],
        price: "R$ 120,90",
        category: "Fones"
    },
    {
        id: 22,
        title: "Fone de Ouvido",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Fones4,
        images: [Fones4, Fones4, Fones4],
        price: "R$ 37,90",
        category: "Fones"
    },
    {
        id: 23,
        title: "Fone de Ouvido",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Fones5,
        images: [Fones5, Fones5, Fones5],
        price: "R$ 215,90",
        category: "Fones"
    },
    {
        id: 24,
        title: "Fone de Ouvido",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Fones6,
        images: [Fones6, Fones6, Fones6],
        price: "R$ 205,99",
        category: "Fones"
    },
    {
        id: 25,
        title: "Bolsa",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Acessorios1,
        images: [Acessorios1, Acessorios1, Acessorios1],
        price: "R$ 144,00",
        category: "Acessórios"
    },
    {
        id: 26,
        title: "Bolsa de Couro",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Acessorios2,
        images: [Acessorios2, Acessorios2, Acessorios2],
        price: "R$ 166,00",
        category: "Acessórios"
    },
    {
        id: 27,
        title: "Relógio",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Acessorios3,
        images: [Acessorios3, Acessorios3, Acessorios3],
        price: "R$ 80,00",
        category: "Acessórios"
    },
    {
        id: 28,
        title: "Anel",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Acessorios4,
        images: [Acessorios4, Acessorios4, Acessorios4],
        price: "R$ 167,00",
        category: "Acessórios"
    },
    {
        id: 29,
        title: "Colar",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Acessorios5,
        images: [Acessorios5, Acessorios5, Acessorios5],
        price: "R$ 92,90",
        category: "Acessórios"
    },
    {
        id: 30,
        title: "Pulseira",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Acessorios6,
        images: [Acessorios6, Acessorios6, Acessorios6],
        price: "R$ 123,50",
        category: "Acessórios"
    },
    {
        id: 31,
        title: "Pendrive",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Eletronicos1,
        images: [Eletronicos1, Eletronicos1, Eletronicos1],
        price: "R$ 30,00",
        category: "Eletrônicos"
    },
    {
        id: 32,
        title: "Termômetro",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Eletronicos2,
        images: [Eletronicos2, Eletronicos2, Eletronicos2],
        price: "R$ 25,00",
        category: "Eletrônicos"
    },
    {
        id: 33,
        title: "Memória RAM",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Eletronicos3,
        images: [Eletronicos3, Eletronicos3, Eletronicos3],
        price: "R$128,00",
        category: "Eletrônicos"
    },
    {
        id: 34,
        title: "Cabo USB",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Eletronicos4,
        images: [Eletronicos4, Eletronicos4, Eletronicos4],
        price: "R$ 15,00",
        category: "Eletrônicos"
    },
    {
        id: 35,
        title: "Arduino",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Eletronicos5,
        images: [Eletronicos5, Eletronicos5, Eletronicos5],
        price: "R$ 129,97",
        category: "Eletrônicos"
    },
    {
        id: 36,
        title: "Cabo RS 232",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Eletronicos6,
        images: [Eletronicos6, Eletronicos6, Eletronicos6],
        price: "R$ 45,00",
        category: "Eletrônicos"
    },
    {
        id: 37,
        title: "Blocos de Montar",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Brinquedos1,
        images: [Brinquedos1, Brinquedos1, Brinquedos1],
        price: "R$ 19,90",
        category: "Brinquedos"
    },
    {
        id: 38,
        title: "Cubo Mágico",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Brinquedos2,
        images: [Brinquedos2, Brinquedos2, Brinquedos2],
        price: "R$ 12,50",
        category: "Brinquedos"
    },
    {
        id: 39,
        title: "Blocos Alfabeto",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Brinquedos3,
        images: [Brinquedos3, Brinquedos3, Brinquedos3],
        price: "R$ 42,50",
        category: "Brinquedos"
    },
    {
        id: 40,
        title: "Ursinho de Pelúcia",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Brinquedos4,
        images: [Brinquedos4, Brinquedos4, Brinquedos4],
        price: "R$ 39,90",
        category: "Brinquedos"
    },
    {
        id: 41,
        title: "Ioiô",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Brinquedos5,
        images: [Brinquedos5, Brinquedos5, Brinquedos5],
        price: "R$ 19,99",
        category: "Brinquedos"
    },
    {
        id: 42,
        title: "Avião de Brinquedo",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Brinquedos6,
        images: [Brinquedos6, Brinquedos6, Brinquedos6],
        price: "R$ 66,00",
        category: "Brinquedos"
    },
    {
        id: 43,
        title: "Monitor",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Computadores1,
        images: [Computadores1, Computadores1, Computadores1],
        price: "R$ 680,00",
        category: "Computadores"
    },
    {
        id: 44,
        title: "Notebook",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Computadores2,
        images: [Computadores2, Computadores2, Computadores2],
        price: "R$ 1799,00",
        category: "Computadores"
    },
    {
        id: 45,
        title: "Notebook",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Computadores3,
        images: [Computadores3, Computadores3, Computadores3],
        price: "R$ 1200,00",
        category: "Computadores"
    },
    {
        id: 46,
        title: "Monitor",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Computadores4,
        images: [Computadores4, Computadores4, Computadores4],
        price: "R$ 599,90",
        category: "Computadores"
    },
    {
        id: 47,
        title: "Notebook",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Computadores5,
        images: [Computadores5, Computadores5, Computadores5],
        price: "R$ 2199,00",
        category: "Computadores"
    },
    {
        id: 48,
        title: "Computador",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Computadores6,
        images: [Computadores6, Computadores6, Computadores6],
        price: "R$ 1750,00",
        category: "Computadores"
    },
    {
        id: 49,
        title: "Tablet",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Tablets1,
        images: [Tablets1, Tablets1, Tablets1],
        price: "R$ 699,00",
        category: "Tablets"
    },
    {
        id: 50,
        title: "Tablet",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Tablets2,
        images: [Tablets2, Tablets2, Tablets2],
        price: "R$ 549,90",
        category: "Tablets"
    },
    {
        id: 51,
        title: "Tablet",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Tablets3,
        images: [Tablets3, Tablets3, Tablets3],
        price: "R$ 536,00",
        category: "Tablets"
    },
    {
        id: 52,
        title: "Tablet",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Tablets4,
        images: [Tablets4, Tablets4, Tablets4],
        price: "R$ 599,00",
        category: "Tablets"
    },
    {
        id: 53,
        title: "Tablet",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Tablets5,
        images: [Tablets5, Tablets5, Tablets5],
        price: "R$ 999,90",
        category: "Tablets"
    },
    {
        id: 54,
        title: "Tablet",
        rating: '(1295)',
        priceOld: 'R$ 999,00',
        discount: 'Desconto 23%',
        mainImage: Tablets6,
        images: [Tablets6, Tablets6, Tablets6],
        price: "R$ 490,00",
        category: "Tablets"
    },
];
