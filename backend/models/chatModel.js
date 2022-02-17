const mongoose = require('mongoose');

const chatSchema =  mongoose.Schema({
    name: String,
    opinion: String,
    email: String,
    registerDate: Date
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat }
