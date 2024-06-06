'use strict';

const AccessService = require('../services/access.service');
const { Ok, Created, SuccessResponse } = require('../core/success.response');

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      message: 'Login success',
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
  signup = async (req, res, next) => {
    new Created({
      message: 'Signup success',
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
  logout = async (req, res, next) => {
    new Ok({
      message: 'Logout success',
      metadata: await AccessService.logout({keyStore: req.keyStore}),
    }).send(res);
  };
}

module.exports = new AccessController();
