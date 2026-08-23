// src/features/account/pages/ProfilePage.tsx
'use client';

import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import { useAuth } from '@/core/hooks/useAuth';
import type { UserData } from '@/core/types/user-data';
import ProfileForm from '../components/ProfileForm';

import styles from '../styles/ProfilePage.module.css';

export default function ProfilePage() {
  const { user, profile, isLoadingProfile, updateUserProfile } = useAuth();

  const [initialValues, setInitialValues] = useState<UserData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!profile && user) {
      // fallback mínimo usando AuthUser
      setInitialValues({
        fullName: user.name ?? '',
        cpf: '',
        birthDate: '',
        gender: '',
        phone: '',
        email: user.email,
      });
    } else if (profile) {
      setInitialValues(profile);
    }
  }, [profile, user]);

  const handleSubmit = async (values: UserData) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await updateUserProfile(values);
      setSuccessMessage('Dados atualizados com sucesso.');
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível salvar os dados. Tente novamente.';
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
            <FaUserCircle />
          </span>
          <div>
            <h1 className={styles.headerTitle}>Meu perfil</h1>
            <p className={styles.headerSubtitle}>
              Gerencie seus dados pessoais usados na emissão de notas fiscais,
              entrega de pedidos e comunicação da loja.
            </p>
          </div>
        </div>

        {user && (
          <div className={styles.headerMeta}>
            <span className={styles.metaTag}>ID #{user.id.slice(0, 8)}</span>
            {user.provider && (
              <span className={styles.metaTag}>
                Login via {user.provider.toUpperCase()}
              </span>
            )}
          </div>
        )}
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Informações pessoais</h2>
              <p className={styles.cardSubtitle}>
                Mantenha seus dados sempre atualizados para agilizar o checkout
                e evitar problemas de entrega.
              </p>
            </div>

            <ProfileForm
              initialValues={initialValues}
              loading={isLoadingProfile || !initialValues}
              isSubmitting={isSubmitting}
              serverError={serverError}
              successMessage={successMessage}
              onSubmit={handleSubmit}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
