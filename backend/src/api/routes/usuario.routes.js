import controller from "../controllers/usuario.controller";
import middlewareUsuario from "../middleware/usuario.middleware";
import middlewareEmpresa from "../middleware/empresa.middleware";
import empresaMiddleware from "../middleware/empresa.middleware";

class UsuarioRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/usuario", {
      preHandler: [middlewareUsuario.create, middlewareEmpresa.empresaIdExists],
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
      preHandler: [middlewareUsuario.update],
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
        querystring: {
          type: "object",
          properties: {
            empresa_id: { type: "number" },
          },
          required: ["empresa_id"],
          additionalProperties: false,
        },
      },
      preHandler: [middlewareEmpresa.empresaIdExists],
      handler: controller.findFirst,
    });

    fastify.get("/usuario", {
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
      preHandler: [empresaMiddleware.empresaIdExists],
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
        querystring: {
          type: "object",
          properties: {
            empresa_id: { type: "number" },
          },
          required: ["empresa_id"],
          additionalProperties: false,
        },
      },
      preHandler: [
        middlewareUsuario.usuarioExists,
        middlewareEmpresa.empresaIdExists,
      ],
      handler: controller.delete,
    });
  }
}

export default new UsuarioRoutes();
