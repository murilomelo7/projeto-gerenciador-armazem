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
      preHandler: [middleware.update],
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
      handler: controller.findFirst,
    });

    fastify.get("/empresa", {
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
      handler: controller.findMany,
    });
  }
}

export default new EmpresaRoutes();
