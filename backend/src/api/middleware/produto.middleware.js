import prisma from "../../database/PrismaService";

import { validateRequestBodyPresence } from "./body.middleware";
import { createSchema, updateSchema, entradaSchema, saidaSchema } from "../schema/produto.schema";

class ProdutoMiddleware {
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

  async entrada(request, reply){
    try {
      const body = await validateRequestBodyPresence(request, reply);
      await entradaSchema.validate(body);
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

  async saida(request, reply){
    try {
      const body = await validateRequestBodyPresence(request, reply);
      await saidaSchema.validate(body);
    } catch (error) {
      return reply.code(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Dados inválidos",
        details: error.errors,
      });
    }
  }

  async produtoExists(request, reply) {
    try {
      const { id } = request.params;

      const perfilValidation = await prisma.produto.findFirst({
        where: { id },
      });

      if (!perfilValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Este produto não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação do produto",
        details: error.message,
      });
    }
  }

  async produtoIdExists(request, reply) {
    try {
      const { produto_id } = request.body;

      const produtoValidation = await prisma.produto.findFirst({
        where: { id: produto_id },
      });

      if (!produtoValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Este produto não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação do produto_id",
        details: error.message,
      });
    }
  }

}

export default new ProdutoMiddleware();
