async function getUserDetails(data) {
  const details = { phoneNumber: data.phoneNumber, email: data.email };
  return details;
}
module.exports = { getUserDetails };
