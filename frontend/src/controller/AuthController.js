import api from '@/services/api';

class AuthController {
  constructor() {
    this.api = api;
  }

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
      console.log('aaaaaaaaaaaaaaaaaa');
      return true;
    }
    return false;
  }
}

export default new AuthController();
