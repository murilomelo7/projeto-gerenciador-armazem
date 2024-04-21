import controller from "../controllers/empresa.controller";
import middleware from "../middleware/empresa.middleware";

class EmpresaRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/empresa", {
      preHandler: middleware.create,
      handler: controller.create,
    });

    fastify.put("/empresa/:id", {
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
      preHandler: [middleware.empresaExists, middleware.update],
      handler: controller.update,
    });

    fastify.get("/empresa/:id", {
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
      preHandler: [middleware.empresaExists],
      handler: controller.findFirst,
    });

    fastify.get("/empresa", {
      handler: controller.findMany,
    });

    fastify.delete("/empresa/:id", {
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
      preHandler: [middleware.empresaExists],
      handler: controller.delete,
    });
  }
}

export default new EmpresaRoutes();
