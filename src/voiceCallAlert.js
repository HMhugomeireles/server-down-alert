const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSID, authToken)

const callListInstance = {
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: process.env.MY_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER
}

function makeVoiceCall() {
    client.calls
        .create(callListInstance)
        .then(res => console.log("Call Sid:", res.sid))
        .catch(err => console.log("Error:: ", err));
}

module.exports = {
    makeVoiceCall
}