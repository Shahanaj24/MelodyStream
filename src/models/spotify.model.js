const mongoose = require('mongoose');

const spotifySchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
       },
    email:{

        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','artist'],
        default:'user'
    }
})


const Spotify = mongoose.model("Spotify", spotifySchema);   

module.exports = Spotify;