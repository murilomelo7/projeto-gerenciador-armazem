import Controller from './_Controller';

class FornecedorController extends Controller {
  async create(data) {
    try {
      const token = await this.getToken();
      const response = await this.api.post('/fornecedor', data, {
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
        message: error.response?.data?.message || 'Erro ao criar o fornecedor.',
      };
    }
  }

  async update(data) {
    try {
      const token = await this.getToken();
      const { id } = data;
      const response = await this.api.put(`/fornecedor/${id}`, data, {
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
        message: error.response?.data?.message || 'Erro ao atualizar a fornecedor.',
      };
    }
  }

  async findFirst(id) {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/fornecedor/${id}`, {
        headers: {
          token,
        },
      });

      if (response && response.status === 200) {
        return response.data;
      }
      return {
        error: true,
        message: 'Fornecedor não encontrado.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar a fornecedor.',
      };
    }
  }

  async findMany(filters) {
    try {
      const token = await this.getToken();
      const response = await this.api.get('/fornecedor', {
        headers: {
          token,
        },
        params: filters,
      });

      if (response && response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar fornecedores.',
      };
    }
  }

  async delete(id) {
    try {
      const token = await this.getToken();
      const response = await this.api.delete(`/fornecedor/${id}`, {
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
        message: response.data.message || 'Erro ao deletar o fornecedor.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro desconhecido ao tentar deletar o fornecedor.',
      };
    }
  }

  async getSelectData() {
    const fornecedores = await this.findMany();

    if (fornecedores.length > 0 && !fornecedores.error) {
      return fornecedores.map(fornecedor => ({
        value: fornecedor.id,
        label: fornecedor.nome,
      }));
    }
    return [];
  }
}

export default new FornecedorController();
