import connectDb from "../../../../utils/connectDB";
import Conversation from "../../../../models/Conversation";

connectDb();
/*
export default function handler(req, res) {
  const { id } = req.query
  res.end(`Post: ${id}`)
}*/
export default async (req, res) => {
  const {
    method,
    query: { members }, //should be same as file name
  } = req;

  switch (method) {
    case "GET":
      try {
        const conversation = await Conversation.findOne({
          members});
        if (!conversation) {
          return res.status(500).json({
            success: false,
            data: "No Conversations found",
          });
        }
        res.status(200).json(conversation);
      } catch (err) {
        res.status(500).json({ success: false, data: "could not get" });
      }
      break;
  }
};
