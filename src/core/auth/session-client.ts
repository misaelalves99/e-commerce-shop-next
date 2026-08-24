import type { User } from 'firebase/auth';

export async function createServerSession(
  user: User,
): Promise<void> {
  const idToken = await user.getIdToken(true);

  const response = await fetch('/api/auth/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken,
    }),
  });

  if (!response.ok) {
    throw new Error(
      'Não foi possível estabelecer a sessão segura.',
    );
  }
}

export async function deleteServerSession(): Promise<void> {
  const response = await fetch('/api/auth/session', {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(
      'Não foi possível encerrar a sessão segura.',
    );
  }
}
