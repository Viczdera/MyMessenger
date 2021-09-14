const path = require('path')
module.exports = {
  env:{
    "BASE_URL": "http://localhost:3001",
    "MONGODB_URL":"mongodb+srv://user_1:baefaustzz@cluster0.ouxsq.mongodb.net/Nextshop?retryWrites=true&w=majority"
  },
  sassOptions:{
    includePaths: [path.join(__dirname,'styles')],
  }
 
}


