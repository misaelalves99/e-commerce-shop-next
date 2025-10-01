// app/register/page.tsx

"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { loginWithGoogle, loginWithFacebook } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      // Aqui você chamaria um endpoint real de registro com email/senha
      // Exemplo: await registerUser(formData.email, formData.password);
      alert(`Cadastro com email: ${formData.email} (apenas mock)`);

      // Redireciona para login
      router.push("/login");
    } catch (err: any) {
      setError(err?.message || "Erro ao registrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch (err: any) {
      setError(err?.message || "Erro ao registrar com Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookRegister = async () => {
    try {
      setLoading(true);
      await loginWithFacebook();
    } catch (err: any) {
      setError(err?.message || "Erro ao registrar com Facebook.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerFormContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Criar Cadastro</h2>

        {error && <div className={styles.error}>{error}</div>}

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

        <button type="submit" className={styles.createAccountBtn} disabled={loading}>
          {loading ? "Criando conta..." : "Criar Cadastro"}
        </button>

        <p className={styles.signinLink}>
          Já tem cadastro? <a href="/login">Entrar</a>
        </p>

        <div className={styles.divider}>ou cadastre-se com</div>

        <div className={styles.socialLogin}>
          <button type="button" className={styles.googleBtn} onClick={handleGoogleRegister}>
            <FaGoogle className={styles.icon} /> Entrar com Google
          </button>
          <button type="button" className={styles.facebookBtn} onClick={handleFacebookRegister}>
            <FaFacebookF className={styles.icon} /> Entrar com Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
