const express = require('express');
const router = express.Router();
const apply = require('../Controller/jobApply')
router.post('/jobapply', apply.createjobApply);
router.get('/jobapplylist', apply.jobApplylist);
router.get('/jobapplybyuId/:userId', apply.appliedjobbyuserId);
router.get('/jobstatus/:userId', apply.getStatusbyUDI);
router.put('/updatejobstatus/:userId', apply.updatejobstatus);
router.get('/jobstatusjId/:jobId', apply.getStatusbyjobDI);
module.exports = router;