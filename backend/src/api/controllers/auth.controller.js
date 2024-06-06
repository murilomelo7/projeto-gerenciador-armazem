import prisma from '../../database/PrismaService';

class AuthController {
  constructor() {}

  async testToken(request, reply) {
    try {
      if (!request.headers.token) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Token não informado',
        });
      }

      const { token } = request.headers;

      const tokenValidation = await prisma.usuario.findFirst({
        where: { token },
        include: {
          perfilFk: true,
        },
      });

      if (!tokenValidation) {
        return reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Token não encontrado',
        });
      }

      const { acessos } = tokenValidation.perfilFk;

      reply.code(200).send({ token, acessos });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async cleanToken(request, reply) {
    try {
      if (!request.headers.token) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Token não informado',
        });
      }
      const { token } = request.headers;

      const usuario = await prisma.usuario.findFirst({ where: { token } });

      await prisma.usuario.update({
        data: { token: null },
        where: { id: usuario.id },
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new AuthController();
