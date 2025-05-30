// "app/register/page.tsx"
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css";
import bcrypt from "bcryptjs"; // Para criptografar senhas
import { FaGoogle, FaFacebookF } from "react-icons/fa"; // Ícones de Google e Facebook

interface FormData {
  email: string;
  password: string;
  confirmPassword: string; // Campo de confirmação de senha
}

interface User {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "", // Campo de confirmação de senha
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Verificando se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    // Recuperando usuários cadastrados
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Verificando se o e-mail já está cadastrado
    const userExists = users.some((user) => user.email === formData.email);
    if (userExists) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    // Criptografando a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    // Criando novo usuário
    const newUser: User = { email: formData.email, password: hashedPassword };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("Cadastro realizado com sucesso!");
    router.push("/login");
  };

  return (
    <div className={styles.registerFormContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Criar Cadastro</h2>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Senha</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>Confirmar Senha</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.createAccountBtn}>
          Criar Cadastro
        </button>
        <p className={styles.signinLink}>
          Já tem cadastro? <a href="/login">Entrar</a>
        </p>

        {/* Botões de login social */}
        <div className={styles.socialLogin}>
          <button type="button" className={styles.googleBtn}>
            <FaGoogle className={styles.icon} /> Entrar com Google
          </button>
          <button type="button" className={styles.facebookBtn}>
            <FaFacebookF className={styles.icon} /> Entrar com Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
