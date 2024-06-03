import Controller from './_Controller';

class PerfilController extends Controller {
  async create(data) {
    const response = await this.api.post('/perfil', data);
    if (response.status === 200) {
      return {
        error: false,
        message: response.data.message,
      };
    }
    return {
      error: true,
      message: response.data.error,
    };
  }

  async update(data) {
    const { id } = data;
    const response = await this.api.put(`/perfil/${id}`, data);
    if (response && response.status === 200) {
      return response.data.message;
    }
    return response.error;
  }

  async findFirst(id) {
    const response = await this.api.get(`/perfil/${id}`);
    if (response && response.status === 200) {
      return response.data;
    }
    return false;
  }

  async findMany(filters) {
    const response = await this.api.get('/perfil');
    console.log(response);
    if (response && response.status === 200) {
      return response.data;
    }
    return [];
  }

  async delete(id) {
    const response = await this.api.delete(`/perfil/${id}`);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async getSelectData() {
    const perfis = await this.findMany();

    if (perfis.length > 0) {
      const perfisList = perfis.map(perfil => ({
        value: perfil.id,
        label: perfil.nome,
      }));
      return perfisList;
    }
    return [];
  }
}

export default new PerfilController();
