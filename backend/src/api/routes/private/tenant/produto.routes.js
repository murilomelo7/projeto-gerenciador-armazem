import controller from '../../../controllers/produto.controller';
import produtoMiddleware from '../../../middleware/produto.middleware';
import authMiddleware from '../../../middleware/auth.middleware';

class ProdutoRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post('/produto', {
      preHandler: [authMiddleware.authToken, produtoMiddleware.create],
      handler: controller.create,
    });

    fastify.put('/produto/:id', {
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
      preHandler: [authMiddleware.authToken, produtoMiddleware.update, produtoMiddleware.produtoExists],
      handler: controller.update,
    });

    fastify.get('/produto/:id', {
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

    fastify.get('/produto', {
      preHandler: [authMiddleware.authToken],
      handler: controller.findMany,
    });

    fastify.delete('/produto/:id', {
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
      preHandler: [authMiddleware.authToken, produtoMiddleware.produtoExists],
      handler: controller.delete,
    });
  }
}

export default new ProdutoRoutes();
