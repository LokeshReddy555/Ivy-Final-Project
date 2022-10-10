import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/v1/";

const register = (username, email, password) => {
  console.log(username+" "+email);
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const update = (password) => {
  let id = getCurrentUser().id;
  let email = getCurrentUser().email;
  let username = getCurrentUser().username;
   return axios
    .put(API_URL + "change-password", {
      id,
      password,
      username,
      email
    })
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  update,
};

export default AuthService;
