const Team = require('../models/team.model')

class TeamsController {
    async getTeams(req, res) {
        try {
            const teams = await Team.find();
            res.json(teams);
        }
        catch (e) {
            res.status(500).json(e)
            console.log(e)
        }
    }

    async createTeam(req, res) {
        const {team_name} = req.body
        const team = await Team.create({team_name})
        res.json(team);
    }
}

module.exports = new TeamsController();
