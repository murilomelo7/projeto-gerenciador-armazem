import path from "path";
import fs from "fs";
import axios from "axios";

export default class TesteService {
  async enviarPrimeiraReq() {
    const certPath = path.join(__dirname, "../certificados/CRME_CORRETO.pfx");

    const certBuffer = fs.readFileSync(certPath);

    console.log(certBuffer);

    return true;
    // axios.get()
  }
}
