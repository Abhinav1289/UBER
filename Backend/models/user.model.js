const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            require: true,
            minlenth: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlenth: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        unique: true,
        require: true,
        minlength: [5, 'Email must be at 5 characcters long'],
    },
    password: {
        type: String,
        require: true,
        // minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },
    socketId: {
        type: String,
    },
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;