// "app/components/Modal/page.tsx"

import React from 'react';
import Link from 'next/link';
import { MdExitToApp } from 'react-icons/md';
import styles from './Modal.module.css';

interface ModalProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Modal: React.FC<ModalProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <div className={styles.modal}>
      <ul className={styles.modalContent}>
        {isAuthenticated ? (
          <>
            <li className={styles.modalItem}>
              <Link href="/profile" passHref>
                Dados Pessoais
              </Link>
            </li>
            <li className={styles.modalItem}>
              <Link href="/orders" passHref>
                Meus pedidos
              </Link>
            </li>
            <li className={styles.modalItem}>
              <Link href="/security" passHref>
                Segurança
              </Link>
            </li>
            <li className={styles.modalItem}>
              <Link href="/address" passHref>
                Endereço
              </Link>
            </li>
            <li className={styles.modalItem}>
              <button onClick={onLogout} className={styles.logoutBtn}>
                <MdExitToApp className={styles.logoutIcon} />
                Sair
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.modalItem}>
              <Link href="/login" passHref>
                Entrar
              </Link>
            </li>
            <li className={styles.modalItem}>
              <Link href="/register" passHref>
                Cadastrar
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Modal;
