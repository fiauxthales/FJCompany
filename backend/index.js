// Importações
const express = require("express");
const cors = require("cors");

const UsersRoutes = require("./src/Modules/Users/users-routes");
const SessionRoutes = require("./src/Modules/Session/session-routes");

// Inicialização express
const app = express();

// Desativação do cabeçalho 'x-powered-by'
app.disable("x-powered-by");

// habilitação do CORS
app.use(cors());

// Codificação da requisição para JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", [UsersRoutes, SessionRoutes]);

app.listen(8686, () => {
  console.log("Servidor rodando na porta 8686");
});
