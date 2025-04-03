"use client";
import React, { useState, useContext, useEffect, useRef } from 'react';
import { FaSearch, FaCartPlus, FaUser } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppContext from '../../context/AppContext';
import styles from './Header.module.css';
import Modal from '../Modal/page'; // Importe o componente Modal

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false); // Controla a exibição do modal
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Indica se o usuário está autenticado
  const profileRef = useRef<HTMLDivElement>(null);

  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppContext is not provided');
  }
  const { cart, favorites } = context;

  const router = useRouter();

  useEffect(() => {
    console.log(`Carrinho atualizado: ${cart.length} itens`);
  }, [cart]);

  useEffect(() => {
    console.log(`Favoritos atualizados: ${favorites.length} itens`);
  }, [favorites]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Função para mostrar o modal quando o mouse entra
  const handleMouseEnterProfile = () => {
    setShowModal(true);
  };

  // Função para esconder o modal quando o mouse sai
  const handleMouseLeaveProfile = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push('/login'); // Redireciona para a página de login
  };

  // Fechar o modal ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section className={styles.header}>
      <div className={styles.bar1}>
        <div className={styles.bar1Container}>
          <div className={styles.logo}>
            <Link href="/">
              <FaCartPlus className={styles.iconLogo} />
              <h1>E-Commerce Shop</h1>
            </Link>
          </div>
          <div className={styles.user}>
            <div className={styles.cartUser}>
              <div>
                <Link href="/cart">
                  <FaCartPlus />
                </Link>
                {cart.length > 0 && <span className={styles.cartCounter}>{cart.length}</span>}
              </div>
            </div>
            <div className={styles.favoritesUser}>
              <div>
                <Link href="/favorites">
                  <MdFavorite />
                </Link>
                {favorites.length > 0 && <span className={styles.favoriteCounter}>{favorites.length}</span>}
              </div>
            </div>
            <div
              className={styles.profileUser}
              onMouseEnter={handleMouseEnterProfile} // Exibe o modal ao passar o mouse
              onMouseLeave={handleMouseLeaveProfile} // Esconde o modal ao sair o mouse
              ref={profileRef}
            >
              <FaUser className={styles.profileIcon} /> {/* Tamanho do ícone controlado aqui */}
              {showModal && <Modal isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bar2}>
        <div className={styles.bar2Container}>
          <div className={styles.search}>
            <input type="text" placeholder="Search products" />
            <button className={styles.searchIcon}>
              <FaSearch />
            </button>
          </div>
          <div className={styles.navbar}>
            <ul className={styles.menuList}>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  Contato
                </Link>
              </li>
            </ul>
            <button className={styles.menuButton} onClick={toggleMenu}>
              ☰
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;