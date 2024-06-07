import prisma from '../../database/PrismaService';
import controleProdutoService from '../services/controleProduto.service';

class ControleProdutoController {
  async entrada(request, reply) {
    try {
      const { empresa_id } = request;

      const produto_id = request.body.produto_id;

      const where = { id: produto_id, empresa_id };
      const produto = await prisma.produto.findFirst({ where });

      if (!produto) {
        return reply.code(404).send({
          statusCode: 404,
          message: 'Produto não encontrado',
          error: 'Produto não encontrado',
        });
      }

      const calculoEntrada = await controleProdutoService.calcularEntrada(
        produto.quantidade_produto,
        request.body.quantidade
      );

      if (calculoEntrada < 0) {
        return reply.code(400).send({
          statusCode: 400,
          message: 'Não há estoque suficiente para esta entrada',
          error: 'Sem estoque',
        });
      }

      await prisma.produto.update({ data: { quantidade_produto: calculoEntrada }, where });

      const quantidade = Number(request.body.quantidade);
      const valor_unidade = Number(request.body.valor_unidade);
      const valor_total = Number(request.body.valor_total);

      const dataEntrada = { ...request.body, empresa_id, quantidade, valor_unidade, valor_total };
      const entradaRealizada = await prisma.controleProduto.create({ data: dataEntrada });

      return reply.code(200).send({
        statusCode: 200,
        message: 'Entrada realizada com sucesso',
        data: entradaRealizada,
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na entrada do produto',
        error: error.message,
      });
    }
  }

  async saida(request, reply) {
    try {
      const { empresa_id } = request;

      const produto_id = request.body.produto_id;

      const where = { id: produto_id, empresa_id };
      const produto = await prisma.produto.findFirst({ where });

      if (!produto) {
        return reply.code(404).send({
          statusCode: 404,
          message: 'Produto não encontrado',
          error: 'Produto não encontrado',
        });
      }

      const calculoSaida = await controleProdutoService.calcularSaida(
        produto.quantidade_produto,
        request.body.quantidade
      );

      if (calculoSaida < 0) {
        return reply.code(400).send({
          statusCode: 400,
          message: 'Não há estoque suficiente para esta saída',
          error: 'Sem estoque',
        });
      }

      await prisma.produto.update({ data: { quantidade_produto: calculoSaida }, where });

      const quantidade = Number(request.body.quantidade);
      const dataSaida = { ...request.body, empresa_id, quantidade };
      const saidaRealizada = await prisma.controleProduto.create({ data: dataSaida });

      return reply.code(200).send({
        statusCode: 200,
        message: 'Saída realizada com sucesso',
        data: saidaRealizada,
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na saída do produto',
        error: error.message,
      });
    }
  }

  async findFirst(request, reply) {
    try {
      const { empresa_id } = request;

      const where = {
        empresa_id,
      };

      const include = {
        produtoFk: true,
      };

      const controleProduto = await prisma.controleProduto.findFirst({ where, include });

      reply.code(200).send(controleProduto);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca dos controles produtos',
        error: error.message,
      });
    }
  }

  async findMany(request, reply) {
    try {
      const { empresa_id } = request;

      let { tipo, produto_id, fornecedor_id, createdAt, limit } = request.query;

      produto_id ? (produto_id = Number(produto_id)) : undefined;
      fornecedor_id ? (fornecedor_id = Number(fornecedor_id)) : undefined;
      limit ? (limit = Number(limit)) : undefined;

      const where = {
        empresa_id,
        tipo,
        produto_id,
        fornecedor_id,
        // createdAt,
      };

      const include = {
        fornecedorFk: true,
        produtoFk: true,
      };

      const orderBy = {
        createdAt: 'desc',
      };

      const controleProduto = await prisma.controleProduto.findMany({ where, include, orderBy, take: limit });

      reply.code(200).send(controleProduto);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca dos controles produtos',
        error: error.message,
      });
    }
  }
}
export default new ControleProdutoController();
