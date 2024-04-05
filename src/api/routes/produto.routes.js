import controller from "../controllers/produto.controller";
import middleware from "../middleware/produto.middleware";

class ProdutoRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/produto", {
      preHandler: middleware.create,
      handler: controller.create,
    });

    fastify.put("/produto/:id", {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
          additionalProperties: false,
        },
      },
      preHandler: [middleware.update, middleware.categoriaExist],
      handler: controller.update,
    });
    
    fastify.get("/produto/:id", {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
          additionalProperties: false,
        },
      },
      handler: controller.findFirst,
    });

    fastify.get("/produto", controller.findMany);
  }
}

export default new ProdutoRoutes();
