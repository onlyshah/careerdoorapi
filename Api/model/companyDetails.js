const { DataTypes } = require('sequelize');
const sequelize = require('../db/DBconnection');
const companydetails =sequelize.define('companyDetails', {
    companyId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    companyname:{
        type: DataTypes.STRING,
    },
    companyemail:{
        type: DataTypes.STRING,
    },
    industryType:{
        type: DataTypes.STRING,
    },
    employeeNo:{
        type: DataTypes.STRING,
    },
    companywebsite:{
        type: DataTypes.STRING,
    },
    aboutcompany:{
        type: DataTypes.STRING,
    },
    companymobile:{
        type: DataTypes.STRING,
    },
    logo:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    address:{
        type: DataTypes.STRING,
    }

})
module.exports = companydetails;