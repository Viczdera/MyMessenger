/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        //encrypt
        const msalt = await bcrypt.genSalt(10);
        const passHashed = await bcrypt.hash(req.body.password, msalt);
        const userExist = await User.findOne({
          $or: [{ email: email }, { phone: phone }],
        });
        const regUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: passHashed,
        });
        if (userExist) {
          return res
            .status(400)
            .json({ error: "Email or Phone number already exists" });
        }

        const user = await regUser.save();
        res.status(200).json({
          success: true,
          data: user,
        });
      } catch (err) {
        res.status(500).json({ success: false });
      }
  }
};
