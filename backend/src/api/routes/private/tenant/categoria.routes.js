import controller from "../../../controllers/categoria.controller";
import categoriaMiddleware from "../../../middleware/categoria.middleware";
import authMiddleware from "../../../middleware/auth.middleware";

class CategoriaRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/categoria", {
      preHandler: [authMiddleware.authToken, categoriaMiddleware.create],
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
      preHandler: [
        authMiddleware.authToken,
        categoriaMiddleware.update,
        categoriaMiddleware.categoriaExists,
      ],
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
      preHandler: [authMiddleware.authToken],
      handler: controller.findFirst,
    });

    fastify.get("/categoria", {
      preHandler: authMiddleware.authToken,
      handler: controller.findMany,
    });
  }
}

export default new CategoriaRoutes();
