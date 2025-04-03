// "app/security/page.tsx"
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Security.module.css";

// Definindo um tipo para os dados do usuário
interface User {
  email: string;
  password: string;
}

const Security: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Verificar se as senhas coincidem
    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("auth") || "{}");

    if (!storedUser?.email) {
      setErrorMessage("Você precisa estar logado para alterar a senha.");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === storedUser.email);

    if (!user) {
      setErrorMessage("Usuário não encontrado.");
      return;
    }

    // Verificando a senha atual
    if (formData.currentPassword !== user.password) {
      setErrorMessage("Senha atual incorreta.");
      return;
    }

    // Atualizando a senha
    user.password = formData.newPassword;
    const updatedUsers = users.map((u) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Senha alterada com sucesso!");
    setFormData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  };

  return (
    <div className={styles.securityContainer}>
      <h2 className={styles.securityTitle}>Alterar Senha</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Senha Atual</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Nova Senha</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Confirmar Nova Senha</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button type="submit" className={styles.submitButton}>
          Alterar Senha
        </button>
      </form>
    </div>
  );
};

export default Security;
