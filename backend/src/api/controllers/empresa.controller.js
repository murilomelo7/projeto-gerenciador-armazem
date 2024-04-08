class EmpresaController {
  constructor() {}

  async create(request, reply) {
    try {
      const {
        tipo,
        cpfCnpj,
        nome,
        telefone,
        email,
        endereco,
        cidade,
        estado,
        cep,
        status,
        observacoes,
      } = request.body;

      const empresa = await prisma.empresa.create({
        data: {
          tipo,
          cpfCnpj,
          nome,
          telefone,
          email,
          endereco,
          cidade,
          estado,
          cep,
          status,
          observacoes,
        },
      });

      request.log.info(empresa);
      reply.code(200).send(empresa);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async update(request, reply) {
    try {
      const {
        tipo,
        cpfCnpj,
        nome,
        telefone,
        email,
        endereco,
        cidade,
        estado,
        cep,
        status,
        observacoes,
      } = request.body;

      const empresa = await prisma.empresa.update({
        data: {
          tipo,
          cpfCnpj,
          nome,
          telefone,
          email,
          endereco,
          cidade,
          estado,
          cep,
          status,
          observacoes,
        },
      });

      request.log.info(empresa);
      reply.code(200).send(empresa);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findFirst(request, reply) {
    try {
      const { id } = request.params;

      const empresa = await prisma.empresa.findFirst({ where: { id } });

      request.log.info(empresa);
      reply.code(200).send(empresa);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }

  async findMany(request, reply) {
    try {
      const empresas = await prisma.empresa.findMany();

      reply.code(200).send(empresas);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new EmpresaController();
