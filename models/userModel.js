import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required:[true, 'Plesae add a name'],        
    },    
    username: {
        type: String,
        required:[true, 'Plesae add a username'],
        unique:true
    },    
    password: {
        type: String,
        required:[true, 'Plesae add a password']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    loginlogs:{
        type:[Date]
    },
    logoutlogs:{
        type:[Date]
    }

    
    
}, { timestamps: true})

mongoose.models = {};

var User = mongoose.model('User', userSchema);

export default User;