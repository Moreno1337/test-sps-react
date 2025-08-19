import AxiosClient from "./AxiosClient";

class UserService {
  async list() {
    const users = await AxiosClient.get('/users');
    return users;
  }
  async create(data) {
    const user = await AxiosClient.post("/users", data)
    return user;
  }
  async delete(id) {
    await AxiosClient.delete(`/users/${id}`)
  }
  async update(id, data) {
    const user = await AxiosClient.put(`/users/${id}`, data)
    return user;
  }
}

const userService = new UserService();

export default userService;
