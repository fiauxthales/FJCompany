const { Sqn_Conn_Central } = require("../database/connection");

module.exports = new (class UserRepository {
  readAll() {
    return Sqn_Conn_Central.select(
      "id",
      "nome",
      "cpf",
      "equipe",
      "funcao",
      "status"
    ).table("users");
  }

  createUser(user) {
    return Sqn_Conn_Central("users").insert(user);
  }

  getByCpf(cpf) {
    return Sqn_Conn_Central.select(
      "cpf",
      "senha",
      "funcao",
      "status",
      "user_token"
    )
      .table("users")
      .where("cpf", cpf)
      .first();
  }
})();
