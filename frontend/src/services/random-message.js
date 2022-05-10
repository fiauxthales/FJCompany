import axios from "axios";

const randomMessageApi = axios.create({
  baseURL: "https://api.adviceslip.com",
});

export default randomMessageApi;
