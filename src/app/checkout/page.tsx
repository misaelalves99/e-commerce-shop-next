"use client";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import styles from "./Checkout.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",  // Adicionando CPF no estado do formulário
    addressLine1: "",
    addressLine2: "",
    complement: "",  // Novo campo complemento
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    paymentMethod: "cartao",
  });
  const router = useRouter();

  if (!context) {
    return <p className={styles.emptyCartMessage}>O carrinho está carregando...</p>;
  }

  const { cart } = context;

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
  };

  const handlePlaceOrder = () => {
    alert("Compra realizada com sucesso!");
    router.push("/"); // Redireciona para a página inicial após a compra
  };

  return (
    <div className={styles.checkoutContainer}>
      <button className={styles.backButton} onClick={() => router.push("/cart")}>
        <FaArrowLeft /> Voltar para o Carrinho
      </button>
      <h2 className={styles.checkoutTitle}>Finalizar Compra</h2>

      <div className={styles.checkoutForm}>
        <div className={styles.formColumn}>
          <label>
            Nome
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              placeholder="Digite seu nome completo"
            />
          </label>

          <label>
            CPF
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleFormChange}
              required
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"  // Máscara de CPF
              placeholder="XXX.XXX.XXX-XX" // Placeholder com a máscara do CPF
            />
          </label>
          
          <label>
            E-mail
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              placeholder="Digite seu e-mail"
            />
          </label>

          <label>
            CEP
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleFormChange}
              required
              placeholder="Digite seu CEP"
            />
          </label>

          <label>
            Endereço
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleFormChange}
              required
              placeholder="Digite seu endereço"
            />
          </label>

          <label>
            Complemento
            <input
              type="text"
              name="complement"
              value={formData.complement}
              onChange={handleFormChange}
              placeholder="Complemento (opcional)"
            />
          </label>
        </div>

        <div className={styles.formColumn}>
          <label>
            Número
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleFormChange}
              required
              placeholder="Número da residência"
            />
          </label>

          <label>
            Bairro
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleFormChange}
              required
              placeholder="Bairro"
            />
          </label>

          <label>
            Cidade
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              required
              placeholder="Cidade"
            />
          </label>

          <label>
            Estado
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              required
              placeholder="Estado"
            />
          </label>

          <label>
            Forma de Pagamento
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handlePaymentMethodChange}
              required
            >
              <option value="cartao">Cartão de Crédito</option>
              <option value="contaCorrente">Conta Corrente</option>
              <option value="contaPoupanca">Conta Poupança</option>
              <option value="pix">Pix</option>
              <option value="avista">À Vista</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.orderSummary}>
        <h3>Resumo do Pedido</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.title} (x{item.quantity})</span> - R${(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          <strong>Total: R${calculateTotal()}</strong>
        </div>
      </div>

      <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
        Finalizar Pedido
      </button>

      <div className={styles.paymentInfo}>
        <h4>Forma de pagamento escolhida: {formData.paymentMethod === "cartao" ? "Cartão de Crédito" :
          formData.paymentMethod === "contaCorrente" ? "Conta Corrente" :
          formData.paymentMethod === "contaPoupanca" ? "Conta Poupança" :
          formData.paymentMethod === "pix" ? "Pix" : "À Vista"}</h4>
      </div>
    </div>
  );
};

export default CheckoutPage;
