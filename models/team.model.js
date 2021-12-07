const mongoose = require('mongoose')

const Team = new mongoose.Schema({
    team_name: {type: String, required: true}
})

module.exports = mongoose.model('Team',Team, 'teams');

