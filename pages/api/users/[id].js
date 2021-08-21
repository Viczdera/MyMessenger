import connectDb from "../../../utils/connectDB";
import User from '../../../models/User'

connectDb();

export default async (req, res) => {
  const {
    method,
    query: { id } //should be same as file name
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(500).json({
            success: false,
            data: "No users found",
          });
        }
        res.status(200).json({
          success: true,
          data: user
        });
      } catch (err) {
        res.status(500).json({ success: false , data:"could not get"});
      }
      break;
  }
};
