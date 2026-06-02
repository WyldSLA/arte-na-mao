"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@/components/ui/logo";

const navLinks = [
  { href: "/obras", label: "Explorar" },
  { href: "/eventos", label: "Eventos" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Estado para controlar a abertura do menu de usuário
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleLogout() {
    router.push("/login");
  }

  // Fecha o dropdown se o usuário clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-14 px-8 md:px-16">
        {/* LEFT BLOCK: LOGO + NAVEGAÇÃO */}
        <div className="flex items-center gap-8">
          {/* 1. LOGO + NOME */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80 rounded-md py-1"
          >
            <LogoIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Arte na Mão
            </span>
          </Link>

          {/* 2. LINKS DE NAVEGAÇÃO */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium px-3 py-1.5 rounded-md transition-colors",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT BLOCK: UTILITÁRIOS GLOBAIS */}
        <div className="flex items-center gap-3">
          {/* 3. MUDAR TEMA */}
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            aria-label="Alternar tema"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          </button>

          {/* Linha separadora discreta */}
          <div className="h-4 w-px bg-border" />

          {/* 4. COMPONENTE DE MENU DO USUÁRIO (DROPDOWN) */}
          <div className="relative" ref={dropdownRef}>
            {/* Gatilho do Menu (Pode ser um Avatar redondo com foto, ou esse botão sutil com ícone) */}
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={cn(
                "inline-flex items-center gap-2 px-3 h-9 rounded-md text-sm font-medium transition-colors cursor-pointer",
                isUserMenuOpen || pathname === "/dashboard"
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Minha Conta</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={cn(
                  "transition-transform duration-200 text-muted-foreground/70",
                  isUserMenuOpen && "rotate-180",
                )}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Caixa Flutuante do Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-4 w-48 rounded-lg border border-border bg-popover p-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border/60 mb-1">
                  Gerenciar Conta
                </div>

                {/* Link do Perfil */}
                <Link
                  href="/dashboard"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Meu Perfil
                </Link>

                {/* Botão Sair */}
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
