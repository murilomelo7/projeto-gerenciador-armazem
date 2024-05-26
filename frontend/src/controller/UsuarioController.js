import api from '@/services/api';

class UsuarioController {
  constructor() {
    this.api = api;
  }

  async create(data) {
    const response = await this.api.post('/usuario', data);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async update(data) {
    const { empresaFk, perfilFk, id, ...dados } = data;

    const response = await this.api.put(`/usuario/${id}`, dados);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async findFirst(id) {
    const response = await this.api.get(`/usuario/${id}`);
    if (response && response.status === 200) {
      return response.data;
    }
    return false;
  }

  async findMany(filters) {
    const response = await this.api.get('/usuario');
    console.log(response);
    if (response && response.status === 200) {
      return response.data;
    }
    return [];
  }

  async delete(id) {
    const response = await this.api.delete(`/usuario/${id}`);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }
}

export default new UsuarioController();
