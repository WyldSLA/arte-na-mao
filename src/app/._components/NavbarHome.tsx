"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@/components/ui/logo";

export function NavbarHome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled && "backdrop-blur-md shadow-sm",
      )}
      style={{
        background: scrolled ? "var(--color-card)" : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-450 mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <LogoIcon
              className={cn(
                "transition-colors duration-300",
                scrolled ? "text-primary" : "text-white",
              )}
            />
            <span
              className={cn(
                "text-xl font-bold tracking-tight transition-colors duration-300",
                scrolled ? "text-foreground" : "text-white",
              )}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Arte na Mão
            </span>
          </Link>

          {/* Botão Explorar — usando shadcn Button com asChild */}
          <Button
            asChild
            variant="default"
            className="px-8 py-3 rounded-lg font-medium hover:-translate-y-0.5 hover:bg-(--brand-primary) transition-transform text-white!"
          >
            <Link href="/login">Explorar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
