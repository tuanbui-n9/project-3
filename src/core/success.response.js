'use strict';

const StatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
};

const ReasonPhrase = {
  OK: 'OK',
  CREATED: 'Created',
  NO_CONTENT: 'No Content',
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonPhrase.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

class Ok extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({ options = {}, message, metadata }) {
    super({ message, statusCode: StatusCode.CREATED, metadata });
    this.options = options;
  }
}

module.exports = {
  Ok,
  Created,
};
