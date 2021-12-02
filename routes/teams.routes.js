const Router = require('express');
const router = new Router();
const teamsController = require('../controllers/teams.controller');

router.get('/teams', teamsController.getTeams);
router.post('/teams', teamsController.createTeam);


module.exports = router;
