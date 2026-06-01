"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cadastroSchema,
  type CadastroFormData,
} from "@/lib/validations/auth.schema";
import { LogoIcon } from "@/components/ui/logo";

const painelDireitoConfig = {
  CLIENTE: {
    titulo: "Explore as artes",
    texto: "Conecte-se com uma comunidade vibrante de arte e cultura",
    classeGradiente:
      "bg-linear-to-br from-primary to-accent",
  },
  ARTISTA: {
    titulo: "Mostre seu talento",
    texto:
      "Crie seu portfólio, compartilhe suas obras e venda diretamente na plataforma",
    classeGradiente:
      "bg-linear-to-br from-secondary to-accent",
  },
  GALERIA: {
    titulo: "Gerencie seu Acervo",
    texto:
      "Potencie a visibilidade de múltiplos artistas e organize suas coleções regionais",
    classeGradiente:
      "bg-linear-to-br from-primary to-secondary",
  },
};

export default function CadastroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      tipoUsuario: "CLIENTE",
      genero: "PREFIRO_NAO_DIZER",
    },
  });

  const tipoUsuario = watch("tipoUsuario");
  const [conteudo, setConteudo] = useState(painelDireitoConfig.CLIENTE);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsFading(true);

    const timer = setTimeout(() => {
      setConteudo(
        painelDireitoConfig[tipoUsuario] || painelDireitoConfig.CLIENTE,
      );
      setIsFading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [tipoUsuario]);

  const onSubmit = async (data: CadastroFormData) => {
    try {
      console.log("Cadastro enviado:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-(--color-background) overflow-hidden">
      {/* LADO ESQUERDO: Formulário com scroll interno */}
      <div className="flex-1 flex items-start justify-center p-6 md:p-12 relative max-h-screen overflow-y-auto pt-24">
        {/* Botão Voltar */}
        <div className="absolute top-6 left-6 z-20">
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

        <div className="w-full max-w-xl animate-[fadeInUp_0.6s_ease-out] pb-6">
          {/* Header */}
          <div className="text-center mb-8">
            <LogoIcon className="mx-auto mb-4 text-(--brand-primary)" />
            <h1 className="text-3xl font-bold font-display text-(--color-foreground) mb-2">
              Criar Conta
            </h1>
            <p className="text-sm text-(--color-muted-foreground)">
              Seja bem-vindo ao mercado da nossa arte
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Cards Customizados de Tipo de Usuário (Iguais ao HTML de vocês) */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-(--color-foreground)">
                Tipo de Perfil
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Opção Cliente */}
                <label
                  className={`group relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-(--color-card) ${tipoUsuario === "CLIENTE" ? "border-(--brand-primary)" : "border-(--color-border)"}`}
                >
                  <input
                    type="radio"
                    value="CLIENTE"
                    {...register("tipoUsuario")}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tipoUsuario === "CLIENTE" ? "border-(--brand-primary)" : "border-(--color-border)"}`}
                    >
                      {tipoUsuario === "CLIENTE" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-(--brand-primary)" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-(--color-foreground)">
                        Cliente
                      </p>
                      <p className="text-xs text-(--color-muted-foreground)">
                        Quero apreciar e comprar
                      </p>
                    </div>
                  </div>
                </label>

                {/* ARTISTA */}
                <label
                  className={`group relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-(--color-card) ${tipoUsuario === "ARTISTA" ? "border-(--brand-primary)" : "border-(--color-border)"}`}
                >
                  <input
                    type="radio"
                    value="ARTISTA"
                    {...register("tipoUsuario")}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tipoUsuario === "ARTISTA" ? "border-(--brand-primary)" : "border-(--color-border)"}`}
                    >
                      {tipoUsuario === "ARTISTA" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-(--brand-primary)" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-(--color-foreground)">
                        Artista
                      </p>
                      <p className="text-xs text-(--color-muted-foreground)">
                        Quero expor e vender
                      </p>
                    </div>
                  </div>
                </label>

                {/* GALERIA */}
                <label
                  className={`group relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-(--color-card) ${tipoUsuario === "GALERIA" ? "border-(--brand-primary)" : "border-(--color-border)"}`}
                >
                  <input
                    type="radio"
                    value="GALERIA"
                    {...register("tipoUsuario")}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tipoUsuario === "GALERIA" ? "border-(--brand-primary)" : "border-(--color-border)"}`}
                    >
                      {tipoUsuario === "GALERIA" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-(--brand-primary)" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-(--color-foreground)">
                        Galeria
                      </p>
                      <p className="text-xs text-(--color-muted-foreground)">
                        Represento vários artistas
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="h-px bg-(--color-border) w-full" />

            {/* Grid de Campos - Dados de Identificação */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  {...register("nome")}
                  className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                  placeholder="Seu nome completo"
                />
                {errors.nome && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.nome.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                  Telefone
                </label>
                <input
                  type="text"
                  {...register("telefone")}
                  className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                  placeholder="(81) 99999-9999"
                />
                {errors.telefone && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.telefone.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                  CPF
                </label>
                <input
                  type="text"
                  {...register("cpf")}
                  className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                  placeholder="000.000.000-00"
                />
                {errors.cpf && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.cpf.message}
                  </span>
                )}
              </div>

              {/* Renderização condicional do CNPJ baseada no tipo de usuário */}
              {(tipoUsuario === "ARTISTA" || tipoUsuario === "GALERIA") && (
                <div className="animate-[fadeInUp_0.3s_ease-out]">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                    CNPJ (Obrigatório)
                  </label>
                  <input
                    type="text"
                    {...register("cnpj")}
                    className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                    placeholder="00.000.000/0000-00"
                  />
                  {errors.cnpj && (
                    <span className="text-xs text-destructive mt-1 block">
                      {errors.cnpj.message}
                    </span>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  {...register("dataNascimento")}
                  className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                />
                {errors.dataNascimento && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.dataNascimento.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                  Gênero
                </label>
                <select
                  {...register("genero")}
                  className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                >
                  <option value="PREFIRO_NAO_DIZER">Prefiro não dizer</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>
            </div>

            <div className="h-px bg-(--color-border) w-full" />

            {/* Seção Endereço */}
            <div>
              <h3 className="text-sm font-bold text-(--color-foreground) mb-3 font-display">
                Endereço
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                    CEP
                  </label>
                  <input
                    type="text"
                    {...register("endereco.cep")}
                    className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                    placeholder="00000-000"
                  />
                  {errors.endereco?.cep && (
                    <span className="text-xs text-destructive mt-1 block">
                      {errors.endereco.cep.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                    Rua / Logradouro
                  </label>
                  <input
                    type="text"
                    {...register("endereco.rua")}
                    className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                    placeholder="Rua, Avenida..."
                  />
                  {errors.endereco?.rua && (
                    <span className="text-xs text-destructive mt-1 block">
                      {errors.endereco.rua.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                    Número
                  </label>
                  <input
                    type="text"
                    {...register("endereco.numero")}
                    className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                    placeholder="123"
                  />
                  {errors.endereco?.numero && (
                    <span className="text-xs text-destructive mt-1 block">
                      {errors.endereco.numero.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                    Complemento (Opcional)
                  </label>
                  <input
                    type="text"
                    {...register("endereco.complemento")}
                    className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                    placeholder="Bloco, Apto..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                    Bairro
                  </label>
                  <input
                    type="text"
                    {...register("endereco.bairro")}
                    className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                    placeholder="Bairro"
                  />
                  {errors.endereco?.bairro && (
                    <span className="text-xs text-destructive mt-1 block">
                      {errors.endereco.bairro.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                    Cidade
                  </label>
                  <input
                    type="text"
                    {...register("endereco.cidade")}
                    className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                    placeholder="Cidade"
                  />
                  {errors.endereco?.cidade && (
                    <span className="text-xs text-destructive mt-1 block">
                      {errors.endereco.cidade.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                    UF
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    {...register("endereco.estado")}
                    className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                    placeholder="PE"
                  />
                  {errors.endereco?.estado && (
                    <span className="text-xs text-destructive mt-1 block">
                      {errors.endereco.estado.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="h-px bg-(--color-border) w-full" />

            {/* Credenciais de Segurança */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                  Criar Senha
                </label>
                <input
                  type="password"
                  {...register("senha")}
                  className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                  placeholder="No mínimo 6 dígitos"
                />
                {errors.senha && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.senha.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-(--color-foreground) mb-1.5">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  {...register("confirmarSenha")}
                  className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-card) text-sm focus:outline-none focus:border-(--brand-primary) text-(--color-foreground)"
                  placeholder="Repita a senha"
                />
                {errors.confirmarSenha && (
                  <span className="text-xs text-destructive mt-1 block">
                    {errors.confirmarSenha.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg bg-(--brand-primary) text-white font-bold text-sm hover:opacity-95 transition-opacity duration-200 mt-4 cursor-pointer shadow-soft"
            >
              {isSubmitting ? "Criando sua conta..." : "Criar conta"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-(--color-muted-foreground)">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-(--brand-primary)! font-semibold hover:underline"
            >
              Fazer login
            </Link>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Banner Institucional */}
      <div
        className={`hidden lg:flex w-[45%] relative items-center justify-center p-12 text-center text-white transition-all duration-500 ease-in-out ${conteudo.classeGradiente}`}
      >
        <div className="absolute inset-0 bg-black/10 z-0" />

        {/* Animação de fade */}
        <div
          className={`relative z-10 max-w-sm transition-all duration-300 transform ${isFading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <h2 className="text-4xl font-bold font-display mb-4 leading-tight">
            {conteudo.titulo}
          </h2>
          <p className="text-white/70 font-light text-base">{conteudo.texto}</p>
        </div>
      </div>
    </div>
  );
}
