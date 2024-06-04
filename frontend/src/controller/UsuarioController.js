import Controller from './_Controller';

class UsuarioController extends Controller {
  async create(data) {
    try {
      const response = await this.api.post('/usuario', data);
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
        message: error.response?.data?.message || 'Erro ao criar o usuário.',
      };
    }
  }

  async update(data) {
    try {
      const { empresaFk, perfilFk, id, ...dados } = data;
      const response = await this.api.put(`/usuario/${id}`, dados);
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
        message: error.response?.data?.message || 'Erro ao atualizar o usuário.',
      };
    }
  }

  async findFirst(id) {
    try {
      const response = await this.api.get(`/usuario/${id}`);
      if (response && response.status === 200) {
        return response.data;
      }
      return {
        error: true,
        message: 'Usuário não encontrado.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar o usuário.',
      };
    }
  }

  async findMany(filters) {
    try {
      const response = await this.api.get('/usuario', { params: filters });
      if (response && response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar usuários.',
      };
    }
  }

  async delete(id) {
    try {
      const response = await this.api.delete(`/usuario/${id}`);
      if (response && response.status === 200) {
        return {
          error: false,
          message: response.data.message,
        };
      }
      return {
        error: true,
        message: response.data.message || 'Erro ao deletar o usuário.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro desconhecido ao tentar deletar o usuário.',
      };
    }
  }
}

export default new UsuarioController();
