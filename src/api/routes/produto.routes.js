import controller from '../controllers/produto.controller'

class ProdutoRoutes {
    constructor(){}

    async registerRoutes(fastify, options){
        fastify.post("/produto", controller.postProdutos)

        fastify.put("/produto", controller.putProdutos)

        fastify.get("/produto", controller.getProdutos);
    }
}

export default new ProdutoRoutes();