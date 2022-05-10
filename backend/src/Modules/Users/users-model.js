const UserRepository = require("../../Infra/repository/user-repository");
const { hash, genSalt, compare } = require("bcryptjs");
const crypto = require("crypto");

class UsersModel {
  async getAll() {
    try {
      return UserRepository.readAll();
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(user) {
    try {
      const userExists = await this._getUserByCpf(user.cpf);
      if (userExists !== null) {
        return { status: 2, message: "Usuário já cadastrado" };
      }
      const token = crypto.randomBytes(40).toString("hex");
      user.senha = await this._encryptPassword(user.senha);
      user.user_token = token;
      user.funcao = "colaborador";
      user.status = true;
      if (!user.nome) {
        return { status: 3, message: "Favor informar nome" };
      } else {
        await UserRepository.createUser(user);
        return { status: 1, message: "Usuário criado com sucesso" };
      }
    } catch {
      return { status: 5, message: "Falha na criação de usuário" };
    }
  }

  async _getUserByCpf(cpf) {
    const user = await UserRepository.getByCpf(cpf);
    if (!user) {
      return null;
    }
    return user;
  }

  async _encryptPassword(password) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}

module.exports = new UsersModel();
