import Controller from './_Controller';

class CategoriaController extends Controller {
  async create(data) {
    try {
      const token = await this.getToken();
      const response = await this.api.post('/categoria', data, {
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
        message: error.response?.data?.message || 'Erro ao criar a categoria.',
      };
    }
  }

  async update(data) {
    try {
      const token = await this.getToken();
      const { id } = data;
      const response = await this.api.put(`/categoria/${id}`, data, {
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
        message: error.response?.data?.message || 'Erro ao atualizar a categoria.',
      };
    }
  }

  async findFirst(id) {
    try {
      const token = await this.getToken();
      const response = await this.api.get(`/categoria/${id}`, {
        headers: {
          token,
        },
      });

      if (response && response.status === 200) {
        return response.data;
      }
      return {
        error: true,
        message: 'Categoria não encontrada.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar a categoria.',
      };
    }
  }

  async findMany(filters) {
    try {
      const token = await this.getToken();
      const response = await this.api.get('/categoria', {
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
        message: error.response?.data?.message || 'Erro ao buscar categorias.',
      };
    }
  }

  async delete(id) {
    try {
      const token = await this.getToken();
      const response = await this.api.delete(`/categoria/${id}`, {
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
        message: response.data.message || 'Erro ao deletar a categoria.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro desconhecido ao tentar deletar a categoria.',
      };
    }
  }

  async getSelectData() {
    const categorias = await this.findMany();

    if (categorias.length > 0 && !categorias.error) {
      return categorias.map(categoria => ({
        value: categoria.id,
        label: categoria.nome,
      }));
    }
    return [];
  }
}

export default new CategoriaController();
