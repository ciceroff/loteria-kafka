const { Kafka } = require('kafkajs');
const Mailer = require('../Mails/mailer');

class Consumer {
  constructor() {
    const kafka = new Kafka({
      brokers: ['0.0.0.0:9092'],
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
            var user = JSON.parse(message.value);
            mail.newBet(user);
            break;

          case 'new-user':
            var user = JSON.parse(message.value);
            mail.newUser(user);
            break;

          case 'user-no-bet':
            var user = JSON.parse(message.value);
            mail.lateBet(user);
            break;

          case 'admin-warn':
            var messages = JSON.parse(message.value);

            for (let i = 0; i < messages.admins.length; i++)
              mail.adminWarn(
                messages.admins[i],
                messages.user,
                messages.length,
              );
            break;

          case 'password-recovery':
            var user = JSON.parse(message.value);
            mail.passwordRecovery(user, user.token);
            break;
        }
      },
    });
  }
}

module.exports = Consumer;
