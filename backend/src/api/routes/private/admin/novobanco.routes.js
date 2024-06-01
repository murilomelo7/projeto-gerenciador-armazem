import controller from '../../../controllers/novobanco.controller';

class NovoBancoRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post('/novo-banco', {
      handler: controller.create,
    });
  }
}

export default new NovoBancoRoutes();
