import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .email("Informe um e-mail válido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const enderecoSchema = z.object({
  cep: z.string().min(8, "CEP inválido").max(9),
  rua: z.string().min(1, "Rua obrigatória"),
  numero: z.string().min(1, "Número obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro obrigatório"),
  cidade: z.string().min(1, "Cidade obrigatória"),
  estado: z.string().length(2, "Use a sigla do estado (ex: PE)"),
});

export const cadastroSchema = z
  .object({
    tipoUsuario: z.enum(["ARTISTA", "CLIENTE", "GALERIA"]),
    nome: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Informe um e-mail válido"),
    senha: z.string().min(6, "Mínimo de 6 caracteres"),
    confirmarSenha: z.string(),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido (000.000.000-00)"),
    cnpj: z
      .string()
      .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido")
      .optional()
      .or(z.literal("")),
    genero: z.enum(["MASCULINO", "FEMININO", "OUTRO", "PREFIRO_NAO_DIZER"]),
    telefone: z
      .string()
      .regex(
        /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
        "Telefone inválido (ex: (81) 99999-9999)",
      ),
    dataNascimento: z.string().min(1, "Data de nascimento obrigatória"),
    descricao: z.string().optional(),
    tags: z.array(z.string()).optional(),
    endereco: enderecoSchema,
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })
  .refine(
    (data) => {
      if (data.tipoUsuario === "ARTISTA" || data.tipoUsuario === "GALERIA") {
        return !!data.cnpj && data.cnpj.length > 0;
      }
      return true;
    },
    {
      message: "CNPJ obrigatório para artistas",
      path: ["cnpj"],
    },
  );

export type LoginFormData = z.infer<typeof loginSchema>;
export type CadastroFormData = z.infer<typeof cadastroSchema>;
