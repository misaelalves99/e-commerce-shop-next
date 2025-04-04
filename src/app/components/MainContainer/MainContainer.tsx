// "app/components/MainContainer/page.tsx"
"use client";
import React from 'react';
import styles from './MainContainer.module.css'; // Importando o CSS Module

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <main className={styles.mainContainer}>
      {children}
    </main>
  );
};

export default MainContainer;
