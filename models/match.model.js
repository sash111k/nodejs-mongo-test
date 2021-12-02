const mongoose = require('mongoose')

const Match = new mongoose.Schema({
    first_team_id: {type: String, required: true},
    second_team_id: {type: String, required: true},
    first_team_score: {type: Number, required: true},
    second_team_score: {type: Number, required: true},
    tournament_id: {type: String, required: true},
    season_id: {type: String, required: true},
    full_tournament_name: {type: String},

})

module.exports = mongoose.model('Match', Match);
