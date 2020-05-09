var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    picture: String,
    types: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Type"
        }
    ]
});

var Client = mongoose.model('client', clientSchema);

module.exports = Client;