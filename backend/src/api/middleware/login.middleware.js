import prisma from "../../database/PrismaService";

import { loginSchema } from "../schema/login.schema";

import { validateRequestBodyPresence } from "./body.middleware";

class LoginMiddleware {
  //? Fazer validação do body
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
