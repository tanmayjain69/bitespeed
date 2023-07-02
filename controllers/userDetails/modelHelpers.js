const model = require("../../models/UserDetailModel");

async function getUserDetails(data) {
  const details = { phoneNumber: data.phoneNumber, email: data.email };
  const query = "SELECT * FROM user_details;";
  const res = await model.get(query);
  return res;
}
module.exports = { getUserDetails };
