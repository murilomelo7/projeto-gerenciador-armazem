import controller from '../../../controllers/controleProduto.controller';
import authMiddleware from '../../../middleware/auth.middleware';
import controleProdutoMiddleware from '../../../middleware/controleProduto.middleware';

class ControleProdutoRoutes {
  async registerRoutes(fastify, options) {
    fastify.post('/controle-produto/entrada', {
      preHandler: [authMiddleware.authToken, controleProdutoMiddleware.entrada],
      handler: controller.entrada,
    });

    fastify.post('/controle-produto/saida', {
      preHandler: [authMiddleware.authToken, controleProdutoMiddleware.saida],
      handler: controller.saida,
    });

    fastify.get('/controle-produto/:id', {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
          required: ['id'],
          additionalProperties: false,
        },
      },
      preHandler: [authMiddleware.authToken],
      handler: controller.findFirst,
    });

    fastify.get('/controle-produto', {
      preHandler: authMiddleware.authToken,
      handler: controller.findMany,
    });

    fastify.get('/controle-produto-app', {
      preHandler: authMiddleware.authToken,
      handler: controller.findManyApp,
    });
  }
}

export default new ControleProdutoRoutes();
