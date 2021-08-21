import connectDb from "../../../utils/connectDB";
import Conversation from "../../../models/Conversation"

connectDb();

export default async (req, res) => {
  const {method}= req;

  switch(method){
      case 'GET':
          try{
              const conversation= await Conversation.find({});
              res.status(200).json({
                success: true,
                data: conversation
              } )
          }catch(err){
              res.status(500).json({success:false})
          }
        break;

        case 'POST':
            try{
                const newconversation= await Conversation.create({members:[req.body.senderId, req.body.receiverId]});
                res.status(200).json({
                  success: true,
                  data: newconversation
                } )
            }catch(err){
                res.status(500).json({success:false})
            }
          break;
            
  }
};
