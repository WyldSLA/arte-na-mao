import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Função padrão do shadcn/ui — combina classes Tailwind sem conflitos
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formata preço em Real brasileiro
export function formatarPreco(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// Formata data para exibição (ex: "12 de maio de 2025")
export function formatarData(data: string): string {
  return format(new Date(data), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

// Formata data curta (ex: "12/05/2025")
export function formatarDataCurta(data: string): string {
  return format(new Date(data), "dd/MM/yyyy", { locale: ptBR });
}

// Trunca texto longo com reticências
export function truncar(texto: string, limite: number): string {
  if (texto.length <= limite) return texto;
  return texto.slice(0, limite).trimEnd() + "...";
}

// Converte categoria para label legível
export const categoriaLabel: Record<string, string> = {
  PINTURA: "Pintura",
  ESCULTURA: "Escultura",
  FOTOGRAFIA: "Fotografia",
  ARTESANATO: "Artesanato",
  DESENHO: "Desenho",
  GRAVURA: "Gravura",
  CERAMICA: "Cerâmica",
  OUTRO: "Outro",
};
