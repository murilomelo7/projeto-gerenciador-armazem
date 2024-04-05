import prisma from "../../database/PrismaService";

// import UsuarioService from '../services/usuario.service'
import { createSchema } from "../schema/usuario.schema";

class UsuarioController {
  constructor() {}

  async create(request, reply) {
    try {
      const {body} = request.body;



      const novoUsuario = await prisma.usuario.create(body);

      reply.code(200).send(novoUsuario);
    } catch (error) {
      request.log.error(error);
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
      reply.code(200).send({ nome: "Murilo" });
    } catch (error) {
      reply.code(500).send(error);
    }
  }
}

export default new UsuarioController();
