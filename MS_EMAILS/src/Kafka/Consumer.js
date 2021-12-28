const { Kafka } = require('kafkajs');
const Mailer = require('../Mails/mailer');

class Consumer {
  constructor() {
    const kafka = new Kafka({
      brokers: ['localhost:9092'],
    });
    this.consumer = kafka.consumer({ groupId: 'test-group' });
  }

  async consume(topic) {
    let mail = new Mailer();
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // console.log({
        //   value: message.value.toString(),
        // });
        switch (topic) {
          case 'new-bet':
            mail.newBet(user);
            break;

          case 'new-user':
            mail.newUser(user);
            break;

          case 'user-no-bet':
            mail.lateBet(user);
            break;

          case 'admin-warn':
            mail.adminWarn(admin, user);
            break;

          case 'password-recovery':
            mail.passwordRecovery(user, token);
            break;
        }
      },
    });
  }
}

module.exports = Consumer;
