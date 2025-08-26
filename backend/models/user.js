// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("User", UserSchema);

//EDITED USER SCHEMA
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please Enter A Valid Email Address'],
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters long'],
    required: true
  },
  role: {
    type: String,
    enum: ['user','admin'],
    default: 'user',
  },
  lastLogin: Date,
}, { timestamps: true }); 

//PASSWORD HASHING
userSchema.pre('save',async function(next) {
  if (this.provider !== 'local') return next();
  if(!this.isModified('password')) return next();
  if(this.email){
    this.email = this.email.toLowerCase().trim();
  }try{
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password,salt);
    next();
  }catch(err){
    next(err);
  }
});
// Export model
module.exports = mongoose.model("User", userSchema);