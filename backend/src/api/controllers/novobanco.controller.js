import prisma from '../../database/PrismaService';
import usuarioService from '../services/usuario.service';

class NovoBanco {
  async create(request, reply) {
    try {
      const dataEmpresa = {
        tipo: 'J',
        cpfCnpj: '12345678910123',
        nome: 'EMPRESA ADMIN',
        telefone: '999888777',
        email: 'emailadmin@admin.com',
        endereco: 'Endereço admin',
        cidade: 'Cascavel',
        estado: 'PR',
        cep: '85123-700',
      };

      const novaEmpresa = await prisma.empresa.create({ data: dataEmpresa });

      const dataPerfilAdmin = {
        codigo: '1',
        nome: 'Administrador',
        acessos: 'admin',
      };

      const novoPerfilAdmin = await prisma.perfil.create({ data: dataPerfilAdmin });

      const senhaHash = await usuarioService.hashPassword('admin');

      console.log(novaEmpresa);

      const dataUsuario = {
        nome: 'Administrador',
        usuario: 'admin',
        senha: senhaHash,
        email: 'admin@admin.com.br',
        cpf: '12345678910',
        perfil_id: novoPerfilAdmin.id,
        empresa_id: novaEmpresa.id,
      };

      const novoUsuario = await prisma.usuario.create({ data: dataUsuario });

      reply.code(200).send({
        statusCode: 200,
        message: 'Novo banco cadastrado com sucesso',
        data: { novoUsuario },
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }
}

export default new NovoBanco();
