import axios from "axios";

const instance = axios.create({
  //baseURL: "https://mariem-marvel-api.herokuapp.com/",
  baseURL: "http://localhost:4000/",
});

export default instance;
