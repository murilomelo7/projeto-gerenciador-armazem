import Controller from './_Controller';

class AuthController extends Controller {
  async testToken(token) {
    const headers = {
      token,
    };
    const response = await this.api.get(`/test-token`, { headers });
    if (response && response.status === 200) {
      console.log(response);
      return response.data;
    }
    return {
      token: 'invalido',
      acessos: 'invalido',
    };
  }

  async cleanToken(token) {
    console.log(token);
    const headers = {
      token,
    };
    const response = await this.api.put(`/clean-token`, {}, { headers });
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }
}

export default new AuthController();
