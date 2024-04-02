import controller from "../controllers/categoria.controller";

import { create } from "../middleware/categoria.middleware";

class CategoriaRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/categoria", { preHandler: create }, controller.create);

    fastify.put("/categoria", {
      schema: {
        querystring: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
          additionalProperties: false,
        },
      },
      handler: controller.update,
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
      handler: controller.findAll,
    });
  }
}

export default new CategoriaRoutes();
