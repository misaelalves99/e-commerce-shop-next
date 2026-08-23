// src/features/auth/pages/RegisterPage.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/core/hooks/useAuth';
import type { AuthFormValues } from '../components/AuthForm';
import AuthForm from '../components/AuthForm';
import SocialLoginButtons from '../components/SocialLoginButtons';

import styles from '../styles/RegisterPage.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const { registerWithEmail } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (values: AuthFormValues) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      await registerWithEmail({
        name: values.name?.trim() ?? '',
        email: values.email,
        password: values.password,
      });

      router.push('/'); // depois pode ir para /account/profile ou /products
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível criar sua conta. Tente novamente.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialError = (message: string) => {
    setServerError(message);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Lado esquerdo: mensagem de boas-vindas */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>Novo por aqui?</div>

          <h1 className={styles.heroTitle}>
            Crie sua conta e desbloqueie uma{' '}
            <span className={styles.heroHighlight}>experiência completa</span>.
          </h1>

          <p className={styles.heroSubtitle}>
            Tenha acesso rápido aos seus pedidos, favoritos, endereços salvos e
            ofertas personalizadas em um só lugar.
          </p>

          <ul className={styles.heroList}>
            <li>Sincronize seu carrinho em todos os dispositivos.</li>
            <li>Histórico inteligente de pedidos e recomendações.</li>
            <li>Login seguro com provedores confiáveis.</li>
          </ul>

          <p className={styles.heroFootnote}>
            Já tem conta?{' '}
            <Link href="/login" className={styles.heroLink}>
              Fazer login
            </Link>
          </p>
        </section>

        {/* Lado direito: Card de cadastro */}
        <section className={styles.panel}>
          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Criar conta</h2>
              <p className={styles.panelSubtitle}>
                Leva menos de 1 minuto. Use um e-mail válido para acompanhar os
                pedidos.
              </p>
            </div>

            <SocialLoginButtons
              disabled={isSubmitting}
              onError={handleSocialError}
            />

            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerLabel}>
                ou preencha seus dados
              </span>
              <span className={styles.dividerLine} />
            </div>

            <AuthForm
              mode="register"
              isSubmitting={isSubmitting}
              serverError={serverError}
              onSubmit={handleSubmit}
            />

            <p className={styles.footerText}>
              Já possui cadastro?{' '}
              <Link href="/login" className={styles.footerLink}>
                Entrar
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
