// app/layout.tsx

import React, { ReactNode } from "react";
import { Metadata } from "next";
import { AppProvider } from "./context/AppContext";
import { AuthProvider, Auth0ProviderWrapper } from "./context/AuthProvider";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "../app/globals.css";

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
        {/* Auth0 Wrapper */}
        <Auth0ProviderWrapper>
          {/* Contexto de autenticação */}
          <AuthProvider>
            {/* Contexto global da aplicação */}
            <AppProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </AppProvider>
          </AuthProvider>
        </Auth0ProviderWrapper>
      </body>
    </html>
  );
};

export default Layout;
