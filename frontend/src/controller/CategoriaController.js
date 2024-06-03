import Controller from './_Controller';

class CategoriaController extends Controller {
  async create(data) {
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
      message: response.data.error,
    };
  }

  async update(data) {
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
      message: response.data.error,
    };
  }

  async findFirst(id) {
    const token = await this.getToken();
    const response = await this.api.get(`/categoria/${id}`, {
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
    const response = await this.api.get('/categoria', {
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
      message: response.data.error,
    };
  }

  async getSelectData() {
    const categorias = await this.findMany();

    if (categorias.length > 0) {
      const categoriaList = categorias.map(categoria => ({
        value: categoria.id,
        label: categoria.nome,
      }));
      return categoriaList;
    }
    return [];
  }
}

export default new CategoriaController();
