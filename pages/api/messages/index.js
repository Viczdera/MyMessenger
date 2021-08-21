import connectDb from "../../../utils/connectDB";
import Message from "../../../models/Message"

connectDb();

export default async (req, res) => {
  const {method}= req;

  switch(method){
      case 'GET':
          try{
              const message= await Message.find({});
              res.status(200).json({
                success: true,
                data: message
              } )
          }catch(err){
              res.status(500).json({success:false})
          }
        break;

        case 'POST':
            try{
                const newmessage= await Message.create(req.body);
                res.status(200).json({
                  success: true,
                  data: newmessage
                } )
            }catch(err){
                res.status(500).json({success:false})
            }
          break;
            
  }
};
