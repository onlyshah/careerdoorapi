const express = require('express');
const router = express.Router();
const apply = require('../Controller/jobApply')
/**
 * @swagger
 * /jobApply/jobapply:
 *   post:
 *     summary: Apply for a job
 *     tags: [JobApply]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               jobIdINT:
 *                 type: integer
 *               companyId:
 *                   type: integer
 *               applied:
 *                 type: boolean
 * 
 *     responses:
 *       200:
 *         description: Job application created successfully
 */
router.post('/jobapply', apply.createjobApply);
/**
 * @swagger
 * /jobApply/jobapplylist:
 *   get:
 *     summary: Get a list of job applications
 *     tags: [JobApply]
 *     responses:
 *       200:
 *         description: List of job applications
 */
router.get('/jobapplylist', apply.jobApplylist);
router.get('/jobapplybyuId/:userId', apply.appliedjobbyuserId);
router.get('/jobstatus/:userId', apply.getStatusbyUDI);
router.put('/updatejobstatus/:userId', apply.updatejobstatus);
router.get('/jobstatusjId/:jobId', apply.getStatusbyjobDI);
module.exports = router;