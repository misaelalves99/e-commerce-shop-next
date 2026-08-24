// src/features/account/pages/SecurityPage.tsx
'use client';

import { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';

import { useAuth } from '@/core/hooks/useAuth';
import type { PasswordFormData } from '@/core/types/password';
import ChangePasswordForm from '../components/ChangePasswordForm';

import styles from '../styles/SecurityPage.module.css';

export default function SecurityPage() {
  const { user, changePassword } = useAuth();

  const canChangePassword = user?.provider === 'password';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (values: PasswordFormData) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await changePassword(values);
      setSuccessMessage('Senha alterada com sucesso.');
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível alterar a senha. Tente novamente.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <span className={styles.headerIcon}>
            <FaShieldAlt />
          </span>
          <div>
            <h1 className={styles.headerTitle}>Segurança da conta</h1>
            <p className={styles.headerSubtitle}>
              Altere sua senha e veja um resumo das configurações de segurança
              da sua conta.
            </p>
          </div>
        </div>

        {user && (
          <div className={styles.securityTips}>
            <span className={styles.tipBadge}>Recomendação</span>
            <p className={styles.tipText}>
              Use uma senha única e forte, com pelo menos 8 caracteres,
              misturando letras, números e símbolos.
            </p>
          </div>
        )}
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Alterar senha</h2>
              <p className={styles.cardSubtitle}>
                Sua senha é armazenada com segurança. Nunca compartilhamos esse
                dado com ninguém.
              </p>
            </div>

            {canChangePassword ? (
              <ChangePasswordForm
                isSubmitting={isSubmitting}
                serverError={serverError}
                successMessage={successMessage}
                onSubmit={handleSubmit}
              />
            ) : (
              <div className="form-alert">
                Esta conta usa {user?.provider ?? 'um provedor externo'}.
                A senha deve ser gerenciada diretamente no provedor usado
                para entrar.
              </div>
            )}
          </div>

          <aside className={styles.sideInfo}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Dicas rápidas</h3>
              <ul className={styles.sideList}>
                <li>Evite reutilizar a mesma senha em outros sites.</li>
                <li>
                  Não compartilhe códigos de verificação nem screenshots da
                  conta.
                </li>
                <li>
                  Se suspeitar de atividade estranha, altere a senha
                  imediatamente.
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
