const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    last:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    userClass:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

const newdatas = mongoose.model("newdatas",schema)
module.exports = newdatas