const errorFunction = (errorBit, msg, data) => {
  if (errorBit) return { is_error: errorBit, message: msg };
  return { is_error: errorBit, message: msg, data };
};

module.exports = errorFunction;
