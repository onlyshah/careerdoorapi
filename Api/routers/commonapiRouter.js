
const express = require('express');
const router = express.Router();
const fetchdata = require('../Controller/commonAPI')
router.get('/fetchdatabyIds/:companyId/:userId/:jobIdINT',fetchdata.getData);
router.get('/search',fetchdata.searchData);
router.post('/email',fetchdata.sendEmail);
module.exports = router;