import prisma from "../../database/PrismaService";

import LoginService from "../services/login.service";

class LoginController {
  constructor() {}

  async login(request, reply) {
    try {
      const { usuario, senha } = request.body;

      const usuarioValidation = await prisma.usuario.findFirst({
        where: { usuario },
      });

      if (!usuarioValidation) {
        reply.code(404).send({
          statusCode: 404,
          error: "Not Found",
          message: "Usuário não encontrado",
        });
      }

      const hashedPassword = usuarioValidation.senha;

      const senhaValidation = await LoginService.verifyHashPassword(
        senha,
        hashedPassword
      );

      if (!senhaValidation) {
        reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Senha incorreta",
        });
      }

      const payload = `${usuario}${senha}`;
      const token = await LoginService.generateToken(payload);

      const { id } = usuarioValidation;

      await prisma.usuario.update({
        data: { token },
        where: { id },
      });

      reply.code(200).send({
        statusCode: 200,
        message: "Usuário logado",
        token,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  //   async cleanToken(request, reply) {
  //     try {
  //       const { token } = request.body;

  //       await prisma.usuario.update({
  //         data: { token: "" },
  //         where: { token },
  //       });
  //     } catch (error) {
  //       request.log.error(error);
  //       reply.code(500).send(error);
  //     }
  //   }
}

export default new LoginController();
