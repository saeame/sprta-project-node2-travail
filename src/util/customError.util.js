class CustomError extends Error {
  status = 0
  message = ''
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = { CustomError };