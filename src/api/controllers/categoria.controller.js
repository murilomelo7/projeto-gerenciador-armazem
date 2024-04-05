import prisma from "../../database/PrismaService";
class CategoriaController {
  constructor() {}

  async create(request, reply) {
    try {
      const { nome, descricao } = request.body;

      const dados = {
        nome,
        descricao,
      };

      const categoria = await prisma.categoria.create({
        data: dados,
      });

      request.log.info(categoria);
      reply.code(200).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;
      const { nome, descricao } = request.body;
      const data = { nome, descricao };

      const categoria = await prisma.categoria.update({
        data,
        where: {
          id,
        },
      });

      request.log.info(categoria);
      reply.code(200).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findFirstCategoria(request, reply) {
    try {
      const { id } = request.params;

      const categoria = await prisma.categoria.findFirst({
        where: {
          id,
        },
      });

      request.log.info(categoria);
      reply.code(200).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findManyCategorias(request, reply) {
    try {
      const queryParams = request.query;

      const where = {};

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
