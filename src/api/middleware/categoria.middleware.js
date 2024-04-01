import { createSchema } from "../schema/categoria.schema";

export const create = async (request, reply) => {
  const body = request.body;

  if (!body) {
    return reply.code(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "Corpo da requisição ausente",
    });
  }

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
