import prisma from "../../database/PrismaService";

class CategoriaController {
  constructor() {}

  async create(request, reply) {
    try {
      const categoria = await prisma.categoria.create({
        data: request.body,
      });
      reply.code(201).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;
      const { empresa_id } = request.empresa_id;

      const where = {
        id,
        empresa_id,
      };

      const categoria = await prisma.categoria.update({
        data: request.body,
        where,
      });

      reply.code(200).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findFirst(request, reply) {
    try {
      const { id } = request.params;

      const { empresa_id } = request.empresa_id;

      const where = {
        id,
        empresa_id,
      };

      const categoria = await prisma.categoria.findFirst({
        where,
      });

      reply.code(200).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const queryParams = request.query;

      const { empresa_id } = request.empresa_id;

      const where = {
        empresa_id,
      };

      // Filtro params por id
      queryParams.id ? (where.id = queryParams.id) : undefined;

      const categorias = await prisma.categoria.findMany({ where });

      reply.code(200).send(categorias);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new CategoriaController();
