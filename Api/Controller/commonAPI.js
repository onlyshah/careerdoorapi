const companydetails = require('../model/companyDetails');
const jobseekers = require('../model/jobseeker');
const jobdetails = require('../model/jobdetails');
const jobapply = require('../model/jobApply');
const { Op } = require('sequelize');
const Mailgun = require('mailgun-js');
const formData = require('form-data');

const mailgunApiKey = 'babf0e91191042d22d96571022654569-2175ccc2-1deb89ce';
const mailgunDomain = 'sandbox-123.mailgun.org'; // Update this with your Mailgun domain

const mailgunInstance = Mailgun({
  apiKey: mailgunApiKey,
  domain: mailgunDomain
});


exports.getData = async (req, res) => {
  const companyId = req.params.companyId.split(',');
  const userId = req.params.userId.split(',');
  const jobIdINT = req.params.jobIdINT.split(',');
//   try {
      const data = await jobapply.findAll({
          where: {
              companyId: companyId,
              userId: userId,
              jobIdINT: jobIdINT
          },
          include: [
              { model: companydetails, as: 'companyDetail' },
              { model: jobseekers, as: 'jobseeker' },
              { model: jobdetails, as: 'jobdetail' }, // Updated alias here
             // { model: jobapply, as: 'jobApply' }
          ]
      });

      res.status(200).json(data);
//   } catch (error) {
//       res.status(500).json({ message: 'Server Error' });
//   }
};


exports.searchData = async (req, res) => {
    try {
        console.log("Query Param : ", req.query);
        const queryParam = req.query.searchValue.toLowerCase(); // Convert searchValue to lowercase
        console.log("Query Param : ", queryParam);

        const allJobs = await jobdetails.findAll(
            {include: [
                {
                  model: companydetails,
                  as: 'companyDetail',
                  attributes: ['companyname', 'companyemail', 'industryType',
                  'companywebsite', 'companymobile','aboutcompany',
                   'logo', 'address'],
                },
              ],}
        );

        // Filter jobs with case-insensitive comparison for all fields
        const filteredJobs = allJobs.filter(item => {
            const lowerCaseItem = {
                ...item,
                jobtitle: (item.jobtitle || '').toString().toLowerCase(),
                joblocation: (item.joblocation || '').toString().toLowerCase(),
                Education: item.Education ? JSON.parse(item.Education) : [],
                Schedule: item.Schedule ? JSON.parse(item.Schedule) : [],
                jobtype: item.jobtype ? JSON.parse(item.jobtype) : [],
                showPayBy: item.showPayBy ? JSON.parse(item.showPayBy) : [],
                SupplementalPay: item.SupplementalPay ? JSON.parse(item.SupplementalPay) : [],
                Benefits: item.Benefits ? JSON.parse(item.Benefits) : [],
                Skill: item.Skill ? JSON.parse(item.Skill) : []
            };

            return (
                lowerCaseItem.jobtitle.includes(queryParam) ||
                lowerCaseItem.joblocation.includes(queryParam) ||
                lowerCaseItem.Education.some(edu => typeof edu.study === 'string' && edu.study.toLowerCase().includes(queryParam)) ||
                lowerCaseItem.Schedule.some(schedule => typeof schedule.schedule === 'string' && schedule.schedule.toLowerCase().includes(queryParam)) ||
                lowerCaseItem.jobtype.some(jtype => typeof jtype.jtype === 'string' && jtype.jtype.toLowerCase().includes(queryParam)) ||
                (lowerCaseItem.peoplehire || '').toString().toLowerCase().includes(queryParam) ||
                (lowerCaseItem.startdate || '').toString().toLowerCase().includes(queryParam) ||
                (lowerCaseItem.lastdate || '').toString().toLowerCase().includes(queryParam) ||
                (lowerCaseItem.candidatesCV || '').toString().toLowerCase().includes(queryParam) ||
                lowerCaseItem.showPayBy.some(pay => typeof pay.Maximum === 'string' && pay.Maximum.toLowerCase().includes(queryParam) || typeof pay.Minimum === 'string' && pay.Minimum.toLowerCase().includes(queryParam)) ||
                lowerCaseItem.SupplementalPay.some(suppay => typeof suppay.suppay === 'string' && suppay.suppay.toLowerCase().includes(queryParam)) ||
                lowerCaseItem.Benefits.some(benefit => typeof benefit.benefit === 'string' && benefit.benefit.toLowerCase().includes(queryParam)) ||
                lowerCaseItem.Skill.some(skill => typeof skill.value === 'string' && skill.value.toLowerCase().includes(queryParam)) ||
                (lowerCaseItem.experience || '').toString().toLowerCase().includes(queryParam) ||
                (lowerCaseItem.Recruitmenttimeline || '').toString().toLowerCase().includes(queryParam) ||
                (lowerCaseItem.company || '').toString().toLowerCase().includes(queryParam) ||
                (lowerCaseItem.Jobdescription || '').toString().toLowerCase().includes(queryParam)
            );
        });

        res.json(filteredJobs);
        console.log(filteredJobs);

    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.sendEmail = async (req, res) => {
  const { email, subject, body } = req.body;
  console.log(req.body)

  try {
    const mailgunApiKey = 'af14cc9a4a17cace076a8b7803f950bb-2175ccc2-232b42ed';
    const mailgunDomain = 'sandbox1b5346d8cbed460e8101a190d6868ec4.mailgun.org';

    const mailgunInstance = Mailgun({
      apiKey: mailgunApiKey,
      domain: mailgunDomain
    });

   const response = await mailgunInstance.messages().send(req.body);
    console.log('Email sent successfully:', response);

    res.status(200).send('Email sent successfully!');
  } catch (error) {
    // Handle specific error responses based on Mailgun API error codes
    if (error.statusCode === 403 && error.message.includes('is not allowed to send')) {
      res.status(403).send('Domain not allowed to send emails. Upgrade or add authorized recipients.');
    } else {
      res.status(500).send('Failed to send email');
    }
}
};


// exports.sendEmail = async (req, res) => {
//   const { email, subject, body } = req.body;

//   try {
//     const data = {
//       from: email,
//       to: "diyantechnoworld@gmail.com",
//       subject:subject ,
//       text:  body
//     };
//     // mg.messages().send(data, function (error, body) {
//     //   console.log(body);
//     // });
//     mg.messages.create('sandbox-123.mailgun.org', {
//       data,
//       html: "<h1>Testing some Mailgun awesomeness!</h1>"
//     })
//     .then(msg => console.log(msg)) // logs response data
//     .catch(err => console.log(err)); // logs any error
//     res.send('Email sent successfully!');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Failed to send email');
//   }
// };





  




  






