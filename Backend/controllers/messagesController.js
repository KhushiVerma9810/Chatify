const MessageModel = require("../modal/MessageModel")

module.exports.addMessage = async(req , res , next)=>{
 try {
    const{from , to , message} = req.body;
    const data = await MessageModel.create({
      message:{text:message},
      users:[from,to],
      sender:from,
    });
    if(data){
        return res.json({msg:"Message added Successfully"});
    }
    else{
        return res.json({msg:"Failed to add message to the database"});
    }
 } catch (ex) {
    next(ex);
 }

};
module.exports.getAllMessage = async(req , res , next)=>{};