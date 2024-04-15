import controller from "../controllers/perfil.controller";

class PerfilRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/perfil", controller.create);

    fastify.put("/perfil", controller.update);

    // fastify.get("/perfil", controller.findAll);
  }
}

export default new PerfilRoutes();
