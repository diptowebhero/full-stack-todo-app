//dependencies
const bcrypt = require("bcrypt");

const hashStr = async (str) => {
  try {
    return await bcrypt.hash(str, 8);
  } catch (error) {
    throw error;
  }
};

module.exports = hashStr;
