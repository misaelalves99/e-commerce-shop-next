// app/layout.tsx

import React, { ReactNode } from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "../app/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu Site",
  description: "Descrição do meu site",
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
};

export default Layout;
