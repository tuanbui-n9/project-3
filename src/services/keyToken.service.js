'use strict';

const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });
      const filter = { user: userId };
      const update = {
        user: userId,
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true };
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return keyTokenModel.findOne({ user: userId });
  };

  static removeKeyById = async (id) => {
    return keyTokenModel.deleteOne(id);
  };
}

module.exports = KeyTokenService;
