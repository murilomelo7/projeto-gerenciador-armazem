class LoginController {
  constructor() {}

  async login(request, reply) {
    try {
      const { usuario, senha } = request.body;

      if (((usuario = "admin"), (senha = "12345"))) {
        reply.code(200).send("logado");
      }
      reply.code(400).send("Dados inválidos");
      request.log.info();
    } catch (error) {
      request.log.info(error);
      reply.code(500).send(error);
    }
  }
}
