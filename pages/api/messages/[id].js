import connectDb from "../../../utils/connectDB";
import Message from "../../../models/Message";

connectDb();

export default async (req, res) => {
  const {
    method,
    query: { id } //should be same as file name
  } = req;

  switch (method) {
    case "GET":
      try {
        const message = await Message.findById(id);
        if (!message) {
          return res.status(500).json({
            success: false,
            data: "No messages found",
          });
        }
        res.status(200).json({
          success: true,
          data: message
        });
      } catch (err) {
        res.status(500).json({ success: false , data:"could not get"});
      }
      break;
  }
};
