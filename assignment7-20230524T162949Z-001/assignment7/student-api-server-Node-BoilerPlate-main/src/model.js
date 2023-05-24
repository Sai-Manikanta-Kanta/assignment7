const mongoose = require('./connection');
const userSchema = new mongoose.Schema({
    id:Number,
name:String,
currentClass:String,
division: String,
});
const User = mongoose.model('User', userSchema);
module.exports = User;