const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    doB: {
        type: Date,
        required: true
    },
    salaryScale: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    departmentId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    annualLeave: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Staff',staffSchema)