export const validateRequestBodyPresence = async (request, reply) => {
  const { body } = request;

  if (!body) {
    return reply.code(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "Corpo da requisição ausente",
    });
  }
  return body;
};
