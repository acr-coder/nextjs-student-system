import User from "../../../../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "../../../../config/db";

dbConnect();

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
            
          // Get token from header
          token = req.headers.authorization.split(" ")[1];

          // Verify token
          const decoded = jwt.verify(token, process.env.SECRET);
            //console.log(decoded);
          // Get user from the token
          const admin = await User.findById(decoded._id).select("-password");
          
          if (admin.isAdmin) {
            const user = await User.findById(id).select("-password");

            res.status(200).json({ success: true, data: user });
          }else{
            res.status(401).json({ message:"Not authorized" });
         
          }
        } catch (error) {
          console.log(error);
          res.status(401);
          throw new Error("Not authorized");
        }
      }

      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }

      break;
    
      case "DELETE":
        let newToken
  
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          try {
              
            // Get token from header
            newToken = req.headers.authorization.split(" ")[1];
  
            // Verify token
            const decoded = jwt.verify(newToken, process.env.SECRET);
              //console.log(decoded);
            // Get user from the token
            const admin = await User.findById(decoded._id).select("-password");
            
            if (admin.isAdmin) {
              const deletedUsers = await User.deleteMany({_id: { $in: req.body.objects}});
  
              res.status(200).json({ success: true, data: deletedUsers });
            }else{
              res.status(401).json({ message:"Not authorized" });
           
            }
          } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized");
          }
        }
  
        if (!token) {
          res.status(401);
          throw new Error("Not authorized, no token");
        }
  
        break;
        

    default:
      res.status(400).json({ success: false });
      break;
  }
}
