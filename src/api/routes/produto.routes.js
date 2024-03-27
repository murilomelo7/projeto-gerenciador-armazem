import controller from "../controllers/produto.controller";

class ProdutoRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/produto", controller.create);

    fastify.put("/produto", controller.update);

    fastify.get("/produto", controller.findAll);
  }
}

export default new ProdutoRoutes();
