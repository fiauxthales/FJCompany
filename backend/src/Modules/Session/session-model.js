const UserRepository = require("../../infra/repository/user-repository");
const { hash, genSalt, compare } = require("bcryptjs");
const crypto = require("crypto");

class SessionModel {
  async createSession(cpf, password) {
    try {
      const user = await this._getUserByCpf(cpf);
      if (user === null) {
        const error = { status: 2, erro: "Usuário Inválido" };
        return error;
      }
      if (user.status === 0) {
        const error = { status: 3, erro: "Usuário desabilitado" };
        return error;
      }
      const isValid = await compare(password, user.senha);
      //const isValid = Boolean(password === user.senha);
      if (!isValid) {
        const error = { status: 4, erro: "senha inválida" };
        return error;
      }
      const authentication = {
        status: 1,
        token: user.token,
        funcao: user.funcao,
      };
      return authentication;
    } catch {
      return { status: 5, erro: "Falha no servidor" };
    }
  }

  async _getUserByCpf(cpf) {
    const user = await UserRepository.getByCpf(cpf);
    if (!user) {
      return null;
    }
    return user;
  }
}

module.exports = new SessionModel();
