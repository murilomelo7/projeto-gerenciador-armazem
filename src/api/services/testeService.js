import path from "path";
import fs from "fs";
import axios from "axios";
import logger from "../../config/logger";

export default class TesteService {
  constructor() {
    logger.info("Criação TesteService");
  }

  async enviarPrimeiraReq() {}
}
