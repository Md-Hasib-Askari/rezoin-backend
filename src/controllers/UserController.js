const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const { decodeToken } = require("../Middlewares/AuthVerify");

const { JWT_SECRET } = require("../../config");
const { SALT_ROUNDS } = require("../../config");

//Register
exports.register = async function (req, res) {
  try {
    const { username, email, phone, password } = req.body;
    const cookieEmail = req.headers.email;

    // Check if user is already logged in
    if (cookieEmail) {
      return res
        .status(200)
        .json({ status: "success", message: "Already Logged In" });
    } else {
      // Hash the password
      const saltRounds = parseInt(SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Creating a new user
      const newUser = new UserModel({
        username,
        email,
        phone,
        password: hashedPassword,
      });
      const response = await newUser.save();

      if (!response) {
        res
          .status(500)
          .json({ status: "error", message: "Something went wrong" });
      } else {
        res.status(201).json({ status: "success", message: "User created" });
      }
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

//Login
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Matches the correct user and password
    const user = await UserModel.findOne({ email });
    const user_id = user._id.toString();
    if (!user) {
      return res.status(401).json({ status: "error", message: "Invalid User" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ status: "error", message: "Invalid Password" });
      }

      // Generate JWT token using the secret key
      const token = jwt.sign({ email, user_id }, JWT_SECRET, { expiresIn: "1h" });

      // Set token and email in cookies
      res.cookie("token", token, { httpOnly: true });
      res.cookie("email", email, { httpOnly: true });
      res.cookie("user_id", user_id, { httpOnly: true });
      res
        .status(200)
        .json({
          status: "success",
          message: "Login Successful!",
          token,
          email,
        });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};



exports.getUserDetails = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.user_id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.user_id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.user_id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    res
      .status(200)
      .json({
        status: "success",
        message: "User account deleted successfully",
      });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
