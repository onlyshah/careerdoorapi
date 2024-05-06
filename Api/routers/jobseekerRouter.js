const express = require('express');
const router = express.Router();
const jobseeker = require('../Controller/jobseeker')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/resumes')
    },
    filename: function (req, file, cb) {
        const date = new Date();
        cb(null, ('resumes'+date.getUTCFullYear()+'-'+ date.getUTCMonth()+'-'+ date.getDate()+'-' +file.originalname).toString())
     
    }
  })
  const fileFilter =( req, file , cb)=>{
    if(file.mimetype === 'doc' || file.mimetype === 'docx' || file.mimetype === 'pdf'){
                cb(null, true)
            }
            else{
                cb(null, false)
            }
}
  
const upload = multer({ storage: storage ,FileFilter:fileFilter })
router.post('/jobseeker', upload.single('candidatecv'),jobseeker.createjobseeker);
router.post('/jobseekerLogin',jobseeker.jobseekerLogin);
router.get('/jobseeker/:jobIdINT',jobseeker.JobseekerbyId
);

router.post('/companypassword', jobseeker.changePassword);
module.exports = router;