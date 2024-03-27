import controller from '../controllers/empresa.controller';

class EmpresaRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post('/empresa', controller.postEmpresas);

    fastify.put('/empresa', controller.putEmpresas);

    fastify.get('/empresa', controller.getEmpresas);
  }
}

export default new EmpresaRoutes();
