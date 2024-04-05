import prisma from "../../database/PrismaService";

import { validateRequestBodyPresence } from "./body.middleware";
import { createSchema, updateSchema } from "../schema/produto.schema";

class ProdutoMiddleware {
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

  async categoriaExist(request, reply) {
    const { categoria_id } = request.body;

    try {
      const categoriaValidation = await prisma.categoria.findFirst({
        where: { categoria_id },
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
        message: "Ocorreu um erro na validação das categorias",
        details: error.message,
      });
    }
  }
}

export default new ProdutoMiddleware();
