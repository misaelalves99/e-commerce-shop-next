// src/features/account/pages/AddressPage.tsx
'use client';

import { FaMapMarkerAlt } from 'react-icons/fa';

import { useAuth } from '@/core/hooks/useAuth';
import type { AddressData } from '@/core/types/address';
import AddressForm from '@/features/checkout/components/AddressForm';

import styles from '../styles/AddressPage.module.css';

export default function AddressPage() {
  const { address, updateAddress } = useAuth();

  const handleSubmit = async (values: AddressData) => {
    await updateAddress(values);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <span className={styles.headerIcon}>
            <FaMapMarkerAlt />
          </span>
          <div>
            <h1 className={styles.headerTitle}>Endereço principal</h1>
            <p className={styles.headerSubtitle}>
              Defina o endereço padrão usado no checkout para entrega dos seus
              pedidos.
            </p>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Endereço de entrega</h2>
              <p className={styles.cardSubtitle}>
                Você pode alterar esses dados sempre que necessário antes de
                finalizar um pedido.
              </p>
            </div>

            <AddressForm
              initialValue={address ?? undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
