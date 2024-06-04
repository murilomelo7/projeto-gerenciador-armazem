class FornecedorController {
  async create(request, reply) {
    try {
      const { empresa_id } = request;
      const data = { empresa_id, ...request.body };

      const fornecedor = await prisma.fornecedor.create({ data });

      reply.code(200).send({
        statusCode: 200,
        message: 'Novo fornecedor cadastrado com sucesso',
        data: fornecedor,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro no cadastro do fornecedor',
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

      const fornecedor = prisma.fornecedor.update({ data, where });

      reply.code(200).send({
        statusCode: 200,
        message: 'Categoria atualizada com sucesso',
        data: fornecedor,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na atualização do fornecedor',
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

      const fornecedor = await prisma.fornecedor.findFirst({ where });

      if (!fornecedor) {
        return reply.code(404).send({
          statusCode: 404,
          message: 'Fornecedor não encontrada',
          error: 'Not Found',
        });
      }

      reply.code(200).send(fornecedor);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca do fornecedor',
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

      const orderBy = {
        id: 'asc',
      };

      const fornecedores = await prisma.fornecedor.findMany({ where, orderBy });

      if (!fornecedores) {
        reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Fornecedores não encontradas',
        });
      }

      reply.code(200).send(fornecedores);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca dos fornecedores',
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
      await prisma.fornecedor.delete({ where });

      reply.code(200).send({
        statusCode: 200,
        message: 'Fornecedor removid0 com sucesso',
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na exclusão do fornecedor',
        error: error.message,
      });
    }
  }
}
export default new FornecedorController();
