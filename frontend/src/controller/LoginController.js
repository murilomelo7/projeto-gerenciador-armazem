import Controller from './_Controller';

class LoginController extends Controller {
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
