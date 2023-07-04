class CustomError extends Error {
  /**
   *
   * @param {string} message
   * @param {number} code
   */
  constructor(message, code) {
    super(message);
    this.statusCode = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
