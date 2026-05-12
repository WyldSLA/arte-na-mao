import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const criarObraSchema = z.object({
  titulo: z
    .string()
    .min(3, "Título muito curto")
    .max(100, "Título muito longo"),
  descricao: z
    .string()
    .min(10, "Descrição muito curta")
    .max(1000, "Máximo de 1000 caracteres"),
  preco: z
    .number({ error: "Informe um preço válido" })
    .positive("O preço deve ser maior que zero"),
  categoria: z.enum([
    "PINTURA",
    "ESCULTURA",
    "FOTOGRAFIA",
    "ARTESANATO",
    "DESENHO",
    "GRAVURA",
    "CERAMICA",
    "OUTRO",
  ]),
  tags: z.array(z.string()).optional(),
  file: z
    .instanceof(File, { message: "Imagem obrigatória" })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "A imagem deve ter no máximo 5MB",
    )
    .refine(
      (file) => ACCEPTED_TYPES.includes(file.type),
      "Formato aceito: JPG, PNG ou WebP",
    ),
});

export const editarObraSchema = criarObraSchema.omit({ file: true }).extend({
  file: z
    .instanceof(File)
    .refine((f) => f.size <= MAX_FILE_SIZE, "Máximo 5MB")
    .refine((f) => ACCEPTED_TYPES.includes(f.type), "JPG, PNG ou WebP")
    .optional(),
});

export type CriarObraFormData = z.infer<typeof criarObraSchema>;
export type EditarObraFormData = z.infer<typeof editarObraSchema>;
