// import UsuarioService from '../services/usuario.service'
import { createSchema } from "../schema/usuario.schema";

class UsuarioController {
  constructor() {}

  async create(request, reply) {
    try {
      const body = request.body;

      

      reply.code(200).send(dados);
    } catch (error) {
      request.log.info(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  async findAll(request, reply) {
    try {
    } catch (error) {
      reply.code(500).send(error);
    }
  }
}

export default new UsuarioController();
