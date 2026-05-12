"use client";

import { createContext, useContext, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import type { Usuario, LoginDto, SignupDto, AuthResponse } from "@/types";

// ─── Tipos do contexto ───────────────────────────────────────────────────────

interface AuthContextData {
  usuario: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (dto: LoginDto) => Promise<AuthResponse>;
  signup: (dto: SignupDto) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

// ─── Chave de cache centralizada ─────────────────────────────────────────────

export const authKeys = {
  me: ["auth", "me"] as const,
};

// ─── Contexto ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Query do usuário logado — só roda se tiver token
  const { data: usuario, isLoading } = useQuery({
    queryKey: authKeys.me,
    queryFn: authService.me,
    enabled: authService.isAuthenticated(),
    retry: false, // não tenta de novo se der 401
    staleTime: 5 * 60 * 1000, // 5 min sem refetch
  });

  // Mutation de login
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async () => {
      // Força buscar os dados do usuário logo após o login
      const me = await queryClient.fetchQuery({
        queryKey: authKeys.me,
        queryFn: authService.me,
      });
      router.push(me.tipoUsuario === "ARTISTA" ? "/dashboard" : "/obras");
    },
  });

  // Mutation de cadastro
  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: async () => {
      const me = await queryClient.fetchQuery({
        queryKey: authKeys.me,
        queryFn: authService.me,
      });
      router.push(me.tipoUsuario === "ARTISTA" ? "/dashboard" : "/obras");
    },
  });

  // Mutation de logout
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Limpa todo o cache ao deslogar
      queryClient.clear();
      router.push("/login");
    },
  });

  const login = useCallback(
    (dto: LoginDto) => loginMutation.mutateAsync(dto),
    [loginMutation],
  );
  const signup = useCallback(
    (dto: SignupDto) => signupMutation.mutateAsync(dto),
    [signupMutation],
  );
  const logout = useCallback(
    () => logoutMutation.mutateAsync(),
    [logoutMutation],
  );

  return (
    <AuthContext.Provider
      value={{
        usuario: usuario ?? null,
        isLoading,
        isAuthenticated: !!usuario,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
