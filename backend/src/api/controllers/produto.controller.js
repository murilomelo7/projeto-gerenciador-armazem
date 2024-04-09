import prisma from "../../database/PrismaService";

class ProdutoController {
  constructor() {}

  async create(request, reply) {
    try {
      const {
        nome,
        empresa_id,
        descricao,
        categoria_id,
        quantidade_produto,
        data_validade,
      } = request.body;

      const produto = await prisma.produto.create({
        data: {
          nome,
          empresa_id,
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
        empresa_id,
        descricao,
        categoria_id,
        quantidade_produto,
        data_validade,
      } = request.body;

      const produto = await prisma.produto.update({
        data: {
          nome,
          empresa_id,
          descricao,
          categoria_id,
          quantidade_produto,
          data_validade: data_validade ? new Date(data_validade) : null,
        },
        where: {
          id,
          empresa_id,
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
      const { empresa_id } = request.query;

      const produto = await prisma.produto.findFirst({
        where: { id, empresa_id },
      });

      request.log.info(produto);
      reply.code(200).send(produto);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const { empresa_id } = request.query;

      const produtos = await prisma.produto.findMany({
        where: empresa_id,
      });

      reply.code(200).send(produtos);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async delete(request, reply) {
    try {
      const { id } = request.params;
      const { empresa_id } = request.query;

      await prisma.produto.delete({
        where: { id, empresa_id },
      });

      reply.code(200).send(produtos);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new ProdutoController();
