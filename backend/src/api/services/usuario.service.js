import bcrypt from "bcrypt";
import prisma from "../../database/PrismaService";

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

  async createUsuarioEmpresa(dados) {
    try {
      const senha = "admin";

      const hashedSenha = await this.hashPassword(senha);

      const data = { senha: hashedSenha, ...dados };

      const usuario = prisma.usuario.create({ data });

      return usuario;
    } catch (error) {
      throw Error("Erro na criação de usuário no cadastro da empresa");
    }
  }
}

export default new UsuarioService();
