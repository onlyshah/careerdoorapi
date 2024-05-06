const apply = require('../model/jobApply');
const company = require('../model/companyDetails');
const jobdetail = require('../model/jobdetails');


exports.createjobApply = async (req, res) => {
    // console.log(req.body)
    const jobapply = new apply({
        companyId:req.body.companyId,
        userId:req.body.userId,
        jobIdINT:req.body.jobIdINT,
        applied:req.body.applied
    })
    console.log(jobapply)
    const task = await apply.create(jobapply.dataValues);
    return res.json({task, message: "Applied successfully"});
}
exports.jobApplylist = async (req, res) => {
    try {
      const jobapplyInfo = await apply.findAll();
      console.log("jobInfo", jobapplyInfo)
      if (jobapplyInfo) {
        res.json({jobapplyInfo});
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  exports.appliedjobbyuserId = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId, req.body);
    console.log("id", userId);
    try {
      const AppliedjobInfo = await apply.findOne({
        where: { userId: userId },
        include: [
         {
            model: company,
            as: 'companyDetail', // Ensure this alias matches the association definition
            attributes: ['companyname', 'companyemail', 'aboutcompany', 'industryType', 'logo', 'address'],
          }, 
          {
            model: jobdetail,
            as: 'jobdetail', // Ensure this alias matches the association definition
          
          },
          {
            model: jobapply,
            as: 'jobApply', // Ensure this alias matches the association definition
          
          },
        ],
      });
      res.status(200).json(AppliedjobInfo);
      console.log("jobseekerInfo", AppliedjobInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  exports.getStatusbyUDI = async (req, res) => {
    const userId = req.params.userId;
    try {
      const AppliedjobInfo = await apply.findOne({
        where: { userId: userId },
      });
      res.status(200).json(AppliedjobInfo);
    } catch (error) {
      // Handle error here
      res.status(500).json({ message: "Error fetching applied job info" });
    }
  };
  exports.getStatusbyjobDI = async (req, res) => {
    const jobId = req.params.jobId;
    console.log('jobId',jobId)
    try {
      const AppliedjobInfo = await apply.findOne({
        where: { jobIdINT: jobId },
      });
      res.status(200).json(AppliedjobInfo);
    } catch (error) {
      // Handle error here
      res.status(500).json({ message: "Error fetching applied job info" });
    }
  };
  exports.updatejobstatus =async(req ,res)=>{
    const userId = req.params.userId;
    console.log(userId ,req.body)
    console.log("id",userId)
    let offer = req.body.offer
    if(offer){
    try {
      await apply.update({ applied: req.body.applied , offer:req.body.offer }, { where: { userId } });
      return { success: true, message: 'Applied status updated successfully' };
    } catch (error) {
      console.error('Error updating applied status:', error);
      return { success: false, message: 'Failed to update applied status' };
    }
    }
    let interview = req.body.interview
    if(interview){
      try {
        await apply.update({offer:req.body.offer, interview: req.body.interview }, { where: { userId } });
        return { success: true, message: 'Applied status updated successfully' };
      } catch (error) {
        console.error('Error updating applied status:', error);
        return { success: false, message: 'Failed to update applied status' };
      }
      }
      let rejected = req.body.rejected
      if(rejected){
        try {
          await apply.update({rejected:req.body.rejected, interview: req.body.interview }, { where: { userId } });
          return { success: true, message: 'Applied status updated successfully' };
        } catch (error) {
          console.error('Error updating applied status:', error);
          return { success: false, message: 'Failed to update applied status' };
        }
       }
       let saveapply = req.body.saveapply
       if(saveapply){
        try {
          await apply.update({save:req.body.save, applied: req.body.saveapply }, { where: { userId } });
          return { success: true, message: 'Applied status updated successfully' };
        } catch (error) {
          console.error('Error updating applied status:', error);
          return { success: false, message: 'Failed to update applied status' };
        }
       }
  }