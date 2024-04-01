import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class CategoriaController {
  constructor() {}

  async create(request, reply) {
    try {
      const { nome, descricao } = request.body;

      const dados = {
        nome,
        descricao,
      };

      const novaCategoria = await prisma.categoria.create({
        data: dados,
      });

      request.log.info(novaCategoria);
      reply.code(200).send(novaCategoria);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
    } catch (error) {}
  }

  async findAll(request, reply) {
    try {
    } catch (error) {}
  }
}

export default new CategoriaController();
