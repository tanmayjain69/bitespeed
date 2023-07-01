exports.httpResponse = (res, data = [], message = "success", code = 0) => {
  const response = { results: { data }, errors: { code, msg: message } };
  const header = {
    "Content-Type": "application/json",
    charset: "utf-8",
  };
  res.set(header);
  return response;
};
