import Controller from './_Controller';

class ProdutoController extends Controller {
  async create(data) {
    try {
      const token = await this.getToken();
      const response = await this.api.post('/produto', data, {
        headers: {
          token,
        },
      });
      if (response && response.status === 200) {
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
        message: error.response?.data?.message || 'Erro ao criar o produto.',
      };
    }
  }

  async update(data) {
    try {
      const token = await this.getToken();
      const { id, categoriaFk, ...dataWithoutId } = data;
      const response = await this.api.put(`/produto/${id}`, dataWithoutId, {
        headers: {
          token,
        },
      });
      if (response && response.status === 200) {
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
        message: error.response?.data?.message || 'Erro ao atualizar o produto.',
      };
    }
  }

  async findFirst(id) {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/produto/${id}`, {
        headers: {
          token,
        },
      });
      if (response && response.status === 200) {
        return response.data;
      }
      return {
        error: true,
        message: 'Produto não encontrado.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar o produto.',
      };
    }
  }

  async findMany(filters) {
    try {
      const token = await this.getToken();
      const response = await this.api.get('/produto', {
        headers: {
          token,
          params: filters,
        },
      });
      if (response && response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar produtos.',
      };
    }
  }

  async delete(id) {
    try {
      const token = await this.getToken();
      const response = await this.api.delete(`/produto/${id}`, {
        headers: {
          token,
        },
      });
      if (response && response.status === 200) {
        return {
          error: false,
          message: response.data.message,
        };
      }
      return {
        error: true,
        message: response.data.message || 'Erro ao deletar o produto.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro desconhecido ao tentar deletar o produto.',
      };
    }
  }

  async getSelectData() {
    const produtos = await this.findMany();

    if (produtos.length > 0 && !produtos.error) {
      return produtos.map(produto => ({
        value: produto.id,
        label: produto.nome,
      }));
    }
    return [];
  }
}

export default new ProdutoController();
