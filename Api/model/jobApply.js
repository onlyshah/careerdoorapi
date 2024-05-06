const { DataTypes } = require('sequelize');
const jobdetail = require('../model/jobdetails');
const sequelize = require('../db/DBconnection');
const jobapply = sequelize.define('jobApply', {
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'companydetails', // This is the referenced table name
            key: 'companyId'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'jobseekers', // This is the referenced table name
            key: 'userId'
        }
    },
    jobIdINT: {
        type: DataTypes.INTEGER,
        references: {
            model: 'jobdetails', // This is the referenced table name
            key: 'jobIdINT'
        }
        
    },
    save: {
        type: DataTypes.STRING,
        defaultValue: false
    },
    applied: {
        type: DataTypes.STRING,
        defaultValue: false
    },
    rejected: {
        type: DataTypes.STRING,
        defaultValue: false
    },
    interview: {
        type: DataTypes.STRING,
        defaultValue: false
    },
    offer: {
        type: DataTypes.STRING,
        defaultValue: false
    }
});
// Define the associations
jobapply.belongsTo(require('./companyDetails'), { foreignKey: 'companyId', onDelete: 'CASCADE' });
jobapply.belongsTo(require('./jobseeker'), { foreignKey: 'userId', onDelete: 'CASCADE' });
jobapply.belongsTo(require('./jobdetails'), { foreignKey: 'jobIdINT', onDelete: 'CASCADE' });


module.exports = jobapply;