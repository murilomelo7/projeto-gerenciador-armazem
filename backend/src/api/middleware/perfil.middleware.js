import prisma from "../../database/PrismaService";

import { validateRequestBodyPresence } from "./body.middleware";
import { createSchema, updateSchema } from "../schema/perfil.schema";

class PerfilMiddleware {
  constructor() {}

  async create(request, reply) {
    const body = await validateRequestBodyPresence(request, reply);
    try {
      createSchema.parse(body);
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

  async update(request, reply) {
    const body = await validateRequestBodyPresence(request, reply);
    try {
      updateSchema.parse(body);
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

  async perfilExists(request, reply) {
    try {
      const { id } = request.params;

      const perfilValidation = await prisma.perfil.findFirst({
        where: { id },
      });

      if (!perfilValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Este perfil não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação do perfil",
        details: error.message,
      });
    }
  }

  async perfilIdExists(request, reply) {
    try {
      const { perfil_id } = request.body;

      const perfilValidation = await prisma.perfil.findFirst({
        where: { id: perfil_id },
      });

      if (!perfilValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Este perfil não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação do perfil_id",
        details: error.message,
      });
    }
  }
}

export default new PerfilMiddleware();
