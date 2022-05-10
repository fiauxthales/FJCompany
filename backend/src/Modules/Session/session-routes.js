const router = require("express").Router();
const SessionController = require("./session-controller");

const sessionController = new SessionController();

router.post("/session", sessionController.create);

module.exports = router;
