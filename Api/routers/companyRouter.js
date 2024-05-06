const express = require('express');
const router = express.Router();
const companyDatail = require('../Controller/compnayDetails')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/companylogo')
    },
    filename: function (req, file, cb) {
        const date = new Date();
        cb(null, ('companylogo'+date.getUTCFullYear()+'-'+ date.getUTCMonth()+'-'+ date.getDate()+'-' +file.originalname).toString())
     
    }
  })
  const fileFilter =( req, file , cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
                cb(null, true)
            }
            else{
                cb(null, false)
            }
}
  
const upload = multer({ storage: storage ,FileFilter:fileFilter })
router.post('/addcompany', upload.single('logo'),companyDatail.createcompanyDetails);
router.post('/companyLogin',companyDatail.companyLogin);
router.get('/companydetailpkId/:companyId',companyDatail.companydetailpkId);
router.put('/updatecompanydetail/:companyId',companyDatail.updatecompanydetailbyId);
router.get('/companylist',companyDatail.companylist);
router.post('/companypassword', companyDatail.changePassword);
//router.get('/companybyIds/:companyId',companyDatail.companybymultipleID);
module.exports = router;