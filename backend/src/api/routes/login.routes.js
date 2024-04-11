import controller from "../controllers/login.controller";
import middleware from "../middleware/login.middleware";

class LoginRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.post("/login", {
      preHandler: middleware.login,
      handler: controller.login,
    });
  }
}

export default new LoginRoutes();
