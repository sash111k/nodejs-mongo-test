const mongoose = require('mongoose')

const Match = new mongoose.Schema({
    first_team_id: {type: mongoose.Types.ObjectId, required: true},
    second_team_id: {type: mongoose.Types.ObjectId, required: true},
    first_team_score: {type: Number, required: true},
    second_team_score: {type: Number, required: true},
    tournament_id: {type: mongoose.Types.ObjectId, required: true},
    season_id: {type: mongoose.Types.ObjectId, required: true},
    full_tournament_name: {type: String},

})

module.exports = mongoose.model('Match', Match);
