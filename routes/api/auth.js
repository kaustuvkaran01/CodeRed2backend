const router = require("express").Router();
const bcrypt = require("bcrypt");
// const auth = require("../../lib/middleware/auth");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const User = require("../../model/User");

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      res.status(400).send("User does not exist");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch === true) {
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } else {
      res.status(400).send("Invalid password");
    }
  } catch {
    console.log("Some error in request");
    res.status(500).send("Server error");
  }
});

router.post("/register", async (req, res) => {
  const { username, password, contactNum } = req.body;
  try {
    let user = await User.findOne({
      $or: [{ username, contactNum }],
    });
    if (user) {
      res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      username,
      contactNum,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch {
    console.log("Some error in request");
    res.status(500).send("Server error");
  }
});

//Get user by token
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
