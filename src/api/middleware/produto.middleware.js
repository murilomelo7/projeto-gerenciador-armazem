import { validateRequestBodyPresence } from "./body.middleware";
import { createSchema, updateSchema } from "../schema/produto.schema";

export const create = async (request, reply) => {
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
};

export const update = async (request, reply) => {
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
};

