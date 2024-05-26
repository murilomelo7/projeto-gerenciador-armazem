import prisma from "../../database/PrismaService";

class EmpresaController {
  constructor() {}

  async create(request, reply) {
    try {
      const empresa = await prisma.empresa.create({
        data: request.body,
      });
      reply.code(200).send(empresa);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;

      const data = request.body;
      const where = { id };

      const empresa = await prisma.empresa.update({ data, where });

      reply.code(200).send(empresa);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findFirst(request, reply) {
    try {
      const { id } = request.params;
      const empresa = await prisma.empresa.findFirst({ where: { id } });

      if (!empresa) {
        reply.code(404).send({
          statusCode: 404,
          error: "Not Found",
          message: "Empresa não encontrada",
        });
      }
      reply.code(200).send(empresa);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const empresas = await prisma.empresa.findMany({
        orderBy: { id: "asc" },
      });

      if (!empresas) {
        reply.code(404).send({
          statusCode: 404,
          error: "Not Found",
          message: "Nenhuma empresa encontrada",
        });
      }
      reply.code(200).send(empresas);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async delete(request, reply) {
    try {
      const { id } = request.params;
      await prisma.empresa.delete({ where: { id } });
      reply.code(200).send({
        statusCode: 200,
        message: "Empresa removida com sucesso",
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new EmpresaController();
