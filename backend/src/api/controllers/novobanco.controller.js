import prisma from '../../database/PrismaService'

class NovoBanco{

  async create(request, reply){
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
        cep: '85123-700'
      }

      const dataPerfilAdmin = {
        nome: 'Administrador',
        acessos: 'admin'
      }

      const dataUsuario = {

      };


    } catch (error) {
      request.log.error(error);
      reply.code(500).send(error);
    }
  }


}

export default new NovoBanco();