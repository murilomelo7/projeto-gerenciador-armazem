import controller from "../../controllers/auth.controller";
import middleware from "../../middleware/auth.middleware";

class AuthRoutes {
  constructor() {}

  async registerRoutes(fastify, options) {
    fastify.get("/test-token", {
      handler: controller.testToken,
    });
    fastify.put("/clean-token", {
      handler: controller.cleanToken,
    });
  }
}

export default new AuthRoutes();
