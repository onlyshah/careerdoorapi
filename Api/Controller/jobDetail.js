const jobdetail = require('../model/jobdetails');
const company = require('../model/companyDetails')
const jobApply = require('../model/jobApply');
exports.createjobDetails = async (req, res) => {
  console.log(req.body)
  const jobdata = new jobdetail({
    jobtitle: req.body.jobtitle,
    joblocation: req.body.joblocation,
    jobtype: req.body.jobtype,
    Schedule: req.body.Schedule,
    Education: req.body.Education,
    peoplehire: req.body.peoplehire,
    startdate: req.body.startdate,
    lastdate: req.body.lastdate,
    Recruitmenttimeline: req.body.Recruitmenttimeline,
    showPayBy: req.body.showPayBy,
    SupplementalPay: req.body.SupplementalPay,
    Benefits: req.body.Benefits,
    candidatesCV: req.body.candidatesCV,
    experience: req.body.experience,
    Skill: req.body.Skill,
    companyId: req.body.companyId,
    Jobdescription: req.body.Jobdescription
  })
  console.log('company', jobdata.dataValues)
  const task = await jobdetail.create(jobdata.dataValues);
  return res.json(task);

}
// exports.jobslist = async (req, res) => {
//   const page = parseInt(req.query.page, 10) || 1;;
//   const pageSize = parseInt(req.query.limit, 10) || 10;
//   console.log(page, pageSize)
//   const offset = (page - 1) * pageSize;
//   console.log(page, pageSize, offset)
//   try {
//     const totalLength = await jobdetail.count();
//     const jobInfo = await jobdetail.findAll({
//       limit: pageSize,
//       offset, } ,{include: [
//         {
//           model: company,
//           as: 'companyDetail', // Update the alias here
//           attributes: ['companyname', 'companyemail', 'logo', 'address'],
//         },
//       ],});
//       if (jobInfo) {
//         res.json([{
//           jobtitle: jobInfo.jobtitle,
//           joblocation: jobInfo.joblocation,
//           jobtype: jobInfo.jobtype,
//           Schedule: jobInfo.Schedule,
//           Education: jobInfo.Education,
//           peoplehire: jobInfo.peoplehire,
//           startdate: jobInfo.startdate,
//           lastdate: jobInfo.lastdate,
//           Recruitmenttimeline: jobInfo.Recruitmenttimeline,
//           showPayBy: jobInfo.showPayBy,
//           SupplementalPay: jobInfo.SupplementalPay,
//           Benefits: jobInfo.Benefits,
//           candidatesCV: jobInfo.candidatesCV,
//           experience: jobInfo.experience,
//           Skill: jobInfo.Skill,
//           companyId: jobInfo.companyId,
//           Jobdescription: jobInfo.Jobdescription,
//           company: jobInfo.companyDetail, // Update the alias here
//         }]);
//       } else {
//         res.status(404).json({ message: 'Product not found' });
//       }
      
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
exports.jobslist = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * pageSize;

  try {
    const totalLength = await jobdetail.count();
    const jobInfo = await jobdetail.findAll({
      limit: pageSize,
      offset,
      include: [
        {
          model: company,
          as: 'companyDetail',
          attributes: ['companyname', 'companyemail', 'industryType',
          'companywebsite', 'companymobile','aboutcompany',
           'logo', 'address'],
        },
      ],
    });

    if (jobInfo.length > 0) {
      const jobs = jobInfo.map((job) => ({
        jobIdINT: job.jobIdINT,
        jobtitle: job.jobtitle,
        joblocation: job.joblocation,
        jobtype: job.jobtype,
        Schedule: job.Schedule,
        Education: job.Education,
        peoplehire: job.peoplehire,
        startdate: job.startdate,
        lastdate: job.lastdate,
        Recruitmenttimeline: job.Recruitmenttimeline,
        showPayBy: job.showPayBy,
        SupplementalPay: job.SupplementalPay,
        Benefits: job.Benefits,
        candidatesCV: job.candidatesCV,
        experience: job.experience,
        Skill: job.Skill,
        companyId: job.companyId,
        Jobdescription: job.Jobdescription,
        isDeleted: job.isDeleted,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
        company: job.companyDetail,
      }));


      res.json({ jobs, totalLength });
    } else {
      res.status(404).json({ message: 'No jobs found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.jobbyId = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const jobInfo = await jobdetail.findOne({
      where: {  jobIdINT: jobId },
      include: [
        {
          model: company,
          as: 'companyDetail', // Ensure this alias matches the association definition
          attributes: ['companyId','companyname', 'companyemail','companymobile' ,'aboutcompany', 'industryType', 'logo', 'address'],
        },
      ],
    });
     console.log('jobInfo', jobInfo);
    if (jobInfo) {
      res.json([{
        jobIdINT: jobInfo.jobIdINT,
        jobtitle: jobInfo.jobtitle,
        joblocation: jobInfo.joblocation,
        jobtype: jobInfo.jobtype,
        Schedule: jobInfo.Schedule,
        Education: jobInfo.Education,
        peoplehire: jobInfo.peoplehire,
        startdate: jobInfo.startdate,
        lastdate: jobInfo.lastdate,
        Recruitmenttimeline: jobInfo.Recruitmenttimeline,
        showPayBy: jobInfo.showPayBy,
        SupplementalPay: jobInfo.SupplementalPay,
        Benefits: jobInfo.Benefits,
        candidatesCV: jobInfo.candidatesCV,
        experience: jobInfo.experience,
        Skill: jobInfo.Skill,
        companyId: jobInfo.companyId,
        Jobdescription: jobInfo.Jobdescription,
        company: jobInfo.companyDetail, // Update the alias here
      }]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
exports.updatejobdetailbyId = async (req, res) => {
  const jobId = req.params.jobId;
  console.log("id", jobId)
  try {
    const jobInfo = await jobdetail.findByPk(jobId);

    if (!jobInfo) {
      return res.status(404).json({ error: 'Job Details not found' });
    }

    // Assuming req.body contains the updated skills
    const updatedSkills = req.body.Skill ||req.body.Schedule;

    if (updatedSkills) {
      let currentSkills;
      currentSkills = JSON.parse(jobInfo.Skill||jobInfo.Schedule);
      console.log('updatedSkills', updatedSkills);
      console.log('currentSkills', currentSkills);
      const duplicates = updatedSkills.filter(skill =>
        currentSkills.some(existingSkill => existingSkill.value === skill.value)
      );
     console.log('duplicate', duplicates);
      if (duplicates.length > 0) {
        return res.status(400).json({ error: 'Duplicate skills found' });
      }
      else{
        let combinedSkills = [...currentSkills, ...updatedSkills];
        console.log(combinedSkills);
        await jobdetail.update({ Skill: combinedSkills }||
          { Schedule: combinedSkills },
          {
            where: { jobIdINT: jobId }
          })
          res.json('update')
      }
       
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
exports.detelejobDetail = async (req, res) => {
  const jobId = req.params.jobId;
  //console.log("jobId",jobId)
  
    const jobInfo = await jobdetail.findByPk(jobId);
    //console.log("jobInfo" ,jobInfo)
    try{
    if (!jobInfo) {
      return res.status(404).json({ error: 'Job Details not found' });
    }
    console.log("Request",req.body.isDeleted)
    const isDeleted = req.body.isDeleted
     await jobdetail.update(
      { isDeleted:isDeleted},
      {
        where: { jobIdINT: jobId }
      })
    
    res.status(200).json({ message: 'Record marked as deleted.'});
    }
    catch(error){
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });

    }
}

