import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import express from 'express';

const router = express.Router();

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//creating token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //chcking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Store Feedback
const storeFeedback = async (req, res) => {
  const { email, text } = req.body;

  try {
    // Check if user exists by email
    const userData = await userModel.findOne({ email });

    if (!userData) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // Update feedback using email as identifier
    await userModel.findOneAndUpdate({ email }, { feedback: text });

    return res.json({ success: true, message: "Feedback saved successfully" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error storing feedback" });
  }
};


// const storeFeedback = router.post('/feedback/:id', async (req, res) => {
//   const { id } = req.params;
//   const { text } = req.body;

//   try {
//     const user = await userModel.findById(id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     await userModel.findByIdAndUpdate(id, { feedback: text });

//     res.json({ success: true, message: 'Feedback saved successfully' });
//   } catch (error) {
//     console.error('Error storing feedback:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });


//Fetch all user
const fetchUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser, fetchUser, storeFeedback };
