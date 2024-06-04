import { validateRequestBodyPresence } from './body.middleware';
import { createSchema, updateSchema } from '../schema/fornecedor.schema';

class FornecedorMiddleware {
  constructor() {}

  async create(request, reply) {
    try {
      const body = await validateRequestBodyPresence(request, reply);

      createSchema.parse(body);
    } catch (error) {
      request.log.warn(error);
      return reply.code(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Dados inválidos',
        details: error.errors,
      });
    }
  }

  async update(request, reply) {
    try {
      const body = await validateRequestBodyPresence(request, reply);

      updateSchema.parse(body);
    } catch (error) {
      request.log.warn(error);
      return reply.code(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Dados inválidos',
        details: error.errors,
      });
    }
  }
}

export default new FornecedorMiddleware();
