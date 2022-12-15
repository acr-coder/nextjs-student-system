import User from "../../../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "../../../config/db";

dbConnect()

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export default async function handler(req, res) {
  const { username, password } = req.body;

  if(req.method === "POST"){
    try {
    // validation
    if (!username || !password) {
        throw Error("Lütfen tüm alanları doldurunuz");
      }
  
      const user = await User.findOne({ username });
      
      if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,            
            username: user.username,
            isAdmin:user.isAdmin,
            token: generateToken(user._id)

        })
         await User.findByIdAndUpdate(
          user.id,
          {loginlogs:[Date.now(), ...user.loginlogs]}
      )

    } else{
        res.status(400)
        throw new Error('Kullanıcı Bilgileri hatalı')
    }
    

    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  }
  
}
