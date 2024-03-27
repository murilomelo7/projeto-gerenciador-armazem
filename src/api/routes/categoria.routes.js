import controller from '../controllers/categoria.controller';

class CategoriaRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post('/categoria', controller.create);

    fastify.put('/categoria', controller.update);

    fastify.get('/categoria', controller.findAll);
  }
}

export default new CategoriaRoutes();
