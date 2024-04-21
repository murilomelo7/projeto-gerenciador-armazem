// server.js

import Fastify from "fastify";

//? Private Admin
import EmpresaRoutes from "./api/routes/private/admin/empresa.routes";
import PerfilRoutes from "./api/routes/private/admin/perfil.routes";
import UsuarioRoutes from "./api/routes/private/admin/usuario.routes";

//? Private Tenant
import CategoriaRoutes from "./api/routes/private/tenant/categoria.routes";
import ProdutoRoutes from "./api/routes/private/tenant/produto.routes";

//? Public
import LoginRoutes from "./api/routes/public/login.routes";

const environment = "development";

const loggerConfig = () => {
  if (environment === "development") {
    return {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    };
  } else {
    true;
  }
};
class Server {
  constructor() {
    this.fastify = Fastify({
      logger: loggerConfig(), // Configure o logger corretamente
    });
    this.initializeRoutes();
  }

  initializeRoutes() {
    //? Aqui inicializa as rotas
    LoginRoutes.registerRoutes(this.fastify);
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

  async close() {
    try {
      await this.fastify.close();
      this.fastify.log.info("Server closed successfully");
    } catch (error) {
      this.fastify.log.error("Error closing server:", error);
      process.exit(1);
    }
  }
}

export default new Server();
