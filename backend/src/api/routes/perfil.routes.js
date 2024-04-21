import controller from "../controllers/perfil.controller";
import middleware from "../middleware/perfil.middleware";

class PerfilRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/perfil", {
      preHandler: middleware.create,
      handler: controller.create,
    });

    fastify.put("/perfil/:id", {
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
      preHandler: [middleware.update, middleware.perfilExists],
      handler: controller.update,
    });

    fastify.get("/perfil/:id", {
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

    fastify.get("/perfil", {
      handler: controller.findMany,
    });

    fastify.delete("/perfil/:id", {
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
      preHandler: [middleware.perfilExists],
      handler: controller.delete,
    });
  }
}

export default new PerfilRoutes();
