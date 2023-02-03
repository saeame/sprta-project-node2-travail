class CustomError extends Error {
  code = 0
  message = ''
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = {CustomError};