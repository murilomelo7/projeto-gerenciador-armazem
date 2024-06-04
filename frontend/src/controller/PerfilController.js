import Controller from './_Controller';

class PerfilController extends Controller {
  async create(data) {
    try {
      const response = await this.api.post('/perfil', data);
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
        message: error.response?.data?.message || 'Erro ao criar o perfil.',
      };
    }
  }

  async update(data) {
    try {
      const { id } = data;
      const response = await this.api.put(`/perfil/${id}`, data);
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
        message: error.response?.data?.message || 'Erro ao atualizar o perfil.',
      };
    }
  }

  async findFirst(id) {
    try {
      const response = await this.api.get(`/perfil/${id}`);
      if (response && response.status === 200) {
        return response.data;
      }
      return {
        error: true,
        message: 'Perfil não encontrado.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar o perfil.',
      };
    }
  }

  async findMany(filters) {
    try {
      const response = await this.api.get('/perfil', { params: filters });
      if (response && response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar perfis.',
      };
    }
  }

  async delete(id) {
    try {
      const response = await this.api.delete(`/perfil/${id}`);
      if (response && response.status === 200) {
        return {
          error: false,
          message: response.data.message,
        };
      }
      return {
        error: true,
        message: response.data.message || 'Erro ao deletar o perfil.',
      };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return {
          error: true,
          message: error.response.data.message || 'Erro de vínculo: não foi possível deletar o perfil.',
        };
      }
      return {
        error: true,
        message: error.response?.data?.message || 'Erro desconhecido ao tentar deletar o perfil.',
      };
    }
  }

  async getSelectData() {
    const perfis = await this.findMany();
    if (perfis.length > 0 && !perfis.error) {
      return perfis.map(perfil => ({
        value: perfil.id,
        label: perfil.nome,
      }));
    }
    return [];
  }
}

export default new PerfilController();
