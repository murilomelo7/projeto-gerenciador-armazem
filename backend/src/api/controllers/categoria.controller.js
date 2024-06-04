import prisma from '../../database/PrismaService';

class CategoriaController {
  constructor() {}

  async create(request, reply) {
    try {
      const data = { empresa_id: request.empresa_id, ...request.body };

      const categoria = await prisma.categoria.create({ data });

      reply.code(200).send({
        statusCode: 200,
        message: 'Nova categoria cadastrada com sucesso',
        data: categoria,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro no cadastro da categoria',
        error: error.message,
      });
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

      reply.code(200).send({
        statusCode: 200,
        message: 'Categoria atualizada com sucesso',
        data: categoria,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na atualização da categoria',
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

      const categoria = await prisma.categoria.findFirst({ where });

      if (!categoria) {
        return reply.code(404).send({
          statusCode: 404,
          message: 'Categoria não encontrada',
          error: 'Not Found',
        });
      }

      reply.code(200).send(categoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca da categoria',
        error: error.message,
      });
    }
  }

  async findMany(request, reply) {
    try {
      const queryParams = request.query;

      const { empresa_id } = request;

      const where = {
        empresa_id,
      };

      queryParams.id ? (where.id = queryParams.id) : undefined;

      const orderBy = {
        nome: 'asc',
      };

      const categorias = await prisma.categoria.findMany({ where, orderBy });

      if (!categorias) {
        return reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Categorias não encontradas',
        });
      }

      reply.code(200).send(categorias);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca das categorias',
        error: error.message,
      });
    }
  }
  async delete(request, reply) {
    try {
      const { id } = request.params;

      const { empresa_id } = request;

      const categoriaProdutoValidation = await prisma.produto.findFirst({ where: { categoria_id: id, empresa_id } });

      if (categoriaProdutoValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Vínculado',
          message: 'Está categoria está vínculado a um produto',
        });
      }

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
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na exclusão da categoria',
        error: error.message,
      });
    }
  }
}

export default new CategoriaController();
