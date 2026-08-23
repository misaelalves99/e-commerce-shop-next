// src/core/mocks/users.mock.ts

/**
 * Usuários de teste (mock) para fluxo de autenticação e área logada.
 *
 * Estes dados podem ser usados pelo AuthProvider para simular login
 * com email/senha enquanto integra Firebase/Auth0.
 */

export const usersMock = [
  {
    id: 'user-1',
    name: 'Cliente Demo',
    email: 'cliente.demo@misaelstore.dev',
    password: '123456', // apenas para ambiente de demonstração
    avatarUrl: null as string | null,
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-11-01T15:20:00.000Z',
    profile: {
      fullName: 'Cliente Demo',
      cpf: '000.000.000-00',
      birthDate: '1995-05-20',
      gender: 'outro',
      phone: '(33) 99999-0000',
      email: 'cliente.demo@misaelstore.dev',
    },
  },
  {
    id: 'user-2',
    name: 'Usuário Frontend',
    email: 'frontend.dev@misaelstore.dev',
    password: 'frontend123',
    avatarUrl: null as string | null,
    createdAt: '2024-02-15T09:30:00.000Z',
    updatedAt: '2024-10-20T12:45:00.000Z',
    profile: {
      fullName: 'Usuário Frontend',
      cpf: '111.111.111-11',
      birthDate: '1999-09-09',
      gender: 'masculino',
      phone: '(33) 98888-1111',
      email: 'frontend.dev@misaelstore.dev',
    },
  },
] as const;

/**
 * Usuário padrão sugerido para logar rapidamente no ambiente de demo.
 * Pode ser usado em alguma UI de "login rápido" quando estiver sem backend.
 */
export const defaultDemoUser = usersMock[0];
