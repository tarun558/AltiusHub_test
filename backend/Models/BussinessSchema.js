const mongoose = require('mongoose');

const bussinessSchema = new mongoose.Schema({
    bussinessName: {
        type: String,
        required: true
    },
    bussinessEmail: {
        type: String,
        required: true
    },
    bussinessAddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Bussiness', bussinessSchema);