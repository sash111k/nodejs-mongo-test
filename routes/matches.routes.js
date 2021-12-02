const Router = require('express');
const router = new Router();
const matchesController = require('../controllers/matches.controller')

router.post('/matches', matchesController.createMatch);
router.get('/matches', matchesController.getMatches);

module.exports = router;
