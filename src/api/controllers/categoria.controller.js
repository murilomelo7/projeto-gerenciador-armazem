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

      const novaCategoria = await prisma.categoria.create({
        data: dados,
      });

      request.log.info(novaCategoria);
      reply.code(200).send(novaCategoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
    } catch (error) {}
  }

  async findAll(request, reply) {
    try {
      const queryParams = request.query;

      const where = {};

      queryParams.id ? (where.id = queryParams.id) : undefined;

      const dados = await prisma.categoria.findMany({ where });

      reply.code(200).send(dados);
    } catch (error) {
      request.log.error(error);
      reply.codd(500).send(error);
    }
  }
}

export default new CategoriaController();
