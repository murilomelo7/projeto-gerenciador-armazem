import prisma from "../../database/PrismaService";

import { validateRequestBodyPresence } from "./body.middleware";
import { createSchema, updateSchema } from "../schema/usuario.schema";

class UsuarioMiddleware {
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

  async usuarioExists(request, reply) {
    try {
      const { id } = request.params;

      const usuarioValidation = await prisma.usuario.findFirst({
        where: { id },
      });

      if (!usuarioValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Este usuario não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação do usuario",
        details: error.message,
      });
    }
  }

  async usuarioIdExists(request, reply) {
    try {
      const { usuario_id } = request.body;

      const usuarioValidation = await prisma.usuario.findFirst({
        where: { id: usuario_id },
      });

      if (!usuarioValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Este usuario não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação do usuario_id",
        details: error.message,
      });
    }
  }
}

export default new UsuarioMiddleware();
