const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email });
    console.log("found user: ",user)
    if (user && (await user.matchPassword(password))) {
      console.log("matched");
      res.json({
        success: true,
        message: "Login successful",
        token: generateToken(user._id),
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// logout =>I am not creating a logout controller function because my application is being deployed on Render. Render does not support the use of cookies in deployed applications unless a custom domain is configured. Since I am not using a custom domain, I have decided to avoid using cookies in my application.for that i will handle logout from frontend side.

module.exports = { register, login };
