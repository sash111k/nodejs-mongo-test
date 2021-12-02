const Router = require('express');
const router = new Router();
const tournamentController = require('../controllers/tournaments.controller')

router.get('/tournaments', tournamentController.getTournaments);
router.post('/tournaments', tournamentController.createTournament);


module.exports = router;
