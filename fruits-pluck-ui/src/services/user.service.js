import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";

const getPublicContent = () => {
  return axios.get(API_URL + "homepage");
};

const getUserBoard = () => {
  return axios.get(API_URL + "greeting", { headers: authHeader() });
};

const getScoresOfCurrentUser = (id) => {
  return axios.get(API_URL + "getScores/" + id, { headers: authHeader() })              
}

const sendScoresOfCurrentUser = (id,score) => {
  return axios.post(API_URL + "sendScore",{
    id,
    score,
  });
};


const UserService = {
  getPublicContent,
  getUserBoard,
  getScoresOfCurrentUser,
  sendScoresOfCurrentUser,
};

export default UserService;
