import prisma from '../../database/PrismaService';

class CategoriaController {
  constructor() {}

  async create(request, reply) {
    try {
      const data = { empresa_id: request.empresa_id, ...request.body };
      const categoria = await prisma.categoria.create({ data });
      reply.code(201).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;
      const { empresa_id } = request;

      const where = {
        id,
        empresa_id,
      };
      const data = request.body;

      const categoria = await prisma.categoria.update({ data, where });

      reply.code(200).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findFirst(request, reply) {
    try {
      const { id } = request.params;

      const { empresa_id } = request;

      const where = {
        id,
        empresa_id,
      };

      const categoria = await prisma.categoria.findFirst({ where });

      if (!categoria) {
        reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Categoria não encontrada',
        });
      }

      reply.code(200).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const queryParams = request.query;

      const { empresa_id } = request;

      const where = {
        empresa_id,
      };

      // Filtro params por id
      queryParams.id ? (where.id = queryParams.id) : undefined;

      const orderBy = {
        codigo: 'asc',
      };
      const categorias = await prisma.categoria.findMany({ where, orderBy });

      if (!categorias) {
        reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Categorias não encontradas',
        });
      }

      reply.code(200).send(categorias);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
  async delete(request, reply) {
    try {
      const { id } = request.params;

      const { empresa_id } = request;

      const where = {
        id,
        empresa_id,
      };
      await prisma.categoria.delete({ where });
      reply.code(200).send({
        statusCode: 200,
        message: 'Categoria removida com sucesso',
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new CategoriaController();
