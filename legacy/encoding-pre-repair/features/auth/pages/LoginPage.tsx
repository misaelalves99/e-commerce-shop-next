// src/features/auth/pages/LoginPage.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAuth } from '@/core/hooks/useAuth';
import { resolveAppRoute, ROUTES } from '@/core/config/routes';
import type { AuthFormValues } from '../components/AuthForm';
import AuthForm from '../components/AuthForm';
import SocialLoginButtons from '../components/SocialLoginButtons';

import styles from '../styles/LoginPage.module.css';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithEmail } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const redirectTo = resolveAppRoute(
    searchParams.get('redirectTo'),
    ROUTES.home,
  ); // pode ser /account/profile ou /products depois

  const handleSubmit = async (values: AuthFormValues) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      await loginWithEmail(values.email, values.password);
      router.push(redirectTo);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'NÃ£o foi possÃ­vel fazer login. Tente novamente.';
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
        {/* Lado esquerdo: Hero / mensagem de marca */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>e-commerce-shop-next</div>

          <h1 className={styles.heroTitle}>
            Bem-vindo de volta Ã  sua{' '}
            <span className={styles.heroHighlight}>loja favorita</span>.
          </h1>

          <p className={styles.heroSubtitle}>
            Entre para continuar de onde parou, ver seus favoritos, acompanhar
            pedidos e finalizar suas compras com seguranÃ§a estilo Shopee/Shein.
          </p>

          <ul className={styles.heroList}>
            <li>Salve endereÃ§os, cartÃµes e preferÃªncias com seguranÃ§a.</li>
            <li>Acompanhe o status dos pedidos em tempo real.</li>
            <li>ExperiÃªncia otimizada para mobile e desktop.</li>
          </ul>

          <p className={styles.heroFootnote}>
            Conta nova?{' '}
            <Link href="/register" className={styles.heroLink}>
              Crie sua conta em poucos cliques.
            </Link>
          </p>
        </section>

        {/* Lado direito: Card de login */}
        <section className={styles.panel}>
          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Entrar</h2>
              <p className={styles.panelSubtitle}>
                Acesse com seu e-mail e senha ou use uma conta social.
              </p>
            </div>

            <SocialLoginButtons
              disabled={isSubmitting}
              onError={handleSocialError}
            />

            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerLabel}>ou entre com e-mail</span>
              <span className={styles.dividerLine} />
            </div>

            <AuthForm
              mode="login"
              isSubmitting={isSubmitting}
              serverError={serverError}
              onSubmit={handleSubmit}
            />

            <p className={styles.footerText}>
              NÃ£o tem conta ainda?{' '}
              <Link href="/register" className={styles.footerLink}>
                Criar conta
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

