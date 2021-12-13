import axios from "axios";

const appApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://swippy-mern.herokuapp.com/api/v1"
    : "http://localhost:5000/api/v1";
// const appApiUrl = "http://192.168.1.109:5000/api";

export const apiCall = axios.create({
  baseURL: appApiUrl,
  timeout: 100000,
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});
