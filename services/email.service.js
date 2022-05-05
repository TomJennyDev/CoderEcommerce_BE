const nodemailer = require("nodemailer");
const config = require("../config/config");
const { transporter } = require("../config/loadTransportEmail");
const logger = require("../config/logger");
const { catchAsync } = require("../helpers/utils");

const emailService = {};

const sendEmail = async function (subject, text) {
  await transporter.sendMail({
    from: config.email.from,
    to: config.email.to,
    subject,
    text,
  });
};

emailService.sendResetPasswordEmail = catchAsync(async function (to, token) {
  await sendEmail({
    subject: "Message",
    text: "I hope this message gets through!",
    html,
  });
});

emailService.sendVerificationEmail = catchAsync(async function (to, token) {
  await sendEmail({
    subject: "Message",
    text: "I hope this message gets through!",
    html,
  });
});
