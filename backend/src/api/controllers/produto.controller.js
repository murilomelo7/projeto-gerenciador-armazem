import prisma from '../../database/PrismaService';
import produtoService from '../services/produto.service';

class ProdutoController {
  constructor() {}

  async create(request, reply) {
    try {
      const { empresa_id } = request;

      const data_validade = request.body.data_validade ? new Date(data_validade) : null;
      const quantidade_produto = Number(request.body.quantidade_produto);
      const data = { ...request.body, data_validade, empresa_id, quantidade_produto };

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
      const { empresa_id } = request;

      const data_validade = request.body.data_validade ? new Date(data_validade) : null;
      const quantidade_produto = Number(request.body.quantidade_produto);

      request.body = { ...request.body, data_validade, quantidade_produto };

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
      const { empresa_id } = request;

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
      const { empresa_id } = request;

      const where = {
        empresa_id,
      };

      const include = {
        categoriaFk: true,
      };
      const orderBy = {
        codigo: 'asc',
      };

      const produtos = await prisma.produto.findMany({ where, include, orderBy });

      reply.code(200).send(produtos);
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

      await prisma.produto.delete({ where });

      reply.code(200).send();
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async entrada(request, reply) {
    try {
      const { empresa_id } = request;

      const { produto_id, quantidade } = request.body;

      const where = {
        id: produto_id,
        empresa_id,
      };

      const produto = await prisma.produto.findFirst(where);

      const calculoEntrada = await produtoService.calcularEntrada(produto.quantidade_produto, quantidade);

      if (calculoEntrada < 0) {
        return reply.code(400).send({
          statusCode: 400,
          message: 'Não há estoque suficiente para esta entrada',
        });
      }

      const dataEntrada = {
        tipo: 'entrada',
        quantidade: calculoEntrada,
        ...request.body,
      };
      const dataProduto = { quantidade_produto: calculoEntrada, ...produto };
      await prisma.produto.update({ data: dataProduto, where });

      const entradaRealizada = prisma.controleProduto.create({ data: dataEntrada });

      reply.code(200).send(entradaRealizada);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async saida(request, reply) {
    try {
      const { empresa_id } = request;

      const { produto_id, quantidade } = request.body;

      const where = {
        id: produto_id,
        empresa_id,
      };

      const produto = await prisma.produto.findFirst(where);

      const calculoSaida = await produtoService.calcularSaida(produto.quantidade_produto, quantidade);

      if (calculoSaida < 0) {
        return reply.code(400).send({
          statusCode: 400,
          message: 'Não há estoque suficiente para esta saída',
        });
      }

      const dataSaida = {
        tipo: 'saida',
        quantidade: calculoSaida,
        ...request.body,
      };
      const dataProduto = { quantidade_produto: calculoSaida, ...produto };
      await prisma.produto.update({ data: dataProduto, where });

      const saidaRealizada = prisma.controleProduto.create({ data: dataSaida });

      reply.code(200).send(saidaRealizada);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new ProdutoController();
