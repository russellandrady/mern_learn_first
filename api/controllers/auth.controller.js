import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";//github copilot gives only bcrypt. But we need bcryptjs
import { errorHandler } from "../utils/error.js";

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
    next(error);//this calls the error handling middleware in index.js
    //next(errorHandler(5000, "Something gone wrong"));//this can use instead the previous line to make an custom error
  }
};
