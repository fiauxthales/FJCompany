const router = require('express').Router();
const UsersController = require('./users-controller');

const usersController = new UsersController();

router.get('/users', usersController.index);

module.exports = router;