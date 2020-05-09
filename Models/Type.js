var mongoose = require('mongoose');

var TypeSchema = new mongoose.Schema({
    name: String,
    color: {
        type: String,
        default: 'red'
    }
});

TypeSchema.virtual('Client', {
    ref: 'Client',
    localField: '_id',
    foreignField: 'types'
});

var type = mongoose.model('Type', TypeSchema);

module.exports = type;