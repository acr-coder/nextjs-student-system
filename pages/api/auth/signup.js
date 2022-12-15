import User from "../../../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "../../../config/db";

dbConnect()

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export default async function handler(req, res) {
  const { username, password,isAdmin, fullname,log } = req.body;

  if(req.method === "POST"){
    try {
    // validation
    if ( !password || !username || !fullname) {
        throw Error("Lütfen tüm alanları doldurunuz");
      }
    if ( username.trim().length < 3 || username.trim().length > 20) {
        throw Error("Kullanıcı adı en az 3 en fazla 20 karakter olabilir.");
      }
    if ( password.trim().length < 3 || password.trim().length > 20) {
        throw Error("Parola en az 3 en fazla 20 karakter olabilir.");
      }
  
      const userExists = await User.findOne({ username });
      
      if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        fullname,
        username,        
        password: hashedPassword,
        isAdmin,
        loginlogs:[],
        logoutlogs:[]
        
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            fullname:user.fullname,
            username: user.username,            
            isAdmin:user.isAdmin,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  }
  
}
