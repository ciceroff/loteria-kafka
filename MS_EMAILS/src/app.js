const express = require('express');
const Consumer = require('./Kafka/Consumer');

const app = express();
const consumer = new Consumer();

// consumer.consume('new-bet');
consumer.consume('new-user');
// consumer.consume('user-no-bet');
// consumer.consume('admin-warn');
// consumer.consume('password-recovery');

app.listen(3000);
