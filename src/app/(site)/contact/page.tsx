// src/app/(site)/contact/page.tsx

import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';
import { APP_CONFIG } from '@/core/config/app-config';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.contact.title,
  description: SEO_CONFIG.routes.contact.description,
  openGraph: {
    title: SEO_CONFIG.routes.contact.title,
    description: SEO_CONFIG.routes.contact.description,
    url: SEO_CONFIG.routes.contact.url,
    images: SEO_CONFIG.routes.contact.image
      ? [{ url: SEO_CONFIG.routes.contact.image }]
      : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
};

export default function ContactPage() {
  return (
    <div className="page-container page-stack-lg">
      <section className="section-card section-card--lg">
        <header className="section-header">
          <div className="section-header-main">
            <h1 className="heading-xl">Fale com a gente</h1>
            <p className="text-muted">
              Dúvidas sobre pedidos, pagamentos ou produtos? Envie sua mensagem e nossa equipe
              entra em contato o mais rápido possível.
            </p>
          </div>
        </header>

        <form className="form-grid" autoComplete="off">
          <div className="form-row">
            <label className="form-label" htmlFor="name">
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              className="form-input"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="subject">
              Assunto
            </label>
            <input
              id="subject"
              name="subject"
              className="form-input"
              placeholder="Ex.: Dúvida sobre entrega, problema no pagamento…"
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="message">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              rows={5}
              placeholder="Descreva com detalhes como podemos te ajudar"
              required
            />
          </div>

          <div className="form-actions form-actions--right">
            <button type="submit" className="btn-primary">
              Enviar mensagem
            </button>
          </div>
        </form>
      </section>

      <section className="section-card section-card--soft">
        <div className="section-two-columns">
          <div>
            <h2 className="heading-md">Atendimento ao cliente</h2>
            <p className="text-muted">
              Nosso horário de atendimento é de segunda a sexta, das 9h às 18h (horário de Brasília).
            </p>
          </div>
          <ul className="contact-list">
            <li>
              <span className="contact-label">E-mail:</span>
              <span className="contact-value">suporte@ecommerceshopnext.com</span>
            </li>
            <li>
              <span className="contact-label">WhatsApp:</span>
              <span className="contact-value">(00) 00000-0000</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
