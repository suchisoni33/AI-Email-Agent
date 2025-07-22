// import mongoose from 'mongoose';
// // import bcrypt from 'bcryptjs';
// import CryptoJS from 'crypto-js'; 

// import config from '../config/config.js';

// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     googleRefreshToken:{
//         type:String,
//         required:true
//     },
// })

// userSchema.pre('save', async function(next){
//     if (this.isModified('googleRefreshToken')) {
//         const cipherText= crypto.AES.encrypt(this.googleRefreshToken, config.GOOGLE_SECRET_KEY).toString();
//         this.googleRefreshToken = cipherText;
//     }
//   next();
// })

// userSchema.methods.decryptGoogleRefreshToken = function() {
//     const bytes = crypto.AES.decrypt(this.googleRefreshToken, config.GOOGLE_SECRET_KEY);
//     const originalText = bytes.toString(crypto.enc.Utf8);
//     return originalText;
// }
// const  User= mongoose.model('User', userSchema);
// export default User;

import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js'; 
import config from '../config/config.js';
import  jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  googleRefreshToken: {
    type: String,
    required: true
  },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('googleRefreshToken')) {
    const cipherText = CryptoJS.AES.encrypt(this.googleRefreshToken, config.GOOGLE_SECRET_KEY).toString();
    this.googleRefreshToken = cipherText;
  }
  next();
});

userSchema.methods.decryptGoogleRefreshToken = function() {
  const bytes = CryptoJS.AES.decrypt(this.googleRefreshToken, config.GOOGLE_SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

userSchema.methods.generateAuthToken = function() {
  console.log("JWT_SECRET value is:", config.JWT_SECRET); 
  const token= jwt.sign({ id: this._id}, config.JWT_SECRET, { expiresIn: '7d' });
  return token;
}

userSchema.statics.authToken = async function(token) {
  try{
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await this.findById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  catch (error) {
    console.error('Error in authToken:', error);
    throw new Error('Invalid token');
  }
}
const User = mongoose.model('User', userSchema);
export default User;
