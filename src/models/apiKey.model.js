'use strict';

'use strict';

const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'apiKeys';

const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      require: true,
      enum: ['0000', '1111', '2222'],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, apiKeySchema);
