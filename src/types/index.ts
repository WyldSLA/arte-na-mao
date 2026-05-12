// ==================== AUTH ====================

export type TipoUsuario = "ARTISTA" | "CLIENTE";

export type Genero = "MASCULINO" | "FEMININO" | "OUTRO" | "PREFIRO_NAO_DIZER";

export interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Usuario {
  id: string;
  email: string;
  nome: string;
  tipoUsuario: TipoUsuario;
  perfil: {
    cpf: string;
    genero: Genero;
    telefone: string;
    dataNascimento: string;
  };
}

export interface LoginDto {
  email: string;
  senha: string;
}

export interface SignupDto {
  tipoUsuario: TipoUsuario;
  email: string;
  senha: string;
  nome: string;
  cpf: string;
  cnpj?: string; // obrigatório para ARTISTA
  genero: Genero;
  telefone: string;
  dataNascimento: string;
  tags?: string[];
  descricao?: string;
  endereco: Endereco;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  status: string;
  data: AuthTokens;
  message: string;
}

// ==================== OBRA ====================

export type CategoriaObra =
  | "PINTURA"
  | "ESCULTURA"
  | "FOTOGRAFIA"
  | "ARTESANATO"
  | "DESENHO"
  | "GRAVURA"
  | "CERAMICA"
  | "OUTRO";

export interface Artista {
  id: string;
  nome: string;
  imagemUrl?: string;
}

export interface Obra {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  imagemUrl: string;
  categoria: CategoriaObra;
  tags: string[];
  artista: Artista;
  createdAt: string;
}

export interface CreateObraDto {
  titulo: string;
  descricao: string;
  preco: number;
  categoria: CategoriaObra;
  tags?: string[];
  file: File;
}

export interface UpdateObraDto {
  titulo?: string;
  descricao?: string;
  preco?: number;
  categoria?: CategoriaObra;
  tags?: string[];
  file?: File;
}

// ==================== EVENTO ====================

export type StatusEvento = "ATIVO" | "CANCELADO" | "ENCERRADO";

export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
  dataInicio: string;
  dataFim: string;
  status: StatusEvento;
  imagemUrl?: string;
  organizador: Artista;
}

export interface CreateEventoDto {
  titulo: string;
  descricao: string;
  local: string;
  dataInicio: string;
  dataFim: string;
}

// ==================== API RESPONSE ====================

export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  status: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
  };
}
