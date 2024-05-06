const { DataTypes } = require('sequelize');
const sequelize = require('../db/DBconnection');
const jobdetails =sequelize.define('jobdetails', {
    jobIdINT:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    jobtitle:{
        type: DataTypes.STRING,
    },
    joblocation:{
      type: DataTypes.STRING,
  },
  Education:{
    type: DataTypes.JSON,
    defaultValue: [],
  },
  Schedule:{
    type: DataTypes.JSON,
    defaultValue: [],
  },
  jobtype:{
    type: DataTypes.JSON,
    defaultValue: [],
},
peoplehire:{
  type: DataTypes.STRING,
},
startdate:{
  type: DataTypes.STRING,
},
lastdate:{
  type: DataTypes.STRING,
},
candidatesCV:{
  type: DataTypes.STRING,
},
showPayBy:{
  type: DataTypes.JSON,
  defaultValue: [],
},
SupplementalPay:{
  type: DataTypes.JSON,
  defaultValue: [],
},
Benefits:{
  type: DataTypes.JSON,
  defaultValue: [],
},
Skill:{
  type: DataTypes.JSON,
  defaultValue: [],
},
experience :{
  type: DataTypes.STRING,
},
Recruitmenttimeline:{
  type: DataTypes.STRING,
},
companyId: {
  type: DataTypes.INTEGER,
  references: {
      model: 'companydetails', // This is the referenced table name
      key: 'companyId'
  }
},
isDeleted:{
  type: DataTypes.BOOLEAN,
  defaultValue: false,
},
Jobdescription:{
  type: DataTypes.STRING(150000),
},


});



module.exports = jobdetails;