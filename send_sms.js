const accountSid = 'ACb1208b5d7fe0fe318df41c89b6a6d4c3';
const authToken = 'f6002fdfb702f78d545e67d22dfa6588';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: "Thank you for your purchase from Bob's Bagel's",
    from: '+18142507242',
    to: '+447561390484',
  })
  .then((message) => console.log(message.sid));
