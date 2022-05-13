import axios from "axios";

const translateMessageApi = axios.create({
  baseURL: "https://libretranslate.de",
});

export default translateMessageApi;
