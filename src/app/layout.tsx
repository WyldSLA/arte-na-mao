import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Inter, Playfair_Display } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Arte na Mão — Arte nordestina para o Brasil",
  description:
    "Plataforma de e-commerce que conecta artistas nordestinos com apreciadores de arte de todo o Brasil.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <QueryProvider>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
