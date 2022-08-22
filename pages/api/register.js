/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../utils/connectDB";
import User from "../../models/User"
import bcrypt from "bcrypt"

connectDB();

export default async (req, res) => {
  const {method}=req
  switch (method) {
    case "POST":
      try {
        const { name, email, password} = req.body
        //encrypt
        const msalt= await bcrypt.genSalt(10)
        const passHashed= await bcrypt.hash(password, msalt)
        const userExist = await User.findOne({email });
        const regUser = await User.create({
          name:name,
          email: email,
          password:passHashed,
        });
        if (userExist) {
          return res
            .status(400)
            .json({ error: "Email already exists" });
        }
        const user= await regUser.save();
        return res.status(200).json({
          success: true,
          data: user
        });
      } catch (err) {
        res.status(500).json({ success: false ,message:'Server Error'});
      }
  }
};
