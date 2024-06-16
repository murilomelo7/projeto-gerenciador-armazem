class ControleProdutoService {
  async calcularSaida(atual, novo) {
    return Number(atual) - Number(novo);
  }

  async calcularEntrada(atual, novo) {
    return Number(atual) + Number(novo);
  }

  async renomearDadosApp(dados){
    const dadosRenomeados = {
      "tipo": dados.tipo,
      "quantidade": dados.quantidade,
      "valor_unidade": dados.valor_unidade,
      "valor_total": dados.valor_total,
      "nome_produto": dados.produtoFk.nome
    }
    return dadosRenomeados;
  }
}

export default new ControleProdutoService();
