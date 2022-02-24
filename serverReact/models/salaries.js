const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        require: true
    },
    overTime: {
        type: Number,
        required: true,
        default: 0
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff"
    }
});

module.exports = mongoose.model("Salary",salarySchema);


