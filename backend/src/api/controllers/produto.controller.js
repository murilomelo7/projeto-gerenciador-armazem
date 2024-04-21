import prisma from "../../database/PrismaService";

class ProdutoController {
  constructor() {}

  async create(request, reply) {
    try {
      const empresa_id = request.empresa_id;

      const data_validade = request.body.data_validade
        ? new Date(data_validade)
        : null;

      const data = { ...request.body, data_validade, empresa_id };

      const produto = await prisma.produto.create({ data });

      reply.code(200).send(produto);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;
      const { empresa_id } = request.empresa_id;

      const data_validade = request.body.data_validade
        ? new Date(data_validade)
        : null;

      request.body = { ...request.body, data_validade };

      const where = {
        id,
        empresa_id,
      };

      const produto = await prisma.produto.update({
        data: request.body,
        where,
      });

      reply.code(200).send(produto);
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

      const produto = await prisma.produto.findFirst({ where });

      reply.code(200).send(produto);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const { empresa_id } = request.empresa_id;

      const where = {
        empresa_id,
      };

      const produtos = await prisma.produto.findMany({ where });

      reply.code(200).send(produtos);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async delete(request, reply) {
    try {
      const { id } = request.params;
      const { empresa_id } = request.empresa_id;

      const where = {
        id,
        empresa_id,
      };

      await prisma.produto.delete({ where });

      reply.code(200).send(produtos);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new ProdutoController();
