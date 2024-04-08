import prisma from "../../database/PrismaService";

class UsuarioController {
  constructor() {}

  async create(request, reply) {
    try {
      const { nome, usuario, senha, email, cpf, perfil_id, empresa_id } =
        request.body;

      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          usuario,
          senha,
          email,
          cpf,
          perfil_id,
          empresa_id,
        },
      });

      request.log.info(error);
      reply.code(200).send(novoUsuario);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const { nome, usuario, senha, email, cpf, perfil_id, empresa_id } =
        request.body;

      const usuarioAtualizado = await prisma.usuario.update({
        data: {
          nome,
          usuario,
          senha,
          email,
          cpf,
          perfil_id,
          empresa_id,
        },
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

      const usuario = await prisma.usuario.findFirst({ where: { id } });

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
