import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { obraService } from "@/services/obra.service";
import type { CreateObraDto, UpdateObraDto } from "@/types";

// Chaves de cache centralizadas — evita string duplicada em vários arquivos
export const obraKeys = {
  all: ["obras"] as const,
  detail: (id: string) => ["obras", id] as const,
};

// Busca uma obra por ID
export function useObra(id: string) {
  return useQuery({
    queryKey: obraKeys.detail(id),
    queryFn: () => obraService.getById(id),
    enabled: !!id,
  });
}

// Cria uma nova obra e invalida o cache da listagem
export function useCriarObra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateObraDto) => obraService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: obraKeys.all });
    },
  });
}

// Edita uma obra existente
export function useEditarObra(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateObraDto) => obraService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: obraKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: obraKeys.all });
    },
  });
}

// Alterna disponibilidade
export function useDisponibilidadeObra(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (disponivel: boolean) =>
      obraService.updateDisponibilidade(id, disponivel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: obraKeys.detail(id) });
    },
  });
}

// Deleta uma obra
export function useDeletarObra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => obraService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: obraKeys.all });
    },
  });
}
