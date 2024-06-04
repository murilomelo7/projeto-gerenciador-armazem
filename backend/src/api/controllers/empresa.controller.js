import prisma from '../../database/PrismaService';
import usuarioService from '../services/usuario.service';

class EmpresaController {
  constructor() {}

  async create(request, reply) {
    try {
      const { nomeUsuario, usuario, cpf, perfil_id, ...data } = request.body;

      const empresa = await prisma.empresa.create({ data });

      const dadosUsuario = {
        nome: nomeUsuario,
        usuario,
        email: empresa.email,
        cpf,
        perfil_id,
        empresa_id: empresa.id,
      };

      const usuarioNovo = await usuarioService.createUsuarioEmpresa(dadosUsuario);

      reply.code(200).send({
        statusCode: 200,
        message: 'Empresa cadastrada com sucesso',
        data: { empresa, usuarioNovo },
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro no cadastro da empresa',
        error: error.message,
      });
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;

      const data = request.body;
      const where = { id };

      const empresa = await prisma.empresa.update({ data, where });

      reply.code(200).send({
        statusCode: 200,
        message: 'Empresa atualizada com sucesso',
        data: empresa,
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na atualização da empresa',
        error: error.message,
      });
    }
  }

  async findFirst(request, reply) {
    try {
      const { id } = request.params;
      const empresa = await prisma.empresa.findFirst({ where: { id } });

      if (!empresa) {
        return reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Empresa não encontrada',
        });
      }
      reply.code(200).send(empresa);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca da empresa',
        error: error.message,
      });
    }
  }

  async findMany(request, reply) {
    try {
      const empresas = await prisma.empresa.findMany({
        orderBy: { id: 'asc' },
      });

      if (!empresas) {
        return reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Nenhuma empresa encontrada',
        });
      }
      reply.code(200).send(empresas);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        statusCode: 500,
        message: 'Ocorreu um erro na busca das empresas',
        error: error.message,
      });
    }
  }

  async delete(request, reply) {
    try {
      const { id } = request.params;

      const usuarioValidation = prisma.usuario.findFirst({ where: { empresa_id: id } });
      const categoriaValidation = prisma.categoria.findFirst({ where: { empresa_id: id } });
      const produtoValidation = prisma.produto.findFirst({ where: { empresa_id: id } });
      const fornecedorValidation = prisma.fornecedor.findFirst({ where: { empresa_id: id } });
      const controleProdutoValidation = prisma.controleProduto.findFirst({ where: { empresa_id: id } });

      if (
        usuarioValidation ||
        categoriaValidation ||
        produtoValidation ||
        fornecedorValidation ||
        controleProdutoValidation
      ) {
        return reply.code(400).send({
          statusCode: 400,
          error: 'Vínculado',
          message: 'Esta empresa possui vínculos e não pode ser excluida',
        });
      }

      await prisma.empresa.delete({ where: { id } });
      reply.code(200).send({
        statusCode: 200,
        message: 'Empresa removida com sucesso',
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new EmpresaController();
