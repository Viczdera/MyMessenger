import Conversation from "../../../../models/Conversation"
import connectDB from "../../../../utils/connectDB";

connectDB

export default async (req, res) => {
  const {
    method,
    query: { userid },
  } = req;

  switch (method) {
    case "GET":
      try {
        const conversation = await Conversation.find({members:userid})
        if (!conversation) {
          return res
            .status(500)
            .json({ success: false, data: "No convo for users found" });
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
