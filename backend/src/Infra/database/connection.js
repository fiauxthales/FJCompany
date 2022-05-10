// PostgreSQL
const sql_config = {
  client: "pg",
  connection: {
    user: "postgres",
    password: "senha",
    host: "127.0.0.1",
    database: "fjcompany",
  },
};

const Sqn_Conn_Central = require("knex")(sql_config);

module.exports = {
  Sqn_Conn_Central,
};
