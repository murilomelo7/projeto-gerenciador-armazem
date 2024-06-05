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

      const dataEntrada = {
        tipo: 'entrada',
        produtoFk: {
          connect: { id: request.body.produto_id },
        },
        empresaFk: {
          connect: { id: empresa_id },
        },
        fornecedorFk: {
          connect: { id: request.body.fornecedor_id },
        },

        quantidade: Number(request.body.quantidade),
      };

      await prisma.produto.update({ data: { quantidade_produto: calculoEntrada }, where });

      console.log('jnsdfjnsdjfnjsdf', empresa_id);
      console.log(dataEntrada);

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

      const { produto_id, quantidade } = request.body;

      const where = {
        id: produto_id,
        empresa_id,
      };

      const produto = await prisma.produto.findFirst({ where });

      const calculoSaida = await controleProdutoService.calcularSaida(produto.quantidade_produto, quantidade);

      if (calculoSaida < 0) {
        return reply.code(400).send({
          statusCode: 400,
          message: 'Não há estoque suficiente para esta saída',
          error: 'Sem estoque',
        });
      }

      const dataSaida = {
        tipo: 'saida',
        quantidade: calculoSaida,
        ...request.body,
      };
      const dataProduto = { ...produto, quantidade_produto: calculoSaida };
      await prisma.produto.update({ data: { quantidade_produto: calculoSaida }, where });

      const saidaRealizada = await prisma.controleProduto.create({ data: dataSaida });

      reply.code(200).send({
        statusCode: 200,
        message: 'Saída realizada com sucesso',
        data: saidaRealizada,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
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

      const where = {
        empresa_id,
      };

      const include = {
        fornecedorFk: true,
        produtoFk: true,
      };

      const controleProduto = await prisma.controleProduto.findMany({ where, include });

      console.log('sdkfmskldfsdkmf');
      console.log(controleProduto);

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
