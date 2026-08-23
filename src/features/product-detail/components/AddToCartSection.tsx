
// src/features/product-detail/components/AddToCartSection.tsx

'use client';

import type { ReactElement } from 'react';

import { useState } from 'react';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

import { useCart } from '@/core/hooks/useCart';
import type { Product } from '@/core/types/product';

import styles from '../styles/ProductDetail.module.css';

export interface AddToCartSectionProps {
  product: Product;
  stock?: number;
}

export default function AddToCartSection({
  product,
  stock,
}: AddToCartSectionProps): ReactElement {
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();

  const maxQty = typeof stock === 'number' && stock > 0 ? stock : 99;

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrease = () => {
    setQuantity((prev) => (prev < maxQty ? prev + 1 : prev));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const isOutOfStock = typeof stock === 'number' && stock <= 0;

  return (
    <section className={styles.cartSection} aria-label="Comprar produto">
      <div className={styles.quantityRow}>
        <span className={styles.quantityLabel}>Quantidade</span>
        <div className={styles.quantityControl}>
          <button
            type="button"
            className={styles.qtyButton}
            onClick={handleDecrease}
            aria-label="Diminuir quantidade"
            disabled={quantity <= 1 || isOutOfStock}
          >
            <FiMinus />
          </button>
          <span className={styles.qtyValue}>{quantity}</span>
          <button
            type="button"
            className={styles.qtyButton}
            onClick={handleIncrease}
            aria-label="Aumentar quantidade"
            disabled={quantity >= maxQty || isOutOfStock}
          >
            <FiPlus />
          </button>
        </div>

        {typeof stock === 'number' && stock > 0 && (
          <span className={styles.stockHint}>
            {stock <= 5
              ? `Últimas ${stock} unidades`
              : `Estoque: ${stock} unidades`}
          </span>
        )}

        {isOutOfStock && (
          <span className={styles.stockOut}>Produto esgotado no momento</span>
        )}
      </div>

      <div className={styles.cartActionsRow}>
        <button
          type="button"
          className={styles.cartPrimaryButton}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          <FiShoppingCart className={styles.cartPrimaryIcon} />
          <span>{isOutOfStock ? 'Esgotado' : 'Adicionar ao carrinho'}</span>
        </button>

        <button type="button" className={styles.cartSecondaryButton}>
          Comprar agora
        </button>
      </div>

      <ul className={styles.cartBenefits}>
        <li>✔ Pagamento seguro com cartões, PIX e boleto.</li>
        <li>✔ Até 10x sem juros em cartões selecionados.</li>
        <li>✔ Política de troca simplificada diretamente no painel do cliente.</li>
      </ul>
    </section>
  );
}
