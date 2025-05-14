const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    plans: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip'
        }
    ],
})


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id}, process.env.JWT_KEY,
        {
            expiresIn: '3h'
        }
    )
    return token;
}

const User = mongoose.model('User', userSchema);
module.exports = User;