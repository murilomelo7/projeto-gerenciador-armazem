import prisma from "../../database/PrismaService";

import { validateRequestBodyPresence } from "./body.middleware";
import { createSchema, updateSchema } from "../schema/empresa.schema";

class EmpresaMiddleware {
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

  async empresaExists(request, reply) {
    try {
      const { id } = request.params;

      const empresaValidation = await prisma.empresa.findFirst({
        where: { id },
      });

      if (!empresaValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Está empresa não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação da empresa",
        details: error.message,
      });
    }
  }

  async empresaIdExists(request, reply) {
    try {
      const { empresa_id } = request.query;

      const empresaValidation = await prisma.empresa.findFirst({
        where: { id: empresa_id },
      });

      if (!empresaValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Dados inválidos",
          details: "Está empresa não existe",
        });
      }
    } catch (error) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Error",
        message: "Ocorreu um erro na validação do empresa_id",
        details: error.message,
      });
    }
  }
}

export default new EmpresaMiddleware();
