import controller from '../controllers/categoria.controller'

class CategoriaRoutes {
    constructor(){}

    async registerRoutes(fastify, options){
        fastify.post("/categorias", controller.postCategorias)

        fastify.put("/categorias", controller.putCategorias)

        fastify.get("/categorias", controller.getCategorias);
    }
}

export default new CategoriaRoutes();