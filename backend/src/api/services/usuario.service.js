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

  async verifyHashPassword(senha, hashedSenha) {
    try {
      const match = await bcrypt.compare(senha, hashedSenha);
      return match;
    } catch (error) {
      throw Error("Erro na verificação da senha");
    }
  }
}

export default new UsuarioService();
