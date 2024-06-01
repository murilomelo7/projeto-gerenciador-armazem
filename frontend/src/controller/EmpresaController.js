import Controller from './_Controller';

class EmpresaController extends Controller {
  async create(data) {
    const response = await this.api.post('/empresa', data);
    console.log(response);

    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async update(data) {
    const { id } = data;
    const response = await this.api.put(`/empresa/${id}`, data);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async findFirst(id) {
    const response = await this.api.get(`/empresa/${id}`);
    if (response && response.status === 200) {
      return response.data;
    }
    return false;
  }

  async findMany(filters) {
    const response = await this.api.get('/empresa');
    console.log(response);
    if (response && response.status === 200) {
      return response.data;
    }
    return [];
  }

  async delete(id) {
    const response = await this.api.delete(`/empresa/${id}`);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  async getSelectData() {
    const empresas = await this.findMany();

    if (empresas.length > 0) {
      const empresasList = empresas.map(empresa => ({
        value: empresa.id,
        label: empresa.nome,
      }));
      return empresasList;
    }
    return [];
  }
}

export default new EmpresaController();
