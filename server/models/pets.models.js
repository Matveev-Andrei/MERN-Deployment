const mongoose = require('mongoose');

const PetsSchema = new mongoose.Schema({
    petName : {
        type : String,
        required : [ true, "You must provide the pet's name"],
        minlength : [ 3, "The pet's name must be at least 3 characters long"],
        unique : [true, " Pet's name already exists, it must be unique."]
    },
    likes:{
        type : Number,
        default : 0
    },
    petType : {
        type : String,
        required : [ true, "You must provide the pet's type"],
        minlength : [ 3, "The pet's type must be at least 3 characters long"]
    },
    desc : {
        type : String,
        required : [ true, "You must provide the pet's description"],
        minlength : [ 3, "The pet's description must be at least 3 characters long"]
    },
    petSkillsOne : {
        type : String,
        default : "Nothing",
    },
    petSkillsTwo : {
        type : String,
        default : "Nothing",
    },
    petSkillsThree : {
        type : String,
        default : "Nothing",
    }
})

const Model = mongoose.model("pets", PetsSchema)

Model.on('index', function (err) { // <-- Wait for model's indexes to finish
    
});

module.exports = Model 