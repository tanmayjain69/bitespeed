const sql = require("../utils/db");

async function get(query) {
  return new Promise((resolve, reject) => {
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      }
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
}
module.exports = { get };
