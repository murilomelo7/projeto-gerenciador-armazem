import api from '@/services/api';

class Controller {
  constructor() {
    this.api = api;
  }

  async getToken() {
    const token = localStorage.getItem('authToken');
    return token;
  }
}
export default Controller;
