import controller from '../../../controllers/fornecedor.controller';
import fornecedorMiddleware from '../../../middleware/fornecedor.middleware';
import authMiddleware from '../../../middleware/auth.middleware';

class FornecedorRoutes {
  async registerRoutes(fastify, options) {
    fastify.post('/fornecedor', {
      preHandler: [authMiddleware.authToken],
      handler: controller.create,
    });

    fastify.put('/fornecedor/:id', {
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
      preHandler: [authMiddleware.authToken, fornecedorMiddleware.create],
      handler: controller.update,
    });

    fastify.get('/fornecedor/:id', {
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
      preHandler: [authMiddleware.authToken, fornecedorMiddleware.update],
      handler: controller.findFirst,
    });

    fastify.get('/fornecedor', {
      preHandler: authMiddleware.authToken,
      handler: controller.findMany,
    });

    fastify.delete('/fornecedor/:id', {
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
      handler: controller.delete,
    });
  }
}

export default new FornecedorRoutes();
