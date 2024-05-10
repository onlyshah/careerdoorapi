var express = require('express');
// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
 var app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(express.json());
const dbconnect= require('./Api/db/DBconnection.js');
const jobdetail = require('./Api/model/jobdetails');
const companydetail = require('./Api/model/companyDetails');
const jobseeker = require('./Api/model/jobseeker')
const jobApply = require('./Api/model/jobApply')
const jobDatailrouter = require('./Api/routers/jobdetailRouter.js')
const companyRouter = require('./Api/routers/companyRouter.js')
const jobseekerRouter = require('./Api/routers/jobseekerRouter.js')
const jobapplyRouter = require('./Api/routers/jobapplyRouter.js')
const comAPIRouter = require('./Api/routers/commonapiRouter.js')
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Header', '*');

   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Method', 'PUT,POST,PATCH,GET,DELETE');
      return res.status(200).json({})
   }
   next();
});
console.log(dbconnect);
dbconnect.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});
// Define and synchronize the User model
jobdetail.sync({ alter: true }) // Use { force: true } to drop and recreate tables
  .then(() => {
    console.log('jobDatail table is create successfully.');
  })
  .catch((err) => {
    console.error('An error occurred while synchronizing the models:', err);
  });
  // Define and synchronize the User model
companydetail.sync({ alter: true }) // Use { force: true } to drop and recreate tables
.then(() => {
  console.log('company Detail table is create successfully.');
})
.catch((err) => {
  console.error('An error occurred while synchronizing the models:', err);
});

jobseeker.sync({ alter: true }) // Use { force: true } to drop and recreate tables
.then(() => {
  console.log('job Seeker table is create successfully.');
})
.catch((err) => {
  console.error('An error occurred while synchronizing the models:', err);
});
jobApply.sync({ alter: true }) // Use { force: true } to drop and recreate tables
.then(() => {
  console.log('job Apply table is create successfully.');
})
.catch((err) => {
  console.error('An error occurred while synchronizing the models:', err);
});
var admin = require("firebase-admin");

var serviceAccount = require("./Api/db/firebasedatabase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://careerdoorapi-default-rtdb.firebaseio.com"
})
app.use('/company', companyRouter);
app.use('/jobs',jobDatailrouter);
app.use('/jobseeker',jobseekerRouter);
app.use('/jobApply',jobapplyRouter);
app.use('/comApi',comAPIRouter);
module.exports = app;