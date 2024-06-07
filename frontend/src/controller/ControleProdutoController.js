import Controller from './_Controller';

class ControleProdutoController extends Controller {
  async entrada(data) {
    try {
      const token = await this.getToken();
      const dataAjustado = {
        ...data,
        quantidade: Number(data.quantidade),
        valor_total: Number(data.valor_unidade) * Number(data.quantidade),
      };

      const response = await this.api.post('/controle-produto/entrada', dataAjustado, {
        headers: {
          token,
        },
      });

      if (response.status === 200) {
        return {
          error: false,
          message: response.data.message,
        };
      }
      return {
        error: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao fazer uma entrada.',
      };
    }
  }

  async saida(data) {
    try {
      const token = await this.getToken();

      const dataAjustado = {
        ...data,
        quantidade: Number(data.quantidade),
        valor_total: Number(data.valor_unidade) * Number(data.quantidade),
      };

      const response = await this.api.post('/controle-produto/saida', dataAjustado, {
        headers: {
          token,
        },
      });

      if (response.status === 200) {
        return {
          error: false,
          message: response.data.message,
        };
      }
      return {
        error: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao fazer uma saída.',
      };
    }
  }

  async findFirst(id) {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/controle-produto/${id}`, {
        headers: {
          token,
        },
      });

      if (response && response.status === 200) {
        return response.data;
      }
      return {
        error: true,
        message: 'Controle produtos não encontrado.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar os controles produtos.',
      };
    }
  }

  async findMany(filters) {
    try {
      const token = await this.getToken();

      const response = await this.api.get('/controle-produto', {
        headers: {
          token,
        },
        params: filters,
      });

      console.log(response.data);

      if (response && response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar controle produto.',
      };
    }
  }
}

export default new ControleProdutoController();
