"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { LogOut, User } from "lucide-react";
import { LogoIcon } from "../ui/logo";

const navLinks = [
  { href: "/obras", label: "Obras" },
  { href: "/eventos", label: "Eventos" },
  { href: "/artistas", label: "Artistas" },
];

export function Navbar() {
  const pathname = usePathname();
  const { usuario, isAuthenticated, logout } = useAuth();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <LogoIcon style={{ color: "var(--primary)" }} />
          <span
            className="text-2xl font-bold font-display"
            style={{
              fontFamily: "var(--font-display)",
              background: "var(--primary)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Arte na Mão
          </span>
        </Link>

        {/* Links de navegação */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--primary)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-[var(--muted)]"
                style={{ color: "var(--foreground)" }}
              >
                <User size={16} />
                {usuario?.nome?.split(" ")[0]}
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border transition-colors hover:bg-[var(--muted)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-[var(--muted)]"
                style={{ color: "var(--foreground)" }}
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="text-sm font-medium px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                Criar Conta
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
