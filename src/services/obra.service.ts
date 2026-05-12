import api from "./api";
import type { ApiResponse, Obra, CreateObraDto, UpdateObraDto } from "@/types";

export const obraService = {
  async getById(id: string): Promise<Obra> {
    const { data } = await api.get<ApiResponse<Obra>>(`/obras/${id}`);
    return data.data;
  },

  async create(dto: CreateObraDto): Promise<Obra> {
    const form = new FormData();
    form.append("titulo", dto.titulo);
    form.append("descricao", dto.descricao);
    form.append("preco", String(dto.preco));
    form.append("categoria", dto.categoria);
    form.append("file", dto.file);
    dto.tags?.forEach((tag) => form.append("tags[]", tag));

    const { data } = await api.post<ApiResponse<Obra>>("/obras", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  },

  async update(id: string, dto: UpdateObraDto): Promise<Obra> {
    const form = new FormData();
    if (dto.titulo) form.append("titulo", dto.titulo);
    if (dto.descricao) form.append("descricao", dto.descricao);
    if (dto.preco) form.append("preco", String(dto.preco));
    if (dto.categoria) form.append("categoria", dto.categoria);
    if (dto.file) form.append("file", dto.file);
    dto.tags?.forEach((tag) => form.append("tags[]", tag));

    const { data } = await api.patch<ApiResponse<Obra>>(`/obras/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  },

  async updateDisponibilidade(id: string, disponivel: boolean): Promise<void> {
    await api.patch(`/obras/${id}/disponibilidade`, { disponivel });
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/obras/${id}`);
  },
};
