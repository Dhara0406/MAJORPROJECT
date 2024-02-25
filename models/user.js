const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalMogoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    }
});
userSchema.plugin(passportlocalMogoose);
module.exports=mongoose.model("User",userSchema);
