const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost/async_project", {
    logging: false,
  });

module.exports = db;
