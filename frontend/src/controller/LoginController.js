import api from '@/services/api';

class LoginController {
  constructor() {
    this.api = api;
  }

  async login(data) {
    const response = await this.api.post(`/login`, data);
    if (response && response.status === 200) {
      console.log(response);
      return response.data;
    }
    return false;
  }
}

export default new LoginController();
