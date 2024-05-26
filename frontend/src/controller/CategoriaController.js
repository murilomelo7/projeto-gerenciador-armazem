import api from '@/services/api';

class CategoriaController {
  constructor() {
    this.api = api;
  }

  async create(data) {
    const response = await this.api.post('/categoria', data);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async update(data) {
    const { id } = data;
    const response = await this.api.put(`/categoria/${id}`, data);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async findFirst(id) {
    const response = await this.api.get(`/categoria/${id}`);
    if (response && response.status === 200) {
      return response.data;
    }
    return false;
  }

  async findMany(filters) {
    const response = await this.api.get('/categoria');
    console.log(response);
    if (response && response.status === 200) {
      return response.data;
    }
    return [];
  }

  async delete(id) {
    const response = await this.api.delete(`/categoria/${id}`);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }
}

export default new CategoriaController();
