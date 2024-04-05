import controller from "../controllers/categoria.controller";
import middleware from "../middleware/categoria.middleware";

class CategoriaRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/categoria", {
      preHandler: middleware.create,
      handler: controller.create,
    });

    fastify.put("/categoria/:id", {
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
      preHandler: [middleware.categoriaExist, middleware.update],
      handler: controller.update,
    });

    fastify.get("/categoria/:id", {
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
      handler: controller.findFirstCategoria,
    });

    fastify.get("/categoria", {
      schema: {
        querystring: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          // required: ["id"],
          additionalProperties: false,
        },
      },
      handler: controller.findManyCategorias,
    });
  }
}

export default new CategoriaRoutes();
