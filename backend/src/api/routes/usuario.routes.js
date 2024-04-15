import controller from "../controllers/usuario.controller";
import middlewareUsuario from "../middleware/usuario.middleware";
import middlewareEmpresa from "../middleware/empresa.middleware";

class UsuarioRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/usuario", {
      preHandler: middlewareUsuario.create,
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

    // fastify.get("/usuario");
  }
}

export default new UsuarioRoutes();
