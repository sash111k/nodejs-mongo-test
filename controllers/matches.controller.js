const Match = require('../models/match.model');
const Tournament = require('../models/tournament.model');
const Team = require('../models/team.model')
const Season = require('../models/season.model')
const mongoose = require('mongoose')
const {Aggregate} = require("mongoose");
class MatchesController{
    async createMatch(req,res){
        const {first_team_name, second_team_name,
            first_team_score, second_team_score, tournament, season, full_tournament_name} = req.body;
        const firstTeam = await Team.findOne({team_name: first_team_name});
        const secondTeam = await Team.findOne({team_name: second_team_name});
        const realSeason = await Season.findOne({season: season});
        const realTournament = await Season.findOne({tournament: tournament});

        console.log(firstTeam._id)
        const newMatch = await Match.create({
            first_team_id: firstTeam._id,
            second_team_id: secondTeam._id,
            first_team_score: first_team_score,
            second_team_score: second_team_score,
            tournament_id: realTournament._id,
            season_id: realSeason._id,
            full_tournament_name: full_tournament_name
        })

        res.json({status: "Created",
                    match: newMatch})
    }

    async getMatches(req,res){
        const allMatches = await Match.find();
        // let resultMatches = allMatches.map(async (match)=>{
        //     const first_team = await Team.findById(match.first_team_id);
        //     const first_team_name = first_team.team_name;
        //     // return {
        //     //     _id : match._id,
        //     //     first_team_name : await Team.findById(match.first_team_id).team_name,
        //     //     second_team_name : await Team.findById(match.second_team_id).team_name,
        //     //     first_team_score : match.first_team_score,
        //     //     second_team_score: match.second_team_score,
        //     //     tournament_name: await Tournament.findById(match.tournament_id).tournament_name,
        //     //     season : await Season.findById(match.season_id).season,
        //     //     full_tournament_name : match.full_tournament_name
        //     // }
        // })
        console.log(Team.collection.name)
       const resultMatches = await Match.aggregate([
           {
               "$project": {
                   "_id": {
                       "$toString": '$_id'
                   }
               }
           },
           {
                "$lookup" : {
                    "from": Team.collection.name,
                    "localField": '_id',
                    "foreignField": 'first_team_id',
                    "as": 'first_team_name'
                }
            }
        ])
        console.log(resultMatches)
        res.json({status : 'OK'})
    }
}


module.exports = new MatchesController();
