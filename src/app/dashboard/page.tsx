import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Quando integrar com a API, vai ler o tipo do usuário e redirecionar
  // Por enquanto redireciona para cliente como padrão
  redirect("/dashboard/cliente");
}
