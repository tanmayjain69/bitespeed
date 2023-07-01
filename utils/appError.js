class AppError extends Error {
  constructor(code, message, data = []) {
    super(message);
    this.isCustom = true;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

module.exports = AppError;
