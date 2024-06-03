import Controller from './_Controller';

class ProdutoController extends Controller {
  async create(data) {
    const token = await this.getToken();
    const response = await this.api.post('/produto', data, {
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
    const response = await this.api.put(`/produto/${id}`, data, {
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
    const response = await this.api.get(`/produto/${id}`, {
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
    const response = await this.api.get('/produto', {
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
    const response = await this.api.delete(`/produto/${id}`, {
      headers: {
        token,
      },
    });

    if (response && response.status === 200) {
      console.log(response);
      return true;
    }
    return false;
  }
}

export default new ProdutoController();
