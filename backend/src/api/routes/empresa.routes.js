import controller from "../controllers/empresa.controller";

class EmpresaRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/empresa", controller.create);

    fastify.put("/empresa", controller.update);

    fastify.get("/empresa",controller.findAll);
  }
}

export default new EmpresaRoutes();
