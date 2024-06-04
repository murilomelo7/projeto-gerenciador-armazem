import prisma from '../../database/PrismaService';

class PerfilController {
  constructor() {}

  async create(request, reply) {
    try {
      const perfil = await prisma.perfil.create({
        data: request.body,
      });
      reply.code(200).send({
        statusCode: 200,
        message: 'Novo perfil cadastrado com sucesso',
        data: perfil,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro no cadastro do perfil',
        error: error.message,
      });
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;

      const perfil = await prisma.perfil.update({
        data: request.body,
        where: { id },
      });

      reply.code(200).send({
        statusCode: 200,
        message: 'Perfil atualizado com sucesso',
        data: perfil,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na atualização do perfil',
        error: error.message,
      });
    }
  }

  async findFirst(request, reply) {
    try {
      const { id } = request.params;

      const perfil = await prisma.perfil.findFirst({
        where: { id },
      });

      if (!perfil) {
        return reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Nenhum perfil encontrado',
        });
      }

      reply.code(200).send(perfil);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca do perfil',
        error: error.message,
      });
    }
  }

  async findMany(request, reply) {
    try {
      const perfis = await prisma.perfil.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (!perfis) {
        return reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Nenhum perfil encontrado',
        });
      }

      reply.code(200).send(perfis);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca dos perfis',
        error: error.message,
      });
    }
  }

  async delete(request, reply) {
    try {
      const { id } = request.params;

      const perfilUsuarioValidation = await prisma.usuario.findFirst({ where: { perfil_id: id } });

      if (perfilUsuarioValidation) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Vínculado',
          message: 'Este perfil está vínculado a um usuário',
        });
      }

      await prisma.perfil.delete({ where: { id } });

      reply.code(200).send({
        statusCode: 200,
        message: 'Perfil removido com sucesso',
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na exclusão do perfil',
        error: error.message,
      });
    }
  }
}

export default new PerfilController();
