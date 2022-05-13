const SessionModel = require("./session-model");

class SessionController {
  async create(req, res) {
    try {
      const { cpf, password } = req.body;
      const result = await SessionModel.createSession(cpf, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = SessionController;
