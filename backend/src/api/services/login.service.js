import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import prisma from '../../database/PrismaService';

class LoginService {
  async verifyHashPassword(senha, hashedSenha) {
    try {
      const match = await bcrypt.compare(senha, hashedSenha);
      return match;
    } catch (error) {
      throw new Error({ message: 'Erro na verificação da senha', error });
    }
  }

  async generateToken(payload) {
    try {
      const privateKey = 'privateKey';
      const token = jwt.sign(payload, privateKey);
      return token;
    } catch (error) {
      throw new Error({ message: 'Erro na geração do token', error });
    }
  }
}

export default new LoginService();
