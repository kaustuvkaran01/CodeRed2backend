require("dotenv").config();
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

// client.verify.services
//   .create({ friendlyName: "CodeRed" })
//   .then((service) => console.log(service.sid));

exports.getCode = (req, res) => {
  console.log("getCode");
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verifications.create({
      to: "+918059645585",
      channel: "sms",
    })
    .then((data) => {
      res.status(200).send(data);
    });
};

exports.verifyCode = (req, res) => {
  console.log("verifyCode");
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: "+918059645585",
      code: req.query.code,
    })
    .then((verification_check) => console.log(verification_check.status));
};
