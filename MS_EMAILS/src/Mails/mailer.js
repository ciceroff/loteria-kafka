const nodemail = require('nodemailer');
require('dotenv').config();

class Mailer {
  constructor() {
    this.transporter = nodemail.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  newUser(user) {
    this.transporter.sendMail({
      subject: 'Welcome',
      from: 'loterica@gmail.com',
      to: user.email,
      html: `<h1> Welcome ${user.name} </h1>
      <p>
        We hope you have a great experience in our platform!!
      </p>`,
    });
  }

  newBet(user) {
    this.transporter.sendMail({
      subject: 'New bet registered',
      from: 'loterica@gmail.com',
      to: user.email,
      html: `<strong>New bet</strong>
      <p>We noticed that you have registered a new bet, thank you for choosing our platform, we wish you luck with your bet</p>`,
    });
  }

  adminWarn(admin, user) {
    this.transporter.sendMail({
      subject: 'A new bet was registered on our system',
      from: 'loterica@gmail.com',
      to: admin.email,
      html: `<p>${user.email} just made a new bet on our system</p>`,
    });
  }

  lateBet(user) {
    this.transporter.sendMail({
      subject: "Don't forget about us",
      from: 'loterica@gmail.com',
      to: user.email,
      html: `<strong>Hey! Where are you?</strong>
      <p>We noticed that you have not bet in the last 7 days</p>
      <p>This is a reminder to let you know that our platform</p>
      <p> is always avaiable to you</p>`,
    });
  }

  passwordRecovery(user, token) {
    this.transporter.sendMail({
      subject: 'Password Recovery',
      from: 'loterica@gmail.com',
      to: user.email,
      html: `<strong>Recovering password</strong>
      <p>We noticed a password recovery attempt coming from this email(${user.email}), if you didn't do it, it is suggested to change the password</p>
      <p>To continue with the password recovery, use the token: ${token}</p>`,
    });
  }
}

module.exports = Mailer;
