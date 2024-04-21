import controller from "../../../controllers/usuario.controller";
import usuarioMiddleware from "../../../middleware/usuario.middleware";
import empresaMiddleware from "../../../middleware/empresa.middleware";
import authMiddleware from "../../../middleware/auth.middleware";

class UsuarioRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/usuario", {
      preHandler: [usuarioMiddleware.create, empresaMiddleware.empresaIdExists],
      handler: controller.create,
    });

    fastify.put("/usuario/:id", {
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
      preHandler: [usuarioMiddleware.update],
      handler: controller.update,
    });

    fastify.get("/usuario/:id", {
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
      preHandler: [empresaMiddleware.empresaIdExists],
      handler: controller.findFirst,
    });

    fastify.get("/usuario", {
      // preHandler: [empresaMiddleware.empresaIdExists],
      handler: controller.findMany,
    });

    fastify.delete("/usuario/:id", {
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
        usuarioMiddleware.usuarioExists,
        // empresaMiddleware.empresaIdExists,
      ],
      handler: controller.delete,
    });
  }
}

export default new UsuarioRoutes();
