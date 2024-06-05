'use strict';

const AccessService = require('../services/access.service');
const { Ok, Created } = require('../core/success.response');

class AccessController {
  signup = async (req, res, next) => {
    new Created({
      message: 'Signup success',
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
