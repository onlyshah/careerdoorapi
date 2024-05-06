const { DataTypes } = require('sequelize');
const sequelize = require('../db/DBconnection');
const companydetails = require('./companyDetails');
const jobseeker =sequelize.define('jobseeker', {
    userId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullname:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    mobile:{
        type: DataTypes.STRING,
    },
    country:{
        type: DataTypes.STRING,
    }, 
    state:{
        type: DataTypes.STRING,
    }, 
    city:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    education:{
        type: DataTypes.JSON,
        defaultValue: [],
      },
      candidatecv:{
        type: DataTypes.STRING,
        require:false
      },
})

module.exports = jobseeker;
