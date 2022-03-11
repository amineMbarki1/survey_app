class HttpError extends Error {
  constructor(message, httpCode, field = null) {
    super(message);
    this.httpCode = httpCode;
    this.field = field;
  }
}

module.exports = HttpError;
