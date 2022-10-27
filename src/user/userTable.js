const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const User = sequelize.define("User", {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User