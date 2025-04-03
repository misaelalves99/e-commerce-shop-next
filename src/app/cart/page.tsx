"use client";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import styles from "./Cart.module.css";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Importando o hook para navegação

const CartPage = () => {
  const context = useContext(AppContext);
  const router = useRouter(); // Instanciando o hook de navegação

  if (!context) {
    return <p className={styles.emptyCartMessage}>O carrinho está carregando...</p>;
  }

  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = context;

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    router.push("/checkout"); // Redireciona para a página de checkout
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Meu Carrinho</h2>

      {cart.length === 0 ? (
        <p className={styles.emptyCartMessage}>Seu carrinho está vazio.</p>
      ) : (
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.images}
                alt={item.title}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemPrice}>R${item.price.toFixed(2)}</p>

                <div className={styles.quantityControls}>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                    className={styles.quantityButton}
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className={styles.quantityButton}
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeButton}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className={styles.totalContainer}>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Finalizar Compra
          </button>
          <h3 className={styles.total}>Total: R${calculateTotal()}</h3>
        </div>
      )}

    </div>
  );
};

export default CartPage;
