import controller from "../controllers/usuario.controller";
import { create } from "../middleware/usuario.middleware";

class UsuarioRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/usuario", { preHandler: create }, controller.create);

    fastify.put("/usuario", controller.update);

    fastify.get("/usuario", controller.findAll);
  }
}

export default new UsuarioRoutes();
