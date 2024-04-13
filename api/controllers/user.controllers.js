//controllers folder has all the functions/logics in the api. 
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.json({
    message: "Api is working",
  });
};

//update user
export const updateUser = async (req, res, next) => {
  if(req.user.id!==req.params.id){
    return next(errorHandler(401, "You can only update your account"));
  }
  try{
    if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10);//we use hashSync with bcryptjs instead hash with bcrypt, so no need to use await. 
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  }
  catch(err){
    next(err);
  }
}