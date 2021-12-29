const nodemail = require('nodemailer');
require('dotenv').config();

class Mailer {
  constructor() {
    this.transporter = nodemail.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '83e718b3f72200',
        pass: '7f2aa87e1b1b8c',
      },
    });
  }

  newUser(user) {
    this.transporter
      .sendMail({
        subject: 'Welcome',
        from: 'loterica@gmail.com',
        to: user.email,
        html: `<h1>Welcome ${user.name}</h1><br> <p>We hope you have a great experience in our platform!!</p>`,
      })
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  newBet(user) {
    this.transporter
      .sendMail({
        subject: 'New bet registered',
        from: 'loterica@gmail.com',
        to: user.email,
        html: `<strong>New bet</strong>
      <p>We noticed that you have registered a new bet, thank you for choosing our platform, we wish you luck with your bet</p>`,
      })
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  adminWarn(admin, user, length) {
    this.transporter
      .sendMail({
        subject: 'A new bet was registered on our system',
        from: 'loterica@gmail.com',
        to: admin.email,
        html: `<p>${user.email} just made ${length} new bets on our system</p>`,
      })
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  lateBet(user) {
    this.transporter
      .sendMail({
        subject: "Don't forget about us",
        from: 'loterica@gmail.com',
        to: user.email,
        html: `<strong>Hey! Where are you?</strong>
      <p>We noticed that you have not bet in the last 7 days</p>
      <p>This is a reminder to let you know that our platform</p>
      <p> is always avaiable to you</p>`,
      })
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  passwordRecovery(user, token) {
    this.transporter
      .sendMail({
        subject: 'Password Recovery',
        from: 'loterica@gmail.com',
        to: user.email,
        html: `<strong>Recovering password</strong>
      <p>We noticed a password recovery attempt coming from this email(${user.email}), if you didn't do it, it is suggested to change the password</p>
      <p>To continue with the password recovery, use the token: ${token}</p>`,
      })
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = Mailer;
