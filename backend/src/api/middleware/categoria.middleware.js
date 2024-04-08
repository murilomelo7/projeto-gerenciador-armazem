import { validateRequestBodyPresence } from "./body.middleware";
import { createSchema, updateSchema } from "../schema/categoria.schema";
import prisma from "../../database/PrismaService";

class CategoriaMiddleware {
  constructor() {}

  async create(request, reply) {
    try {
      const body = await validateRequestBodyPresence(request, reply);

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
    try {
      const body = await validateRequestBodyPresence(request, reply);

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

  async categoriaExists(request, reply) {
    try {
      const { id } = request.params;

      const categoriaValidation = await prisma.categoria.findFirst({
        where: { id },
      });

      if (!categoriaValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Está categoria não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação da categoria",
        details: error.message,
      });
    }
  }

  async categoriaIdExists(request, reply) {
    const { categoria_id } = request.body;

    try {
      const categoriaValidation = await prisma.categoria.findFirst({
        where: { id: categoria_id },
      });

      if (!categoriaValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Está categoria não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação da categoria_id",
        details: error.message,
      });
    }
  }
}

export default new CategoriaMiddleware();
