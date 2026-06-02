import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Quando a API estiver pronta, verifica o token aqui
  // Por enquanto deixa passar (os mocks cuidam do redirect)
  return <>{children}</>;
}
