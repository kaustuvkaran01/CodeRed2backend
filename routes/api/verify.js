const router = require("express").Router();

const verifyController = require("../../controllers/verifyController");

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

router.get("/getcode", (req, res) => {
  console.log("getCode");
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verifications.create({
      to: `+${req.query.phonenumber}`,
      channel: req.query.channel,
    })
    .then((data) => {
      res.status(200).send(data);
    });
});
router.get("/verifycode", (req, res) => {
  console.log("verifyCode");
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: `+${req.query.phonenumber}`,
      code: req.query.code,
    })
    .then((verification_check) => {
      console.log(verification_check);
      res.status(200).send(verification_check);
    });
});

module.exports = router;
