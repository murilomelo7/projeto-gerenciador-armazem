import Controller from './_Controller';

class EmpresaController extends Controller {
  async create(data) {
    try {
      const response = await this.api.post('/empresa', data);
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
        message: error.response?.data?.message || 'Erro ao criar a empresa.',
      };
    }
  }

  async update(data) {
    try {
      const { id } = data;
      const response = await this.api.put(`/empresa/${id}`, data);
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
        message: error.response?.data?.message || 'Erro ao atualizar a empresa.',
      };
    }
  }

  async findFirst(id) {
    try {
      const response = await this.api.get(`/empresa/${id}`);
      if (response && response.status === 200) {
        return response.data;
      }
      return {
        error: true,
        message: 'Empresa não encontrada.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar a empresa.',
      };
    }
  }

  async findMany(filters) {
    try {
      const response = await this.api.get('/empresa', { params: filters });
      if (response && response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao buscar empresas.',
      };
    }
  }

  async delete(id) {
    try {
      const response = await this.api.delete(`/empresa/${id}`);
      if (response && response.status === 200) {
        return {
          error: false,
          message: response.data.message,
        };
      }
      return {
        error: true,
        message: response.data.message || 'Erro ao deletar a empresa.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro desconhecido ao tentar deletar a empresa.',
      };
    }
  }

  async getSelectData() {
    const empresas = await this.findMany();

    if (empresas.length > 0 && !empresas.error) {
      return empresas.map(empresa => ({
        value: empresa.id,
        label: empresa.nome,
      }));
    }
    return [];
  }
}

export default new EmpresaController();
