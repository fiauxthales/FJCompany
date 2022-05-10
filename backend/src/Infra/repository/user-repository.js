const { Sqn_Conn_Central } = require('../database/connection');

module.exports = new (class UserRepository {
  readAll(){
    return Sqn_Conn_Central.select('*').table('users');
  }

  getByCpf(cpf){
    return Sqn_Conn_Central.select('cpf', 'senha', 'funcao', 'status', 'user_token')
      .table('users')
      .where('cpf', cpf)
      .first();
  }
})();