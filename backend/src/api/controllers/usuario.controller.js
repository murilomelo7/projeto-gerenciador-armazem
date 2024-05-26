import prisma from "../../database/PrismaService";

import UsuarioService from "../services/usuario.service";

class UsuarioController {
  constructor() {}

  async create(request, reply) {
    try {
      request.body.senha = await UsuarioService.hashPassword(
        request.body.senha
      );

      const novoUsuario = await prisma.usuario.create({
        data: request.body,
      });
      reply.code(200).send(novoUsuario);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;

      const data = request.body;
      const where = { id };
      const usuarioAtualizado = await prisma.usuario.update({
        data,
        where,
      });
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
        include: { empresaFk: true, perfilFk: true },
      });

      if (!usuario) {
        reply.code(404).send({
          statusCode: 404,
          error: "Not Found",
          message: "Usuário não encontrado",
        });
      }

      reply.code(200).send(usuario);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const usuarios = await prisma.usuario.findMany({
        include: { empresaFk: true, perfilFk: true },
      });

      if (!usuarios) {
        reply.code(404).send({
          statusCode: 404,
          error: "Not Found",
          message: "Usuários não encontrados",
        });
      }

      reply.code(200).send(usuarios);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async delete(request, reply) {
    try {
      const { id } = request.params;
      const { empresa_id } = request.query;

      const usuario = await prisma.usuario.delete({
        where: { id, empresa_id },
      });

      reply.code(200).send(usuario);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new UsuarioController();
