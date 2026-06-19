import type { LoginCredentials, AuthResponse, User } from "../types";

// Simula delay de rede como se fosse uma API real
const delay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// Banco de dados mockado
const MOCK_DB = {
  users: [
    {
      id: 1,
      name: "Administrador",
      email: "admin@admin.com",
      password: "123456",
      role: "admin" as const,
    },
    {
      id: 2,
      name: "Usuário Teste",
      email: "user@teste.com",
      password: "123456",
      role: "user" as const,
    },
  ],
  tokens: new Map<string, number>(), // token -> userId
};

// Gera token mockado como se fosse JWT
function generateToken(userId: number): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      iat: Date.now(),
      exp: Date.now() + 86400000, // 24 horas
    }),
  );
  const signature = btoa("mock-signature");
  return `${header}.${payload}.${signature}`;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simula requisição HTTP
    console.log("🌐 POST /api/auth/login", credentials);
    await delay(1500);

    const user = MOCK_DB.users.find((u) => u.email === credentials.email);

    if (!user) {
      console.log("❌ 401 - Usuário não encontrado");
      throw {
        response: {
          status: 401,
          data: { message: "Email não encontrado" },
        },
      };
    }

    if (user.password !== credentials.password) {
      console.log("❌ 401 - Senha incorreta");
      throw {
        response: {
          status: 401,
          data: { message: "Senha incorreta" },
        },
      };
    }

    const token = generateToken(user.id);
    MOCK_DB.tokens.set(token, user.id);

    const { password, ...userWithoutPassword } = user;

    console.log("✅ 200 - Login realizado com sucesso");
    return {
      token,
      user: userWithoutPassword,
    };
  },

  async logout(): Promise<void> {
    console.log("🌐 POST /api/auth/logout");
    await delay(500);

    const token = localStorage.getItem("token");
    if (token) {
      MOCK_DB.tokens.delete(token);
    }

    console.log("✅ 200 - Logout realizado");
  },

  async getCurrentUser(): Promise<User> {
    console.log("🌐 GET /api/auth/me");
    await delay(800);

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("❌ 401 - Token não fornecido");
      throw {
        response: {
          status: 401,
          data: { message: "Token não fornecido" },
        },
      };
    }

    const userId = MOCK_DB.tokens.get(token);

    if (!userId) {
      console.log("❌ 401 - Token inválido");
      throw {
        response: {
          status: 401,
          data: { message: "Token inválido ou expirado" },
        },
      };
    }

    const user = MOCK_DB.users.find((u) => u.id === userId);

    if (!user) {
      console.log("❌ 404 - Usuário não encontrado");
      throw {
        response: {
          status: 404,
          data: { message: "Usuário não encontrado" },
        },
      };
    }

    const { password, ...userWithoutPassword } = user;

    console.log("✅ 200 - Dados do usuário recuperados");
    return userWithoutPassword;
  },

  async refreshToken(): Promise<{ token: string }> {
    console.log("🌐 POST /api/auth/refresh");
    await delay(500);

    const oldToken = localStorage.getItem("token");
    if (!oldToken) {
      throw {
        response: {
          status: 401,
          data: { message: "Token não fornecido" },
        },
      };
    }

    const userId = MOCK_DB.tokens.get(oldToken);
    if (!userId) {
      throw {
        response: {
          status: 401,
          data: { message: "Token inválido" },
        },
      };
    }

    const newToken = generateToken(userId);
    MOCK_DB.tokens.delete(oldToken);
    MOCK_DB.tokens.set(newToken, userId);

    console.log("✅ 200 - Token atualizado");
    return { token: newToken };
  },
};
