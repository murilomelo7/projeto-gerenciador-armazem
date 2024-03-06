import { TesteService } from "../services";

import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import fs from "fs";
import path from "path";

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
