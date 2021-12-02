const mongoose = require('mongoose')

const Season = new mongoose.Schema({
    season: {type: Number, required: true}
})

module.exports = mongoose.model('Season', Season);
