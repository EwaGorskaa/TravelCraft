const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description:
    {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    }, 
    endDate: {
        type: Date,
        required: true
    }


})