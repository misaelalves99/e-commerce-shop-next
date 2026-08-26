import type { User } from 'firebase/auth';

interface ServerSessionResponse {
  authenticated?: boolean;
  uid?: string;
}

export async function createServerSession(
  user: User,
): Promise<void> {
  const idToken =
    await user.getIdToken(true);

  const response =
    await fetch(
      '/api/auth/session',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          idToken,
        }),
      },
    );

  if (!response.ok) {
    throw new Error(
      'Não foi possível estabelecer a sessão segura.',
    );
  }
}

export async function ensureServerSession(
  user: User,
): Promise<void> {
  const response =
    await fetch(
      '/api/auth/session',
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

  if (response.ok) {
    const body =
      (await response.json()) as
        ServerSessionResponse;

    if (
      body.authenticated === true &&
      body.uid === user.uid
    ) {
      return;
    }
  }

  await createServerSession(user);
}

export async function deleteServerSession(): Promise<void> {
  const response =
    await fetch(
      '/api/auth/session',
      {
        method: 'DELETE',
      },
    );

  if (!response.ok) {
    throw new Error(
      'Não foi possível encerrar a sessão segura.',
    );
  }
}
