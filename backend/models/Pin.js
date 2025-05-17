const mongoose = require('mongoose');
    
const pinSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    title: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: [
            'Visited',
            'Upcoming',
            'Whishlist',
        ],
        required: true,
    }
})


module.exports = mongoose.model('Pin', pinSchema);