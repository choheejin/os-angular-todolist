const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const todoSchema = new mongoose.Schema({

    // user_email: {
    //     type: String,
    //     ref: 'User',
    //     required: true
    // },
    comment: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    day: {
        type: Date,
        required: true
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('Todo', todoSchema);