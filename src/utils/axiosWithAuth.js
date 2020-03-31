import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    // todo: get base api endpoint
    // baseURL: "http://localhost:5000",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token"))
    }
  });
};