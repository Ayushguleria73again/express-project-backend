const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    userClass: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    createdOn: {
        type: String,
        default: () => {
            const date = new Date();
            return date.toLocaleString(); 
        }
    }
});

const newdatas = mongoose.model("newdatas", schema);
module.exports = newdatas;

