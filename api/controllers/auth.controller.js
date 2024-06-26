import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; //github copilot gives only bcrypt. But we need bcryptjs
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedpassword = await bcryptjs.hash(password, 12);
  const newUser = new User({
    username,
    email,
    password: hashedpassword,
  });
  try {
    await newUser.save(); //by await, we say js to stay here until this is done and go next line. To use await function should be asynchrnous
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error); //this calls the error handling middleware in index.js
    //next(errorHandler(5000, "Something gone wrong"));//this can use instead the previous line to make an custom error
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }); //with findone we can find the first user with the email
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const { password: pass, ...rest } = validUser._doc; //we destructure the password from the user object and the rest. This _doc remove the unneccesary things
    const token = jwt.sign(
      { id: validUser._id, email: validUser.email },
      process.env.JWT_SECRET
    );
    let expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest); //we create a cookie named access_token with the token in client's browser that can only access by http. Not by third party apps. And finally we send the validUser credentials to the client
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id},
        process.env.JWT_SECRET
      );
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
      res.cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      }).status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id},
        process.env.JWT_SECRET
      );
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
export const signout = (req, res) => { 
  res.clearCookie("access_token").status(200).json({ message: "Signout successfully" });
 }