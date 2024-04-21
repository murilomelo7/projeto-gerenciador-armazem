import prisma from "../../database/PrismaService";

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

      const { token } = request.headers;

      const tokenValidation = await prisma.usuario.findFirst({
        where: { token },
      });

      if (!tokenValidation) {
        reply.code(404).send({
          statusCode: 404,
          error: "Not Found",
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
