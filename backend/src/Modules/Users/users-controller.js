const UsersModel = require("./users-model");

class UsersController {
  async index(req, res) {
    const users = await UsersModel.getAll();
    return res.json(users);
  }

  async create(req, res) {
    try {
      const user = req.body;
      const cadastro = await UsersModel.createUser(user);
      if (cadastro.status === 1) {
        return res
          .status(200)
          .json({ status: 1, message: "Usuário devidamente cadastrado" });
      } else {
        return res.status(200).json(cadastro);
      }
    } catch {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UsersController;
