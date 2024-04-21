import bcrypt from "bcrypt";

class UsuarioService {
  constructor() {}

  async hashPassword(senha) {
    try {
      const hash = await bcrypt.hash(senha, 10);
      return hash;
    } catch (error) {
      throw Error("Erro na geração do hash da senha");
    }
  }
}

export default new UsuarioService();
