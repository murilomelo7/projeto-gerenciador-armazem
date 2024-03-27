// Importa o controlador de usuário
import usuarioController from '../controllers/usuario.controller';

class UsuarioRoutes {
  constructor() {}

  // Método para registrar as rotas
  async registerRoutes(fastify, options) {
    // Rota para criar um novo usuário (POST)
    fastify.post('/usuarios', async (request, reply) => {
      await usuarioController.postUsuarios(fastify, request, reply);
    });

    // Rota para atualizar um usuário existente (PUT)
    fastify.put('/usuarios', async (request, reply) => {
      await usuarioController.putUsuarios(fastify, request, reply);
    });

    // Rota para obter todos os usuários (GET)
    fastify.get('/usuarios', async (request, reply) => {
      await usuarioController.getUsuarios(fastify, request, reply);
    });
  }
}

export default new UsuarioRoutes();
