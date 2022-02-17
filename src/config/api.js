import axios from "axios";

const instance = axios.create({
  baseURL: "https://mariem-marvel-api.herokuapp.com/",
});

export default instance;
