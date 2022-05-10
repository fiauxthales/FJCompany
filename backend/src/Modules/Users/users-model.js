const UserRepository = require("../../Infra/repository/user-repository");

class UsersModel {
  async getAll() {
    try {
      return UserRepository.readAll();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UsersModel();
