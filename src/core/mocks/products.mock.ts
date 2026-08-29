// src/core/mocks/products.mock.ts

/**
 * Catálogo estático de produtos (mock) para o e-commerce.
 * As imagens apontam para a pasta `public/assets/products/...`
 *
 * Estes dados simulam o "CardProducts" bruto (nível API),
 * e serão mapeados depois para o modelo refinado de UI.
 */

export const categoriesMock = [
  {
    id: 'roupas',
    slug: 'roupas',
    label: 'Roupas',
    description: 'Moda masculina e feminina para o dia a dia',
  },
  {
    id: 'sapatos',
    slug: 'sapatos',
    label: 'Sapatos',
    description: 'Calçados casuais, esportivos e sociais',
  },
  {
    id: 'celulares',
    slug: 'celulares',
    label: 'Celulares',
    description: 'Smartphones modernos com ótimo custo-benefício',
  },
  {
    id: 'fones',
    slug: 'fones',
    label: 'Fones de ouvido',
    description: 'Áudio imersivo com e sem fio',
  },
  {
    id: 'acessorios',
    slug: 'acessorios',
    label: 'Acessórios',
    description: 'Periféricos e acessórios para o setup',
  },
  {
    id: 'eletronicos',
    slug: 'eletronicos',
    label: 'Eletrônicos',
    description: 'Gadgets e dispositivos diversos',
  },
  {
    id: 'brinquedos',
    slug: 'brinquedos',
    label: 'Brinquedos',
    description: 'Diversão para todas as idades',
  },
  {
    id: 'computadores',
    slug: 'computadores',
    label: 'Computadores',
    description: 'Notebooks e desktops para trabalho e estudo',
  },
  {
    id: 'tablets',
    slug: 'tablets',
    label: 'Tablets',
    description: 'Ideais para estudo, leitura e entretenimento',
  },
] as const;

export type CategoryId = (typeof categoriesMock)[number]['id'];

