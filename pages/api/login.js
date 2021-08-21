import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email: req.body.email });
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!user) {
          res.status(500).json({ success: false, data: "user not found" });
        } else if (!validPassword) {
          res
            .status(500)
            .json({ success: false, data: "incorrect password g!" });
        } else {
          res.status(200).json({ success: true, data: user });
        }
      } catch (err) {
        res.status(500).json({ success: false });
      }
  }
};
