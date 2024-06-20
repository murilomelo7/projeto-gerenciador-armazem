import { validateRequestBodyPresence } from './body.middleware';
import { entradaSchema, saidaSchema } from '../schema/controleProduto.schema';

class ControleProdutoMiddleware {
  constructor() {}

  async entrada(request, reply) {
    try {
      const body = await validateRequestBodyPresence(request, reply);

      entradaSchema.parse(body);
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

  async saida(request, reply) {
    try {
      const body = await validateRequestBodyPresence(request, reply);

      saidaSchema.parse(body);
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

export default new ControleProdutoMiddleware();
