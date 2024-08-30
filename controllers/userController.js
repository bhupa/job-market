// userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const Company = require("../models/Company");
const Jobseeker = require("../models/Jobseeker");
const upload = require("../config/uploadFile");
const { validationResult } = require("express-validator");
const eventEmitter = require('../config/events');
const crypto = require('crypto');

// Register a new user

exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    user_type,
    company_name,
    about_company,
    address,
    first_name,
    last_name,
    birthday,
    gender,
    country,
    current_country,
    occupation,
    experience,
    japanese_level,
    about,
    living_japa,
    profile_img,
    job_type,
    longterm,
    start_when,
    intro_video,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let customErrors = {};
    errors.array().forEach((error) => {
      customErrors[error.param] = error.msg;
    });
    return res.status(400).json({ errors: customErrors });
  }
  try {
    // Create and save the user
    const user = new User({ name, email, password, user_type });
    await user.save();

    // Conditional logic based on user_type
    if (user_type === "company") {
      //   upload.single("logo")(req, res, async (error) => {
      // if (error) {
      //   return res.status(400).json({ message: error });
      // }
      const logo = req.file ? req.file.filename : null;
      // Save Company data
      const company = new Company({
        user_id: user._id,
        company_name,
        about_company,
        address,
        logo,
        is_verify: 1,
        status: 1,
      });
      const savedCompany = await company.save();

      //   });
    } else if (user_type === "jobseeker") {
      // Save Jobseeker data
      const jobseeker = new Jobseeker({
        user_id: user._id,
        first_name,
        last_name,
        birthday,
        gender,
        country,
        current_country,
        occupation,
        experience,
        japanese_level,
        about,
        living_japan,
        profile_img,
        job_type,
        longterm,
        start_when,
        intro_video,
      });
      await jobseeker.save();
      responseData = { user, jobseeker: jobseeker };
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }
    eventEmitter.emit('userRegistered', {
        _id: user._id,
        name: user.name,
        email: user.email,
       
      });
    // Convert Mongoose Document to plain JavaScript object
    const userData = await User.findById(user._id).lean().populate(user.user_type);

    res
      .status(200)
      .json({
        message: "User registered successfully",
        data: { user: userData },
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const populatedUser = await User.fetchUserData(user.id);
    res.status(200).json(populatedUser);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const populatedUser = await User.fetchUserData(user.id);
    res.status(200).json(populatedUser);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    const populatedUser = await User.fetchUserData(user.id);
    res.status(200).json({
      token,
      user: populatedUser,
    });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
