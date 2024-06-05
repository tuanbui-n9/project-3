'use strict';

const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: '1h',
    });
    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: '7 days',
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`[P]::errorVerify::`, err);
      } else {
        console.log(`[P]::accessToken::`, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

module.exports = {
  createTokenPair,
};
