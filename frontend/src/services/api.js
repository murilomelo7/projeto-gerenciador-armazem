import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", //? Url local
});

// Adiciona um interceptor para todas as solicitações
api.interceptors.request.use(function (config) {
  // Define os cabeçalhos CORS
  config.headers["Access-Control-Allow-Origin"] = "http://localhost:5173";
  config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
  config.headers["Access-Control-Allow-Headers"] =
    "Content-Type, Authorization";
  return config;
});

export default api;
