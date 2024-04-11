import { validateRequestBodyPresence } from "./body.middleware";
import { loginSchema } from "../schema/login.schema";

class LoginMiddleware {
  constructor() {}

  async login(request, reply) {
    try {
      const body = await validateRequestBodyPresence(request, reply);

      loginSchema.parse(body);
    } catch (error) {
      request.log.warn(error);
      return reply.code(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Dados inválidos",
        details: error.errors,
      });
    }
  }
}

export default new LoginMiddleware();
