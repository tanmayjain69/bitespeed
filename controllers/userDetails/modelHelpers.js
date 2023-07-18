const model = require("../../models/UserDetailModel");

async function create(data) {
  const { phoneNumber, email } = data;
  const query = `INSERT INTO user_details (phoneNumber, email, linkedId, linkPrecedence) VALUES ('${phoneNumber}', '${email}', null, 'primary')`;
  const res = await model.execute(query);
  return res;
}
async function update(data) {
  const { phoneNumber, email, linkedId } = data;
  const updateStr = [];
  if (phoneNumber) {
    updateStr.push(`phoneNumber = '${phoneNumber}'`);
  }
  if (email) {
    updateStr.push(`email = '${email}'`);
  }
  updateStr.push(`linkedId = '${linkedId || null}'}'`);
  updateStr.push(`linkPrecedence = 'secondary'`);
  const query = `INSERT UPDATE user_details SET ${updateStr.join(
    ", "
  )} WHERE phoneNumber = '${phoneNumber}' OR email = '${email};'`;
  const res = await model.execute(query);
  return res;
}
async function getUserDetails(data) {
  const { phoneNumber, email } = data;
  const query = `SELECT * FROM user_details WHERE phoneNumber = '${phoneNumber}' OR email = '${email};'`;
  const res = await model.execute(query);
  const contact = {};
  if (res.length > 0) {
    contact.primaryContatctId = res.filter(
      (item) => item.linkPrecedence === "primary"
    )[0].id;
    contact.secondaryContatctId = res
      .filter((item) => item.linkPrecedence === "secondary")
      .map((item) => item.id);
    contact.emails = res.map((item) => item.email);
    contact.phoneNumbers = res.map((item) => item.phoneNumber);
    if (contact.secondaryContatctId.length > 0) {
      await update(data);
    }
  } else {
    const result = await create(data);
    contact.emails = [email];
    contact.primaryContatctId = result.insertId;
    contact.secondaryContatctId = [];
    contact.phoneNumbers = [phoneNumber];
  }
  return contact;
}
module.exports = { getUserDetails };
