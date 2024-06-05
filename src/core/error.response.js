'use strict';

const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
  BAD_REQUEST: 400,
};

const ReasonPhrase = {
  FORBIDDEN: 'Forbidden Error',
  CONFLICT: 'Conflict Error',
  BAD_REQUEST: 'Bad Request Error',
};

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrase.CONFLICT,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrase.BAD_REQUEST,
    statusCode = StatusCode.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
};
