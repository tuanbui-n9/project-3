'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError } = require('../core/error.response');

const RoleShop = {
  SHOP: 'SHOP',
  WRITE: 'WRITE',
  EDIT: 'EDIT',
  READ: 'READ',
};

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    const holderShop = await shopModel.findOne({ email }).lean();
  };

  static signUp = async ({ name, email, password }) => {
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError('Error: Shop already registered');
    }

    console.log(3333);
    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      role: [RoleShop.SHOP],
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        return {
          code: 'xxxx',
          message: 'Failed to create key token',
        };
      }

      const tokens = await createTokenPair(
        { userId: newShop._id },
        publicKey,
        privateKey
      );

      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: ['_id', 'name', 'email'],
            object: newShop,
          }),
          tokens,
        },
      };
    }

    return {
      code: 200,
      metadata: null,
    };
  };
}

module.exports = AccessService;