export const productsMock = [
  // =========================
  // ROUPAS
  // =========================
  {
    id: 'roupas-01',
    categoryId: 'roupas' as CategoryId,
    title: 'Camiseta Oversized Azul Royal',
    slug: 'camiseta-oversized-azul-royal',
    description:
      'Camiseta oversized em algodão premium, azul royal vibrante, perfeita para compor looks urbanos.',
    price: 79.9,
    oldPrice: 129.9,
    rating: 4.8,
    ratingCount: 421,
    image: '/assets/products/roupas/roupas-01.png',
    images: [
      '/assets/products/roupas/roupas-01.png',
      '/assets/products/roupas/roupas-02.png',
    ],
    tags: ['destaque', 'novo', 'streetwear'],
    featured: true,
    stock: 34,
    maxInstallments: 6,
  },
  {
    id: 'roupas-02',
    categoryId: 'roupas' as CategoryId,
    title: 'Jaqueta Puffer Preto Minimal',
    slug: 'jaqueta-puffer-preto-minimal',
    description:
      'Jaqueta puffer preto minimalista, leve e quente, com acabamento resistente à água.',
    price: 199.9,
    oldPrice: 259.9,
    rating: 4.7,
    ratingCount: 189,
    image: '/assets/products/roupas/roupas-03.png',
    images: [
      '/assets/products/roupas/roupas-03.png',
      '/assets/products/roupas/roupas-04.png',
    ],
    tags: ['inverno', 'lancamento'],
    featured: false,
    stock: 18,
    maxInstallments: 8,
  },

  // =========================
  // SAPATOS
  // =========================
  {
    id: 'sapatos-01',
    categoryId: 'sapatos' as CategoryId,
    title: 'Tênis Casual Branco Clean',
    slug: 'tenis-casual-branco-clean',
    description:
      'Tênis casual branco com design clean, solado confortável e estilo versátil para o dia a dia.',
    price: 159.9,
    oldPrice: 199.9,
    rating: 4.9,
    ratingCount: 512,
    image: '/assets/products/sapatos/sapatos-01.png',
    images: [
      '/assets/products/sapatos/sapatos-01.png',
      '/assets/products/sapatos/sapatos-02.png',
    ],
    tags: ['bestseller', 'conforto'],
    featured: true,
    stock: 45,
    maxInstallments: 10,
  },
  {
    id: 'sapatos-02',
    categoryId: 'sapatos' as CategoryId,
    title: 'Tênis Running Graphite Pro',
    slug: 'tenis-running-graphite-pro',
    description:
      'Tênis de corrida com amortecimento responsivo, ideal para treinos diários e corridas de rua.',
    price: 229.9,
    oldPrice: 289.9,
    rating: 4.6,
    ratingCount: 267,
    image: '/assets/products/sapatos/sapatos-03.png',
    images: [
      '/assets/products/sapatos/sapatos-03.png',
      '/assets/products/sapatos/sapatos-04.png',
    ],
    tags: ['esporte', 'corrida'],
    featured: false,
    stock: 27,
    maxInstallments: 10,
  },

  // =========================
  // CELULARES
  // =========================
  {
    id: 'celulares-01',
    categoryId: 'celulares' as CategoryId,
    title: 'Smartphone Neo X 128GB',
    slug: 'smartphone-neo-x-128gb',
    description:
      'Smartphone com tela de 6.5", 128GB de armazenamento, 8GB de RAM e câmera tripla com modo noite.',
    price: 1899.9,
    oldPrice: 2299.9,
    rating: 4.7,
    ratingCount: 973,
    image: '/assets/products/celulares/celulares-01.png',
    images: ['/assets/products/celulares/celulares-01.png'],
    tags: ['frete-gratis', 'oferta-relampago'],
    featured: true,
    stock: 16,
    maxInstallments: 12,
  },

  // =========================
  // FONES
  // =========================
  {
    id: 'fones-01',
    categoryId: 'fones' as CategoryId,
    title: 'Fone Bluetooth Noise Cancel',
    slug: 'fone-bluetooth-noise-cancel',
    description:
      'Fone Bluetooth over-ear com cancelamento ativo de ruído, até 30h de bateria e recarga rápida.',
    price: 349.9,
    oldPrice: 449.9,
    rating: 4.8,
    ratingCount: 654,
    image: '/assets/products/fones/fones-01.png',
    images: [
      '/assets/products/fones/fones-01.png',
      '/assets/products/fones/fones-02.png',
    ],
    tags: ['audio-premium', 'home-office'],
    featured: true,
    stock: 22,
    maxInstallments: 10,
  },
  {
    id: 'fones-02',
    categoryId: 'fones' as CategoryId,
    title: 'Fone True Wireless Compact',
    slug: 'fone-true-wireless-compact',
    description:
      'Fones TWS com case compacto, toque sensível e autonomia de até 20h com estojo.',
    price: 199.9,
    oldPrice: 259.9,
    rating: 4.5,
    ratingCount: 381,
    image: '/assets/products/fones/fones-03.png',
    images: [
      '/assets/products/fones/fones-03.png',
      '/assets/products/fones/fones-04.png',
    ],
    tags: ['tws', 'mobilidade'],
    featured: false,
    stock: 38,
    maxInstallments: 8,
  },

  // =========================
  // ACESSÓRIOS
  // =========================
  {
    id: 'acessorios-01',
    categoryId: 'acessorios' as CategoryId,
    title: 'Mouse Gamer RGB 7200 DPI',
    slug: 'mouse-gamer-rgb-7200-dpi',
    description:
      'Mouse gamer com iluminação RGB, 7 botões programáveis e sensor de até 7200 DPI.',
    price: 129.9,
    oldPrice: 169.9,
    rating: 4.6,
    ratingCount: 294,
    image: '/assets/products/acessorios/acessorios-01.png',
    images: ['/assets/products/acessorios/acessorios-01.png'],
    tags: ['setup-gamer', 'rgb'],
    featured: true,
    stock: 52,
    maxInstallments: 6,
  },
  {
    id: 'acessorios-02',
    categoryId: 'acessorios' as CategoryId,
    title: 'Teclado Mecânico Compact 60%',
    slug: 'teclado-mecanico-compact-60',
    description:
      'Teclado mecânico compacto com switches lineares, ideal para setups minimalistas.',
    price: 289.9,
    oldPrice: 339.9,
    rating: 4.8,
    ratingCount: 312,
    image: '/assets/products/acessorios/acessorios-02.png',
    images: ['/assets/products/acessorios/acessorios-02.png'],
    tags: ['mecanico', 'minimal'],
    featured: false,
    stock: 19,
    maxInstallments: 10,
  },
  {
    id: 'acessorios-03',
    categoryId: 'acessorios' as CategoryId,
    title: 'Monitor UltraWide 29" IPS',
    slug: 'monitor-ultrawide-29-ips',
    description:
      'Monitor UltraWide 29" com painel IPS, ideal para produtividade, estudo e multitarefa.',
    price: 1499.9,
    oldPrice: 1799.9,
    rating: 4.7,
    ratingCount: 211,
    image: '/assets/products/acessorios/acessorios-03.png',
    images: ['/assets/products/acessorios/acessorios-03.png'],
    tags: ['productividade', 'home-office'],
    featured: true,
    stock: 11,
    maxInstallments: 12,
  },

  // =========================
  // ELETRÔNICOS
  // =========================
  {
    id: 'eletronicos-01',
    categoryId: 'eletronicos' as CategoryId,
    title: 'Smartwatch Active Fit',
    slug: 'smartwatch-active-fit',
    description:
      'Smartwatch com monitoramento de atividades, sono e notificações inteligentes.',
    price: 399.9,
    oldPrice: 499.9,
    rating: 4.6,
    ratingCount: 438,
    image: '/assets/products/eletronicos/eletronicos-01.png',
    images: ['/assets/products/eletronicos/eletronicos-01.png'],
    tags: ['fitness', 'smart'],
    featured: true,
    stock: 35,
    maxInstallments: 10,
  },
  {
    id: 'eletronicos-02',
    categoryId: 'eletronicos' as CategoryId,
    title: 'Caixa de Som Bluetooth 30W',
    slug: 'caixa-som-bluetooth-30w',
    description:
      'Caixa de som portátil com 30W RMS, bateria de longa duração e proteção IPX7.',
    price: 329.9,
    oldPrice: 389.9,
    rating: 4.5,
    ratingCount: 287,
    image: '/assets/products/eletronicos/eletronicos-02.png',
    images: ['/assets/products/eletronicos/eletronicos-02.png'],
    tags: ['festa', 'portatil'],
    featured: false,
    stock: 29,
    maxInstallments: 8,
  },

  // =========================
  // BRINQUEDOS
  // =========================
  {
    id: 'brinquedos-01',
    categoryId: 'brinquedos' as CategoryId,
    title: 'Kit Blocos de Montar 500 peças',
    slug: 'kit-blocos-montar-500',
    description:
      'Kit educativo com 500 peças coloridas para estimular a criatividade das crianças.',
    price: 119.9,
    oldPrice: 159.9,
    rating: 4.9,
    ratingCount: 198,
    image: '/assets/products/brinquedos/brinquedos-01.png',
    images: ['/assets/products/brinquedos/brinquedos-01.png'],
    tags: ['educativo', 'criatividade'],
    featured: true,
    stock: 61,
    maxInstallments: 6,
  },
  {
    id: 'brinquedos-02',
    categoryId: 'brinquedos' as CategoryId,
    title: 'Carrinho Controle Remoto Off-road',
    slug: 'carrinho-controle-remoto-offroad',
    description:
      'Carrinho off-road com suspensão reforçada, pneus grandes e controle remoto 2.4GHz.',
    price: 179.9,
    oldPrice: 229.9,
    rating: 4.7,
    ratingCount: 153,
    image: '/assets/products/brinquedos/brinquedos-02.png',
    images: ['/assets/products/brinquedos/brinquedos-02.png'],
    tags: ['diversao', 'offroad'],
    featured: false,
    stock: 24,
    maxInstallments: 8,
  },

  // =========================
  // COMPUTADORES
  // =========================
  {
    id: 'computadores-01',
    categoryId: 'computadores' as CategoryId,
    title: 'Notebook Ultra Slim 14" i5',
    slug: 'notebook-ultra-slim-14-i5',
    description:
      'Notebook fino e leve com processador Intel i5, 16GB RAM e SSD 512GB.',
    price: 3499.9,
    oldPrice: 3999.9,
    rating: 4.6,
    ratingCount: 187,
    image: '/assets/products/computadores/computadores-01.png',
    images: ['/assets/products/computadores/computadores-01.png'],
    tags: ['trabalho', 'estudo'],
    featured: true,
    stock: 13,
    maxInstallments: 12,
  },
  {
    id: 'computadores-02',
    categoryId: 'computadores' as CategoryId,
    title: 'PC Gamer Ryzen RTX',
    slug: 'pc-gamer-ryzen-rtx',
    description:
      'Desktop gamer com processador Ryzen, placa de vídeo RTX e 16GB de RAM.',
    price: 5899.9,
    oldPrice: 6499.9,
    rating: 4.8,
    ratingCount: 96,
    image: '/assets/products/computadores/computadores-02.png',
    images: ['/assets/products/computadores/computadores-02.png'],
    tags: ['gamer', 'alto-desempenho'],
    featured: true,
    stock: 7,
    maxInstallments: 12,
  },

  // =========================
  // TABLETS
  // =========================
  {
    id: 'tablets-01',
    categoryId: 'tablets' as CategoryId,
    title: 'Tablet NotePad 10.1" 128GB',
    slug: 'tablet-notepad-10-1-128gb',
    description:
      'Tablet 10.1" com 128GB, ideal para estudo, leitura de PDFs e consumo de mídia.',
    price: 1299.9,
    oldPrice: 1499.9,
    rating: 4.5,
    ratingCount: 142,
    image: '/assets/products/tablets/tablets-01.png',
    images: ['/assets/products/tablets/tablets-01.png'],
    tags: ['estudo', 'leitura'],
    featured: true,
    stock: 21,
    maxInstallments: 10,
  },
  {
    id: 'tablets-02',
    categoryId: 'tablets' as CategoryId,
    title: 'Tablet Kids Resist 8"',
    slug: 'tablet-kids-resist-8',
    description:
      'Tablet infantil com capa reforçada, controle parental e seleção de apps educativos.',
    price: 799.9,
    oldPrice: 899.9,
    rating: 4.4,
    ratingCount: 87,
    image: '/assets/products/tablets/tablets-02.png',
    images: ['/assets/products/tablets/tablets-02.png'],
    tags: ['infantil', 'seguro'],
    featured: false,
    stock: 28,
    maxInstallments: 8,
  },
] as const;
