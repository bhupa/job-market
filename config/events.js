const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const { sendVerificationEmail } = require('../mail/RegisterVerifyEmail');

eventEmitter.on('userRegistered', (user) => {
  sendVerificationEmail(user);
});

module.exports = eventEmitter;
