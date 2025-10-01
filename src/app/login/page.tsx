// app/login/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { loginWithGoogle, loginWithFacebook, logout } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Aqui você chamaria um endpoint real de login com email/senha
      // Exemplo: await loginEmail(formData.email, formData.password);
      alert(`Login com email: ${formData.email} (apenas mock)`);

      // Redireciona para home
      router.push("/");
    } catch (err: any) {
      setError(err?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch (err: any) {
      setError(err?.message || "Erro ao logar com Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      await loginWithFacebook();
    } catch (err: any) {
      setError(err?.message || "Erro ao logar com Facebook.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Entrar</h2>

        {error && <div className={styles.error}>{error}</div>}

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Senha</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className={styles.signupLink}>
          Não tem cadastro? <a href="/register">Cadastre-se</a>
        </p>

        <div className={styles.divider}>ou entre com</div>

        <div className={styles.socialLogin}>
          <button type="button" className={styles.googleBtn} onClick={handleGoogleLogin}>
            <FaGoogle className={styles.icon} /> Entrar com Google
          </button>
          <button type="button" className={styles.facebookBtn} onClick={handleFacebookLogin}>
            <FaFacebookF className={styles.icon} /> Entrar com Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
