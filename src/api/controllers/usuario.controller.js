// import UsuarioService from '../services/usuario.service'

class UsuarioController {
  constructor() {}

  async postUsuarios(fastify, request, reply) {
    try {

      fastify.log.info('POST USUARIO');
        
      const dados = request.body;

      reply.code(200).send(dados);
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  async putUsuarios(request, reply) {
    try {

    } catch (error) {
      reply.code(500).send(error);
    }
  }

  async getUsuarios(request, reply) {
    try {
    } catch (error) {
      reply.code(500).send(error);

    }
  }
}

export default new UsuarioController();
