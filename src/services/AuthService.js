import AxiosClient from "./AxiosClient";

async function login(email, password) {
  const data = await AxiosClient.post('/auth/login', { email, password }, { auth: false });
  localStorage.setItem('token', data.token);
  return data;
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}

function getToken() {
  return localStorage.getItem('token');
}

const AuthService = {
    login,
    logout,
    getToken
}

export default AuthService;
