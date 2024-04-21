import prisma from "../../database/PrismaService";

class PerfilController {
  constructor() {}

  async create(request, reply) {
    try {
      const perfil = await prisma.perfil.create({
        data: request.body,
      });
      reply.code(201).send(perfil);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;

      const perfil = await prisma.perfil.update({
        data: request.body,
        where: { id },
      });

      reply.code(200).send(perfil);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findFirst(request, reply) {
    try {
      const { id } = request.params;

      const perfil = await prisma.perfil.findFirst({
        where: { id },
      });

      if (!perfil) {
        reply.code(404).send({
          statusCode: 404,
          error: "Not Found",
          message: "Nenhum perfil encontrado",
        });
      }

      reply.code(200).send(perfil);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const perfis = await prisma.perfil.findMany({
        orderBy: {
          id: "asc",
        },
      });

      if (!perfis) {
        reply.code(404).send({
          statusCode: 404,
          error: "Not Found",
          message: "Nenhum perfil encontrado",
        });
      }

      reply.code(200).send(perfis);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async delete(request, reply) {
    try {
      const { id } = request.params;

      await prisma.perfil.delete({ where: { id } });

      reply.code(200).send({
        statusCode: 200,
        message: "Perfil removido com sucesso",
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new PerfilController();
