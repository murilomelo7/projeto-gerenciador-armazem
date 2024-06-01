import Controller from './_Controller';

class ProdutoController extends Controller {
  async create(data) {
    const token = await this.getToken();
    const response = await this.api.post('/perfil', data, {
      headers: {
        token,
      },
    });
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async update(data) {
    const token = await this.getToken();

    const { id } = data;
    const response = await this.api.put(`/perfil/${id}`, data, {
      headers: {
        token,
      },
    });
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async findFirst(id) {
    const token = await this.getToken();
    const response = await this.api.get(`/perfil/${id}`, {
      headers: {
        token,
      },
    });
    if (response && response.status === 200) {
      return response.data;
    }
    return false;
  }

  async findMany(filters) {
    const token = await this.getToken();
    const response = await this.api.get('/perfil', {
      headers: {
        token,
      },
    });
    console.log(response);
    if (response && response.status === 200) {
      return response.data;
    }
    return [];
  }

  async delete(id) {
    const token = await this.getToken();
    const response = await this.api.delete(`/perfil/${id}`, {
      headers: {
        token,
      },
    });
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }
}

export default new ProdutoController();
