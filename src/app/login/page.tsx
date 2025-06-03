// "app/login/page.jsx":

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import bcrypt from "bcryptjs";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { User } from "../types/user";
import { FormData } from "../types/form";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find((u) => u.email === formData.email);
    if (!user) {
      alert("Usuário não encontrado.");
      return;
    }

    const passwordMatch = await bcrypt.compare(formData.password, user.password);
    if (!passwordMatch) {
      alert("Senha incorreta.");
      return;
    }

    localStorage.setItem("auth", JSON.stringify({ email: user.email, fullName: user.fullName }));
    alert("Login realizado com sucesso!");
    router.push("/");
  };

  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Senha</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <button type="submit" className={styles.loginBtn}>Entrar</button>
        <p className={styles.signupLink}>
          Não tem cadastro? <a href="/register">Cadastre-se</a>
        </p>

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

export default Login;
