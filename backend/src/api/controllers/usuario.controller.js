import prisma from "../../database/PrismaService";

import UsuarioService from "../services/usuario.service";

class UsuarioController {
  constructor() {}

  async create(request, reply) {
    try {
      request.body.senha = UsuarioService.hashPassword(request.body.senha);

      const novoUsuario = await prisma.usuario.create({
        data: request.body,
      });
      request.log.info(novoUsuario);
      reply.code(200).send(novoUsuario);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const usuarioAtualizado = await prisma.usuario.update({
        data: request.body,
      });
      request.log.info(usuarioAtualizado);
      reply.code(200).send(usuarioAtualizado);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findFirst(request, reply) {
    try {
      const { id } = request.params;
      const { empresa_id } = request.query;

      const usuario = await prisma.usuario.findFirst({
        where: { id, empresa_id },
      });

      request.log.info(usuario);
      reply.code(200).send(usuario);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const usuarios = await prisma.usuario.findMany();

      request.log.info(usuarios);
      reply.code(200).send(usuarios);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new UsuarioController();
