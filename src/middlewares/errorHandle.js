// Middleware de tratamento de erro
const errorHandle = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = statusCode;
  res.json({
    message: error.message,
    trace: process.env.NODE_ENV === "production" ? "🤓" : error.trace,
  });
};

module.exports = errorHandle;
