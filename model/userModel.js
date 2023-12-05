const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
      name: {type:String,require: true},
      password :{type:String,required:true},
      email:{type:String},
      phone:{type:Number},
      Role:{type:String,default:"User"},  
      image:{type:String},          
        
})

module.exports = mongoose.model ('user', userSchema)