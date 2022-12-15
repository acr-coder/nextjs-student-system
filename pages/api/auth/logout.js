import User from "../../../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "../../../config/db";

dbConnect();

export default async function handler(req, res) {
 
  console.log("user id",req.body);
  if (req.method === "PUT") {
    try {
      const user = await User.findById({ _id:req.body });
      console.log(user.id);
      await User.findByIdAndUpdate(
       {_id:user.id},
        {logoutlogs:[Date.now(), ...user.logoutlogs]}
    )
    res.status(200).json({ error: error.message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
