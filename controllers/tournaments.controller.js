const Tournament = require('../models/tournament.model')

class TournamentController {
    async getTournaments(req, res) {
        try {
            const teams = await Tournament.aggregate(
                [
                    {
                        $project : {
                            _id: 0,
                            id: '$_id',
                            name: '$tournament_name',
                        }
                    }
                ]
            );
            res.json(teams);
        }
        catch (e) {
            res.status(500).json(e)
            console.log(e)
        }
    }

    async createTournament(req, res) {
        const {tournament_name} = req.body
        const newTournament = await Tournament.create({tournament_name})
        res.json(newTournament);
    }
}

module.exports = new TournamentController();
