const Match = require('../models/match.model');
const Tournament = require('../models/tournament.model');
const Team = require('../models/team.model')
const Season = require('../models/season.model')
const mongoose = require('mongoose')
const {Aggregate} = require("mongoose");

class MatchesController {
    async createMatch(req, res) {
        const {
            first_team_name, second_team_name,
            first_team_score, second_team_score, tournament, season, full_tournament_name
        } = req.body;
        const firstTeam = await Team.findOne({team_name: first_team_name});
        const secondTeam = await Team.findOne({team_name: second_team_name});
        const realSeason = await Season.findOne({season: season});
        const realTournament = await Tournament.findOne({tournament_name: tournament});
        //console.log(tournament,realTournament)
        const newMatch = await Match.create({
            first_team_id: firstTeam._id,
            second_team_id: secondTeam._id,
            first_team_score: first_team_score,
            second_team_score: second_team_score,
            tournament_id: realTournament._id,
            season_id: realSeason._id,
            full_tournament_name: full_tournament_name
        })

        res.json({
            status: "Created",
            match: newMatch
        })
    }


    async getMatches(req, res) {
        let {team,tournament,season} = req.query;
        console.log(team,tournament,season)


        let realPipeline = [
            {
                $match: {
                    // $or: [
                    //     { first_team_id: mongoose.Types.ObjectId(team)},
                    //     { second_team_id: mongoose.Types.ObjectId(team)}
                    // ],
                    // tournament_id: mongoose.Types.ObjectId(tournament),
                    // season_id: mongoose.Types.ObjectId(season)
                }
            },
            {
                $lookup: {
                    from: 'teams',
                    'let': {first_team_id: '$first_team_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$first_team_id']
                                }
                            }
                        }
                    ],
                    as: 'ftn'
                }
            },
            {
                $unwind: "$ftn"
            },
            {
                $lookup: {
                    from: 'teams',
                    'let': {second_team_id: '$second_team_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$second_team_id']
                                }
                            }
                        }
                    ],
                    as: 'stn'
                }
            },
            {
                $unwind: "$stn"
            },
            {
                $lookup: {
                    from: 'seasons',
                    'let': {season_id: '$season_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$season_id']
                                }
                            }
                        }
                    ],
                    as: 'season'
                }
            },
            {
                $unwind: "$season"
            },
            {
                $lookup: {
                    from: 'tournaments',
                    'let': {tournament_id: '$tournament_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$tournament_id']
                                }
                            }
                        }
                    ],
                    as: 'tournament'
                }
            },
            {
                $unwind: "$tournament"
            },
            {
                $project: {
                    id: '$_id',
                    first_team: '$ftn.team_name',
                    second_team: '$stn.team_name',
                    first_team_score: '$first_team_score',
                    second_team_score: '$second_team_score',
                    season: '$season.season',
                    tournament: '$tournament.tournament_name',
                    full_tournament_name: '$full_tournament_name'
                }
            }
        ]
        if(team && team != 0){
            console.log('t11')
            realPipeline[0].$match.$or = [
                { first_team_id: mongoose.Types.ObjectId(team)},
                { second_team_id: mongoose.Types.ObjectId(team)}
            ]
        }
        if(tournament && tournament != 0){
            console.log('t12')
            realPipeline[0].$match.tournament_id = mongoose.Types.ObjectId(tournament)
        }
        if(season && season != 0){
            console.log('t13')
            realPipeline[0].$match.season_id = mongoose.Types.ObjectId(season)
        }

        const resultMatches = await Match.aggregate(realPipeline)


        res.json(resultMatches)
    }
}


module.exports = new MatchesController();
