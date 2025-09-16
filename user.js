import mongoose from "mongoose";
const {Sechema} = mongoose

const Usersechma = new Sechema({
    email: {type:String,unique:true,requride:true},
    password: {type:String,requride: true},
    fullname: {type: String},
    gender: {type: String ,enum:["male,femail"]},
    city: {type:String},
    country:  {type:String},
    dob:  {type:String},

})

const user = mongoose.model("task",Usersechma)

export default user