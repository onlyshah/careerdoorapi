const companydetail = require('../model/companyDetails');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jobdetails = require('../model/jobdetails');
// const jobdetails = require('../model/jobdetails');
const secretKey = 'careerdoor';

exports.createcompanyDetails = async (req, res) => {
  console.log(req.file); // Log the file information
  console.log(req.body);

  // Combine email and mobile number checks for efficiency
  const [emailExists, mobileExists] = await Promise.all([
    companydetail.findOne({ where: { companyemail: req.body.companyemail } }),
    companydetail.findOne({ where: { companymobile: req.body.companymobile } }),
  ]);

  if (emailExists || mobileExists) {
    const errorMessage = emailExists ? 'Email is already taken' : 'Mobile number is already registered';
    return res.status(422).json({ error: errorMessage });
  }

  // If both checks pass, proceed with company creation
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    const company = new companydetail({
      companyname: req.body.companyname,
      companyemail: req.body.companyemail,
      industryType: req.body.industryType,
      employeeNo: req.body.employeeNo,
      companywebsite: req.body.companywebsite,
      aboutcompany: req.body.aboutcompany,
      companymobile: req.body.companymobile,
      logo: req.file.path,
      password: hash,
      address: req.body.address,
    });

    console.log('company', company.dataValues);
    const task = await companydetail.create(company.dataValues);
    return res.json(task);
  });
}

exports.companyLogin =  async (req, res) => {
  const { companyemail, password } = req.body;


  try {
    const companyuser = await companydetail.findOne({ where: { companyemail } });

    if (!companyuser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, companyuser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    const token = jwt.sign({ companyId: companyuser.companyId }, secretKey, { expiresIn: '1h' });
    let companyId = companyuser.companyId
    let companyname = companyuser.companyname
    //let companyemail = companyuser.companyemail
    console.log("email",companyuser.companyemail)

    res.json({ message: 'Company Login successful', token ,companyId ,companyemail, companyname ,type:'admin'});
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}
exports.companydetailpkId =async(req ,res)=>{
  const compayId = req.params.companyId;
  console.log("id",compayId)
  try {
  const companyInfo = await companydetail.findByPk(compayId);
  console.log("companyInfo",companyInfo)
    if (companyInfo) {
      res.json([{
        companyId: companyInfo.companyId,
        companyname: companyInfo.companyname,
        companyemail:companyInfo.companyemail,
        industryType:companyInfo.industryType,
        employeeNo:companyInfo.employeeNo,
        companywebsite:companyInfo.companywebsite,
        aboutcompany:companyInfo.aboutcompany,
        companymobile:companyInfo.companymobile,
        logo:companyInfo.logo
   
       
      }]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.Getcompanydetail =async(req ,res)=>{
  try {
  const companyInfo = await companydetail.findAll();
  console.log("companyInfo",companyInfo)
    if (companyInfo) {
      res.json([{
        companyId: companyInfo.companyId,
        companyname: companyInfo.companyname,
        companyemail:companyInfo.companyemail,
        industryType:companyInfo.industryType,
        employeeNo:companyInfo.employeeNo,
        companywebsite:companyInfo.companywebsite,
        aboutcompany:companyInfo.aboutcompany,
        companymobile:companyInfo.companymobile,
        logo:companyInfo.logo
   
       
      }]);
    } else {
      res.status(404).json({ message: 'company not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.companylist =async(req ,res)=>{
  try {
    const companyInfo = await companydetail.findAll();
    console.log("jobInfo",companyInfo)
    if (companyInfo) {
      res.json(companyInfo);
    } else {
      res.status(404).json({ message: 'data not found' });
    }
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
exports.updatecompanydetailbyId =async(req ,res)=>{
  const compayId = req.params.companyId;
  console.log(compayId ,req.body)
  console.log("id",compayId)
  try {
  const companyInfo = await companydetail.findByPk(compayId);
  console.log("companyInfo",companyInfo)
  if (!companyInfo) {
    return res.status(404).json({ error: 'User not found' });
  }
    if (companyInfo) {
      res.json([{
        companyId: companyInfo.companyId,
        companyname: companyInfo.companyname,
        companyemail:companyInfo.companyemail,
        industryType:companyInfo.industryType,
        employeeNo:companyInfo.employeeNo,
        companywebsite:companyInfo.companywebsite,
        aboutcompany:companyInfo.aboutcompany,
        companymobile:companyInfo.companymobile,
        logo:companyInfo.logo
   
       
      }]);
      await companydetail.update({companyInfo}, {
        where: { companyId:compayId }
      })
    } 
    else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
}
exports.changePassword = async (req, res) => {
  const { companyId, currentPassword, newPassword } = req.body;

  try {
      // Find the user by ID
      const user = await companydetail.findByPk(companyId);

      // If user not found
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Compare current password
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);

      if (!passwordMatch) {
          return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password in the database
      await user.update({ password: hashedPassword });

      return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};
companydetail.hasMany(jobdetails, { foreignKey: 'companyId' });
jobdetails.belongsTo(companydetail, { foreignKey: 'companyId' });