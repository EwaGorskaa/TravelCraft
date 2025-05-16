const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description:
    {
        type: String,
    },
    mainDestination:{
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    }, 
    endDate: {
        type: Date,
        required: true
    },
    accomodations:[
        {
            name: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
            nightCost: {
                type: Number,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            checkIn: {
                type: String,
            }, 
            checkOut: {
                type: String,
            },
            Notes: {
                type: String,
            }
        }
    ],
    transports:[
        {
            type:{
                type: String,
                required: true,
            },
            cost: {
                type: Number, 
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            time:{
                type: String,
            },
            duration: {
                type: String,
            },
            departurePlace:{
                type: String,
                required: true,
            },
            destination:{
                type: String,
                required: true
            }
        }
    ],
    attractions:[
        {
            name: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
            startDate: {
                type: String,
            },
            endDate: {
                type: String,
            },
            duration: {
                type: String,
            },
            cost: {
                type: Number,
                required: true
            },
            startTime: {
                type: String,
            },
            notes: {
                type: String,
            }
        }
    ],
    checklist:{
        type: [String]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }

})

module.exports = mongoose.model('Plan', planSchema)