 import controller from '../controllers/usuario.controller'

class UsuarioRoutes {
    constructor(){}

    async registerRoutes(fastify, options){
        fastify.post("/usuarios", controller.postUsuarios)

        fastify.put("/usuarios", controller.putUsuarios)

        fastify.get("/usuarios", controller.getUsuarios);
    }
}

export default new UsuarioRoutes();