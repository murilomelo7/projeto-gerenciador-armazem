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
      preHandler: [middleware.update, middleware.categoriaExist],
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
        querystring: {
          type: "object",
          properties: {
            empresa_id: { type: "number" },
          },
          required: ["empresa_id"],
          additionalProperties: false,
        },
      },
      handler: controller.findFirst,
    });

    fastify.get("/categoria", {
      schema: {
        querystring: {
          type: "object",
          properties: {
            empresa_id: { type: "number" },
          },
          required: ["empresa_id"],
          additionalProperties: false,
        },
      },
      handler: controller.findMany,
    });
  }
}

export default new CategoriaRoutes();
