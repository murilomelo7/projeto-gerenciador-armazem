import TesteService from "../services/teste.service";

export default class TesteController {
  constructor() {
    this.testeService = new TesteService();
  }

  async teste(req, res) {
    try {
      // const usuario = req.dbAdmin.Usuario.findAll({
      //   where: {
      //     id: req.body.codigo_usuario,
      //   },
      // });

      const sla = [
        { id: 1, nome: "salkjfn" },
        { id: 2, nome: "salkjfn" },
        { id: 3, nome: "salkjfn" },
        { id: 4, nome: "salkjfn" },
        { id: 5, nome: "salkjfn" },
        { id: 6, nome: "salkjfn" },
        { id: 7, nome: "salkjfn" },
      ];

      res.status(200).json({
        status_code: 200,
        message: "Usuários encontrados:",
        data: sla,
      });
    } catch (error) {
      console.log(error);
      res.status(501).json({ erro: error });
    }
  }
}
