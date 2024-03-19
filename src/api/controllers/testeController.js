import TesteService from "../services/testeService";

export default class TesteController {
  constructor() {
    this.testeService = new TesteService();
  }

  async teste(req, res) {
    try {
      res.status(200).json({});
    } catch (error) {
      console.log(error);
      res.status(501).json({ erro: error });
    }
  }
}
