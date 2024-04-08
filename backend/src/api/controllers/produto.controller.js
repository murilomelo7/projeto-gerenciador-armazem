import prisma from "../../database/PrismaService";

class ProdutoController {
  constructor() {}

  async create(request, reply) {
    try {
      const {
        nome,
        descricao,
        categoria_id,
        quantidade_produto,
        data_validade,
      } = request.body;

      const produto = await prisma.produto.create({
        data: {
          nome,
          descricao,
          categoria_id,
          quantidade_produto,
          data_validade: data_validade ? new Date(data_validade) : null,
        },
      });

      request.log.info(produto);
      reply.code(200).send(produto);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;

      const {
        nome,
        descricao,
        categoria_id,
        quantidade_produto,
        data_validade,
      } = request.body;

      const produto = await prisma.produto.update({
        data: {
          nome,
          descricao,
          categoria_id,
          quantidade_produto,
          data_validade: data_validade ? new Date(data_validade) : null,
        },
        where: {
          id,
        },
      });

      request.log.info(produto);
      reply.code(200).send(produto);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findFirst(request, reply) {
    try {
      const { id } = request.params;

      const produto = await prisma.produto.findFirst({ where: { id } });

      request.log.info(produto);
      reply.code(200).send(produto);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const produtos = await prisma.produto.findMany();

      reply.code(200).send(produtos);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new ProdutoController();
