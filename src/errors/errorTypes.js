class ValidationError extends Error {

  // This error is generated when a validation have failed
  constructor(message) {

    super(`The validation failed: ${message}`);
    this.name = 'ValidationError';
    this.status = 422;
    this.expose = true;

  }

}

class NotFoundError extends Error {

  // This error is generated when a record is nopt found in the db
  constructor(message) {

    super(`Not found: ${message}`);
    this.name = 'NotFoundError';
    this.status = 400;
    this.expose = true;

  }

}

class LoginError extends Error {

  // This error is generated when a login failed
  constructor() {

    super('Unable to login');
    this.name = 'LoginError';
    this.status = 401;
    this.expose = true;

  }

}

class NotAuthenticatedError extends Error {

  // This error is generated when the user is performing an action that require authentication but he/she is not
  constructor() {

    super('You need to be authenticated to perform this action');
    this.name = 'NotAuthenticatedError';
    this.status = 401;
    this.expose = true;

  }

}

class NotAuthorizeError extends Error {

  // This error is generated when the user is performing an unauthorized action
  constructor() {

    super('You are not authorize to perform this action');
    this.name = 'NotAuthorizeError';
    this.status = 403;
    this.expose = true;

  }

}

class EmailNotSentError extends Error {

  // This error is generated when tan email could not been sent
  constructor(message) {

    super(`Email could not been sent: ${message}`);
    this.name = 'EmailNotSentError';
    this.status = 500;
    this.expose = false;

  }

}

module.exports = {
  ValidationError,
  NotFoundError,
  LoginError,
  NotAuthenticatedError,
  NotAuthorizeError,
  EmailNotSentError
};
