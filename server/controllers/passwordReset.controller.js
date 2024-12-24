import PasswordReset from "../models/password.model.js";

const User = require("../model/user.model");

import {v4 as uuidv4} from 'uuid'
import  { sendMail } from "../utils/sendMail";



exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const id = uuidv4();
    console.log(id);

    await PasswordReset.create({
      uuid: id,
      userId: user.id
    });

   
    sendMail(id, email);

    res.status(200).json({ message: `Token has been sent to ${email}` });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const authPassword=async(req,res,next)=>{
  try{

    const id=req.params.id ;
    const auth=await PasswordReset.find({where:{id}})
    if (!auth) {
      return res.status(404).json("Token is not valid");
    }
    res.status(202).json("User valid");
  }catch(err){
    next(err);
  }
}





