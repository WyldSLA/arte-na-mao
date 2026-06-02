"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth.schema";
import { LogoIcon } from "@/components/ui/logo";
import { MOCK_USUARIOS } from "@/lib/mock-users";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", senha: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Login enviado:", data);

      // Procura se o e-mail digitado pertence a algum dos nossos usuários mockados
      const usuarioLogado = Object.values(MOCK_USUARIOS).find(
        (user) => user.email === data.email,
      );

      if (!usuarioLogado) {
        // Se não achar o e-mail nos mocks (digitou qualquer outra coisa), assume Cliente por padrão
        router.push("/dashboard/cliente");
        return;
      }

      // Redirecionamento baseado no tipo do usuário mockado
      switch (usuarioLogado.tipoUsuario) {
        case "ARTISTA":
          router.push("/dashboard/artista");
          break;
        case "GALERIA":
          router.push("/dashboard/galeria");
          break;
        case "CLIENTE":
        default:
          router.push("/dashboard/cliente");
          break;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-(--color-background) overflow-hidden">
      {/* LADO ESQUERDO: Formulário */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative max-h-screen overflow-y-auto">
        {/* Botão Voltar */}
        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-(--color-border) text-(--color-foreground) hover:bg-(--color-muted) transition-colors"
            aria-label="Voltar para página inicial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>

        <div className="w-full max-w-sm animate-[fadeInUp_0.6s_ease-out]">
          {/* Header do Form */}
          <div className="text-center mb-8">
            <LogoIcon className="mx-auto mb-4 text-(--brand-primary)" />
            <h1 className="text-3xl font-bold font-display text-(--color-foreground) mb-2">
              Arte na <span className="text-(--brand-primary)">Mão</span>
            </h1>
            <p className="text-sm text-(--color-muted-foreground)">
              Acesse sua conta para continuar
            </p>
          </div>
          {process.env.NODE_ENV === "development" && (
            <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex flex-wrap gap-2 items-center justify-center animate-[fadeInUp_0.4s_ease-out]">
              <span className="text-xs font-bold text-(--color-muted-foreground)">
                ⚡ Logar como:
              </span>
              <button
                type="button"
                onClick={() => {
                  setValue("email", MOCK_USUARIOS.CLIENTE.email);
                  setValue("senha", "123456");
                }}
                className="px-2 py-1 bg-(--color-card) hover:bg-(--color-muted) border border-(--color-border) text-xs font-medium rounded cursor-pointer text-(--color-foreground)"
              >
                Cliente
              </button>
              <button
                type="button"
                onClick={() => {
                  setValue("email", MOCK_USUARIOS.ARTISTA.email);
                  setValue("senha", "123456");
                }}
                className="px-2 py-1 bg-(--color-card) hover:bg-(--color-muted) border border-(--color-border) text-xs font-medium rounded cursor-pointer text-(--color-foreground)"
              >
                Artista
              </button>
              <button
                type="button"
                onClick={() => {
                  setValue("email", MOCK_USUARIOS.GALERIA.email);
                  setValue("senha", "123456");
                }}
                className="px-2 py-1 bg-(--color-card) hover:bg-(--color-muted) border border-(--color-border) text-xs font-medium rounded cursor-pointer text-(--color-foreground)"
              >
                Galeria
              </button>
            </div>
          )}
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-(--color-foreground)">
                E-mail
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/20 focus:border-(--brand-primary) text-(--color-foreground) transition-all"
                placeholder="seu@email.com"
              />
              {errors.email && (
                <span className="text-xs text-destructive mt-1 block font-medium">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-(--color-foreground)">
                  Senha
                </label>
                <Link
                  href="#"
                  className="text-xs text-(--brand-primary) hover:underline font-semibold"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("senha")}
                  className="w-full px-4 py-2.5 pr-11 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/20 focus:border-(--brand-primary) text-(--color-foreground) transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-muted-foreground) hover:text-(--color-foreground) transition-colors"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.senha && (
                <span className="text-xs text-destructive mt-1 block font-medium">
                  {errors.senha.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg bg-(--brand-primary) text-white font-semibold text-sm hover:opacity-95 transition-opacity duration-200 mt-2 cursor-pointer shadow-soft"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-(--color-muted-foreground)">
            Não tem uma conta?{" "}
            <Link
              href="/cadastro"
              className="text-(--brand-primary)! font-semibold hover:underline"
            >
              Criar conta grátis
            </Link>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Gradiente Real utilizando a sua variável + Cores do Tailwind v4 */}
      <div className="hidden lg:flex w-[45%] relative items-center justify-center p-12 text-center text-white bg-linear-to-br from-rose-600 via-orange-500 to-amber-500">
        <div className="absolute inset-0 bg-black/10 z-0" />

        <div className="relative z-10 max-w-sm animate-[fadeInUp_0.8s_ease-out]">
          <h2 className="text-4xl font-bold font-display mb-4 leading-tight">
            Arte que conecta culturas
          </h2>
          <p className="text-white/70 font-light text-base">
            Descubra o talento do Nordeste em um só lugar
          </p>
        </div>
      </div>
    </div>
  );
}
