import prisma from '../../database/PrismaService';

import UsuarioService from '../services/usuario.service';

class UsuarioController {
  constructor() {}

  async create(request, reply) {
    try {
      request.body.senha = await UsuarioService.hashPassword(request.body.senha);

      const novoUsuario = await prisma.usuario.create({
        data: request.body,
      });

      reply.code(200).send({
        statusCode: 200,
        message: 'Novo usuário cadastrado com sucesso',
        data: novoUsuario,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro no cadastro do usuário',
        error: error.message,
      });
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
      reply.code(200).send({
        statusCode: 200,
        message: 'Usuário atualizado com sucesso',
        data: usuarioAtualizado,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na atualização do usuário',
        error: error.message,
      });
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
          error: 'Not Found',
          message: 'Usuário não encontrado',
        });
      }

      reply.code(200).send(usuario);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca do usuário',
        error: error.message,
      });
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
          error: 'Not Found',
          message: 'Usuários não encontrados',
        });
      }

      reply.code(200).send(usuarios);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca dos usuários',
        error: error.message,
      });
    }
  }

  async delete(request, reply) {
    try {
      const { id } = request.params;
      const { empresa_id } = request.query;

      const where = {
        id,
        empresa_id,
      };

      await prisma.usuario.delete({ where });

      reply.code(200).send({
        statusCode: 200,
        message: 'Usuário removido com sucesso',
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na exclusão do usuário',
        error: error.message,
      });
    }
  }
}

export default new UsuarioController();
