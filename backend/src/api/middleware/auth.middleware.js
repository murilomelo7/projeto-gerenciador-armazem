import prisma from "../../database/PrismaService";

import EmpresaMiddleware from "../middleware/empresa.middleware";

class AuthMiddleware {
  constructor() {}

  async authToken(request, reply) {
    try {
      if (!request.headers.token) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Token não informado",
        });
      }

      await EmpresaMiddleware.empresaIdExists(request, reply);

      const { token } = request.headers;

      const tokenValidation = prisma.usuario.findFirst({
        where: { token },
      });

      if (!tokenValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Token não encontrado",
        });
      }

      request.empresa_id = tokenValidation.empresa_id;
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new AuthMiddleware();
