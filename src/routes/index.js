class CustomError extends Error {
  code = 0;
  message = '';
  constructor(code, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = { CustomError };
