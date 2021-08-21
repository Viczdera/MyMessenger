import Conversation from "../../../models/Conversation";
import connectDB from "../../../utils/connectDB";

connectDB();

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const conversation = await Conversation.findById(id);
        if (!conversation) {
          return res
            .status(500)
            .json({ success: false, data: "No convo found" });
        }
        res.status(200).json({
          success: true,
          data: conversation
        });
      } catch (err) {
        res.status(500).json({ success: false , data:"could not get"});
      }
      break;
  }
};
