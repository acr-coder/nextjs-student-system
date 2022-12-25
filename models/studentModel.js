import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var student = new Schema({
  sName: {
    type: String,
    required: true
  },
  sSurname: {
    type: String,
    required: true
  },
  sMobile: {
    type: String,
    required: true
  },
  sEmail: {
    type: String,
    
  },
  vName: {
    type: String,
    required: true
  },
  vSurname: {
    type: String,
    required: true
  },
  vMobile: {
    type: String,
    required: true
  },
  vEmail: {
    type: String,
    
  },
  sAddress: {
    type: String,
    
  },
  sClass:{
    type:String
  },
  user: {
    type: String,
    required: true
}
  
  
},{timestamps:true});

mongoose.models = {};

var Student = mongoose.model('Student', student);

export default Student;