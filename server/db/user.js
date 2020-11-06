const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const db = require("./database");

const User = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://bit.ly/32fMCPl",
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

User.generateHash = (password) => {
  return bcrypt.hashSync(password);
};

User.prototype.validPassword = (password) => {
  return bcrypt.compare(password, this.password);
};

module.exports = User;
