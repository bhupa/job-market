const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "919ecd16981c90",
      pass: "2d465869c530ee"
    },
    pool: true,
    rateLimit: 5,
    timeout: 10000
  });

const sendVerificationEmail = (user) => {
    
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: user.email,
    subject: 'Verify your email',
    text: `Hello ${user.name}, please verify your email by clicking on the following link: https://your-app-domain/verify-email?token=${user.email}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = { sendVerificationEmail };
