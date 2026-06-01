export const MOCK_USUARIOS = {
  CLIENTE: {
    tipoUsuario: "CLIENTE" as const,
    nome: "Maria do Socorro Alencar",
    email: "maria.socorro@exemplo.com",
    cpf: "123.456.789-00",
    // Cliente não precisa de CNPJ
  },
  ARTISTA: {
    tipoUsuario: "ARTISTA" as const,
    nome: "Chico das Carrancas",
    email: "chico.artesao@exemplo.com",
    cpf: "987.654.321-11",
    cnpj: "12.345.678/0001-99", // Obrigatório no seu form
  },
  GALERIA: {
    tipoUsuario: "GALERIA" as const,
    nome: "Galeria Raízes do Sertão Ltda",
    email: "contato@raizesdosertao.com",
    cpf: "456.789.123-22", // CPF do responsável
    cnpj: "98.765.432/0001-88", // Obrigatório no seu form
  },
};

export const MOCK_USUARIOS_LIST = Object.values(MOCK_USUARIOS);
