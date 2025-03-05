const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEEMAIL,
      pass: process.env.NODEPASS,
    },
  });

  module.exports = transporter