/* eslint-disable prefer-const */
const _ = require("lodash");
const ModOps = require("./modelHelpers");
const httpHelpers = require("../../utils/utils");
const AppError = require("../../utils/appError");
// eslint-disable-next-line no-unused-vars
const schema = require("./validations");

exports.identify = async (req, res) => {
//   try {
//     await schema.detailsSchema.validateAsync(req.body);
//   } catch (err) {
//     throw new AppError(err.message, 400);
//   }
  // remove empty and unwanted values
  const data = _.omitBy(
    req.body,
    (v) => _.isUndefined(v) || _.isNull(v) || v === ""
  );
  let details = await ModOps.getUserDetails(data);
  const response = httpHelpers.httpResponse(res, details);
  return res.json(response);
};
