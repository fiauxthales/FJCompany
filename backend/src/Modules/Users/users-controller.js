const UsersModel = require('./users-model');

class UsersController{
  async index(req, res){
    const users = await UsersModel.getAll();
    return res.json(users);
  }
}

module.exports = UsersController;