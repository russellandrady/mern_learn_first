import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";//github copilot gives only bcrypt. But we need bcryptjs

export const signup = async (req, res) => {
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
    res.status(500).json( error.message );
  }
};
