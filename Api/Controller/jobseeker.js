const jobseekerDeails = require('../model/jobseeker');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'careerdoor';
exports.createjobseeker = async (req, res) => {
    console.log(req.file.path); // Log the file information
    console.log(req.body)
    const isEmpty = await jobseekerDeails.count() === 0;
    if (isEmpty) {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            else {
                const jobseeker = new jobseekerDeails({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    country: req.body.country,
                    state: req.body.state,
                    city: req.body.city,
                    education: req.body.education,
                    candidatecv: req.file.path,
                    password: hash
                })
                console.log('userdata', jobseeker.dataValues)
                const task = await jobseekerDeails.create(jobseeker.dataValues);
                return res.json(task);
            }
        })

    }
    else {
        // Table is not empty, check if the email already exists
        let email = req.body.email;
        const emailExists = await jobseekerDeails.findOne({ where: { email: email } });
        if (emailExists) {
            return res.status(500).json({ error: 'Email is already taken' });;
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                else {
                    const jobseeker = new jobseekerDeails({
                        fullname: req.body.fullname,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        country: req.body.country,
                        state: req.body.state,
                        city: req.body.city,
                        education: req.body.education,
                        candidatecv: req.file.path,
                        password: hash
                    })
                    console.log('userData', jobseeker)
                    const task = await jobseekerDeails.create(jobseeker.dataValues);
                    return res.json(task);
                }
            })
        }
    }
}
exports.jobseekerLogin =  async (req, res) => {
    const { password } = req.body;
     let email =req.body.email
    try {
      const user = await jobseekerDeails.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      
      const token = jwt.sign({ userIdINT: user.userIdINT }, secretKey, { expiresIn: '1h' });
      let userId = user.userId
      let userName = user.fullname
      let useremail = user.email
      console.log('userData',user)
      res.json({ message: 'jobseeker Login successful', token ,userId ,userName , useremail,type:'jobseeker'});
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
exports.JobseekerbyId = async(req,res)=>{
const jobId = req.params.jobIdINT;
  console.log(jobId ,req.body)
  console.log("id",jobId)
  try {
  const jobseekerInfo = await jobseekerDeails.findByPk(jobId);
  res.json(jobseekerInfo)
  console.log("jobseekerInfo",jobseekerInfo)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
        
} 
exports.changePassword = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await jobseekerDeails.findByPk(userId);

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

