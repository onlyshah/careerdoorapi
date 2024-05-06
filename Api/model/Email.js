
const { DataTypes } = require('sequelize');
const Email = sequelize.define('Email', {
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  
  module.exports = Email;