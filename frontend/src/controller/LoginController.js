import Controller from './_Controller';

class LoginController extends Controller {
  async login(data) {
    try {
      const response = await this.api.post('/login', data);
      if (response && response.status === 200) {
        console.log(response);
        return response.data;
      }
      return false;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Erro ao realizar login.',
      };
    }
  }
}

export default new LoginController();
