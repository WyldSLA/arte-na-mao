// Re-exporta o hook do provider para que os componentes
// possam importar de @/hooks/useAuth em vez de @/providers/AuthProvider
export { useAuth, authKeys } from "@/providers/AuthProvider";
