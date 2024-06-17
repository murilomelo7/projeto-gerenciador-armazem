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

      reply.code(200).send({
        statusCode: 200,
        message: 'Novo produto cadastrado com sucesso',
        data: produto,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro no cadastro do produto',
        error: error.message,
      });
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;
      const { empresa_id } = request;

      const data_validade = request.body.data_validade ? new Date(data_validade) : null;
      const quantidade_produto = Number(request.body.quantidade_produto);

      const data = { ...request.body, data_validade, quantidade_produto };

      const where = {
        id,
        empresa_id,
      };

      const produto = await prisma.produto.update({
        data,
        where,
      });

      reply.code(200).send({
        statusCode: 200,
        message: 'Produto atualizado com sucesso',
        data: produto,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na atualização do produto',
        error: error.message,
      });
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

      if (!produto) {
        return reply.code(404).send({
          statusCode: 404,
          message: 'Produto não encontrado',
          error: 'Not Found',
        });
      }

      reply.code(200).send(produto);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca do produto',
        error: error.message,
      });
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
        nome: 'asc',
      };

      const produtos = await prisma.produto.findMany({ where, include, orderBy });

      if (!produtos) {
        return reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Produtos não encontrados',
        });
      }

      reply.code(200).send(produtos);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca dos produtos',
        error: error.message,
      });
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

      const controleProdutoValidation = await prisma.controleProduto.findFirst({
        where: { produto_id: id, empresa_id },
      });

      if (controleProdutoValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Vínculado',
          message: 'O produto está vínculado a um uma entrada ou saída',
        });
      }

      await prisma.produto.delete({ where });

      reply.code(200).send({
        statusCode: 200,
        message: 'Produto removido com sucesso',
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na exclusão do produto',
        error: error.message,
      });
    }
  }
}

export default new ProdutoController();
