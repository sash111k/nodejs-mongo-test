const Season = require('../models/season.model');


class SeasonsController {

    async createSeason(req,res){
        const {season} = req.body
        const newSeason = await Season.create({season})
        res.json(newSeason);
    }

    async getSeasons(req,res){
        try {
            const teams = await Season.find();
            res.json(teams);
        }
        catch (e) {
            res.status(500).json(e)
            console.log(e)
        }
    }
}

module.exports = new SeasonsController();
