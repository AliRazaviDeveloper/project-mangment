const bcrypt = require('bcrypt');
const hashString = (str) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
};

const compareHashString = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};

module.exports = {
  hashString,
  compareHashString,
};
