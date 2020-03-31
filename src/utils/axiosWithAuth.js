import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "quarantine-productivity.herokuapp.com/api",
    headers: {
      // Authorization: JSON.parse(localStorage.getItem("token"))
    }
  });
};