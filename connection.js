const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connect_to_mongoDb(url){
  return mongoose.connect(url);
}

module.exports = {
  connect_to_mongoDb,
};