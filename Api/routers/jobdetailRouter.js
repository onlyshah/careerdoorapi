const express = require('express');
const router = express.Router();
const jobDatail = require('../Controller/jobDetail')



router.post('/jobpost',jobDatail.createjobDetails);
router.get('/joblist', jobDatail.jobslist);
router.get('/jobbypkId/:jobId', jobDatail.jobbyId);
router.put('/joblist/:jobId', jobDatail.updatejobdetailbyId);
router.post('/deletejoblist/:jobId', jobDatail.detelejobDetail);
//router.get('/jobbyId/:jobId', jobDatail.jobbymultipleID);


module.exports = router;