"use client";

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

  function handleLogout() {
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="max-w-full mx-auto flex items-center justify-between h-14 px-6 lg:px-12">
        {/* 1. LOGO + NOME */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80 rounded-md p-1"
        >
          <LogoIcon className="w-5 h-5 text-primary" />
          <span className="text-lg text-primary font-bold tracking-tight font-display bg-clip-text">
            Arte na Mão
          </span>
        </Link>

        {/* TODOS OS ITENS ALINHADOS EM LINHA RETA COMPLETA */}
        <div className="flex items-center gap-6">
          {/* 2. LINK DO EXPLORAR & 3. LINK DOS EVENTOS */}
          <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-all px-3 py-1.5 rounded-md",
                    isActive
                      ? "text-primary bg-primary/5 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Linha separadora discreta */}
          <div className="h-4 w-px bg-border" />

          {/* 4. MUDAR TEMA */}
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
            aria-label="Alternar tema"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          </button>

          {/* 5. LINK DO PERFIL */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-border hover:bg-muted/40 text-xs font-medium text-foreground transition-all"
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
            Perfil
          </Link>

          {/* 6. SAIR */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-muted/40 text-xs font-medium text-foreground transition-all cursor-pointer"
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
      </nav>
    </header>
  );
}
