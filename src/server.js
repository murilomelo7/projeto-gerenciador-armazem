// server.js

import Fastify from "fastify";

import CategoriaRoutes from "./api/routes/categoria.routes"
import EmpresaRoutes from "./api/routes/empresa.routes"
import PerfilRoutes from "./api/routes/perfil.routes"
import ProdutoRoutes from "./api/routes/produto.routes"
import UsuarioRoutes from "./api/routes/usuario.routes";


const environment = 'development'


const loggerConfig = () => {
  if(environment === 'development'){
    return  {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }    
    }
  }else{
    true
  }
};
class Server {
  constructor() {

    this.fastify = Fastify({
      logger: loggerConfig() // Configure o logger corretamente

     });
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Import and register routes
    CategoriaRoutes.registerRoutes(this.fastify);
    EmpresaRoutes.registerRoutes(this.fastify);
    PerfilRoutes.registerRoutes(this.fastify);
    ProdutoRoutes.registerRoutes(this.fastify);
    UsuarioRoutes.registerRoutes(this.fastify);
  }

  async start() {
    try {
      await this.fastify.listen({ port: 3000 });
      this.fastify.log.info("Server is listening on port 3000");
    } catch (error) {
      this.fastify.log.error(error);
      process.exit(1);
    }
  }
}

export default Server;
