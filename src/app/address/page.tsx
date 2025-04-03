"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Address.module.css";

interface AddressData {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  complement: string;
}

const Address: React.FC = () => {
  const [address, setAddress] = useState<AddressData>({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
    complement: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Verifica se algum campo obrigatório está vazio
    if (
      !address.street ||
      !address.neighborhood ||
      !address.city ||
      !address.state ||
      !address.postalCode
    ) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Armazenando os dados de endereço no localStorage
    localStorage.setItem("address", JSON.stringify(address));
    alert("Endereço salvo com sucesso!");
  };

  return (
    <div className={styles.addressContainer}>
      <h2 className={styles.addressTitle}>Dados de Endereço</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Logradouro</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Bairro</label>
          <input
            type="text"
            name="neighborhood"
            value={address.neighborhood}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Cidade</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Estado</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>CEP</label>
          <input
            type="text"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Complemento</label>
          <input
            type="text"
            name="complement"
            value={address.complement}
            onChange={handleChange}
          />
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button type="submit" className={styles.submitButton}>
          Salvar Endereço
        </button>
      </form>
    </div>
  );
};

export default Address;
