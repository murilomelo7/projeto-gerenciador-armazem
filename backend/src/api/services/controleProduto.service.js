class ControleProdutoService {
  async calcularSaida(atual, novo) {
    return Number(atual) - Number(novo);
  }

  async calcularEntrada(atual, novo) {
    return Number(atual) + Number(novo);
  }
}

export default new ControleProdutoService();
