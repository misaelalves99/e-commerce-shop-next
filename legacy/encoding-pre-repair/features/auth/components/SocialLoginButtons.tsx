// src/features/auth/components/SocialLoginButtons.tsx
'use client';

import { useState } from 'react';
import { FaGoogle, FaFacebook, FaLock } from 'react-icons/fa';

import { useAuth } from '@/core/hooks/useAuth';

type Props = {
  disabled?: boolean;
  onError?: (message: string) => void;
};

export default function SocialLoginButtons({ disabled, onError }: Props) {
  const {
    loginWithGoogle,
    loginWithFacebook,
    loginWithAuth0,
  } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleError = (error: unknown, fallback: string) => {
    const message =
      error instanceof Error ? error.message : fallback;
    if (onError) onError(message);
  };

  const handleClick = async (provider: 'google' | 'facebook' | 'auth0') => {
    if (disabled || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else if (provider === 'facebook') {
        await loginWithFacebook();
      } else {
        await loginWithAuth0();
      }
    } catch (error: unknown) {
      if (provider === 'google') {
        handleError(
          error,
          'Não foi possível entrar com Google. Tente novamente.'
        );
      } else if (provider === 'facebook') {
        handleError(
          error,
          'Não foi possível entrar com Facebook. Tente novamente.'
        );
      } else {
        handleError(
          error,
          'Não foi possível entrar com Auth0. Tente novamente.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = disabled || isSubmitting;

  return (
    <div className="social-login">
      <div className="social-login-row">
        <button
          type="button"
          className="social-button social-button-google"
          onClick={() => handleClick('google')}
          disabled={isBusy}
        >
          <span className="social-button-icon">
            <FaGoogle />
          </span>
          <span className="social-button-label">
            Entrar com Google
          </span>
        </button>

        <button
          type="button"
          className="social-button social-button-facebook"
          onClick={() => handleClick('facebook')}
          disabled={isBusy}
        >
          <span className="social-button-icon">
            <FaFacebook />
          </span>
          <span className="social-button-label">
            Entrar com Facebook
          </span>
        </button>
      </div>

      <button
        type="button"
        className="social-button social-button-auth0"
        onClick={() => handleClick('auth0')}
        disabled={isBusy}
      >
        <span className="social-button-icon">
          <FaLock />
        </span>
        <span className="social-button-label">
          Entrar com Auth0 / outra conta
        </span>
      </button>
    </div>
  );
}
