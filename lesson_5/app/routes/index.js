const express = require('express');
const midleware = require('../controllers/indexMidleware');
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Learn NodeJS Lesson 4' });
});
router.post('/login', midleware.login);
router.get('/dashboard',midleware.verifyToken,midleware.dashboard);
module.exports = router;