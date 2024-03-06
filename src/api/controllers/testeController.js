import { TesteService } from "../services";

import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import fs from "fs";
import path from "path";

export default class TesteController {
  constructor() {
    this.testeService = new TesteService();
  }

  async buscaHolerite(req, res) {
    try {
      const filePath = path.join(__dirname, "../schemas/dataset.xml");

      console.log(filePath);

      const xmlData = fs.readFileSync(filePath, "utf-8");

      const parser = new XMLParser();
      // converte o xml em json
      let jsonObj = parser.parse(xmlData);

      const sla = await this.testeService.enviarPrimeiraReq();

      console.log(jsonObj);

      res.status(200).json(jsonObj);
    } catch (error) {
      console.log(error);
      res.status(501).json({ erro: error });
    }
  }
}
