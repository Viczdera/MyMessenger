import connectDb from "../../../utils/connectDB";
import User from "../../../models/User";

connectDb();

export default async (req, res) => {
  const {method}= req;

  switch(method){
      case 'GET':
          try{
              const user= await User.find({});
              res.status(200).json({
                success: true,
                data: user
              } )
          }catch(err){
              res.status(500).json({success:false})
          }
        break;

        case 'POST':
            try{
                const newuser= await User.create(req.body);
                res.status(200).json({
                  success: true,
                  data: newuser
                } )
            }catch(err){
                res.status(500).json({success:false})
            }
          break;
            
  }
};
