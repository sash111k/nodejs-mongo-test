const mongoose = require('mongoose')

const Tournament = new mongoose.Schema({
    tournament_name: {type: String, required: true}
})

module.exports = mongoose.model('Tournament', Tournament)
