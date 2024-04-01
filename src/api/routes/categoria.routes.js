import controller from "../controllers/categoria.controller";

import { create } from "../middleware/categoria.middleware";

class CategoriaRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/categoria", { preHandler: create }, controller.create);

    fastify.put("/categoria", controller.update);

    fastify.get("/categoria", controller.findAll);
  }
}

export default new CategoriaRoutes();
