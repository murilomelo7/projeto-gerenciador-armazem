import prisma from '../../database/PrismaService'

class NovoBanco{

  async create(request, reply){
    try {
      const dataEmpresa = {

      }

      const dataPerfil = {
        
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