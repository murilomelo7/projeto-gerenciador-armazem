import controller from '../controllers/perfil.controller'

class PerfilRoutes {
    constructor(){}

    async registerRoutes(fastify, options){
        fastify.post("/perfil", controller.postPerfis)

        fastify.put("/perfil", controller.putPerfis)

        fastify.get("/perfil", controller.getPerfis);
    }
}

export default new PerfilRoutes();