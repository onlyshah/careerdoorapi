const Sequelize = require('sequelize');
let sequelize = new Sequelize('careerdoor',
'careerdoor',
 'mysql', {
  host: 'localhost', // Your MySQL host
  dialect: 'mysql',
  logging: true, // Set to true if you want to see SQL logs
});

module.exports = sequelize