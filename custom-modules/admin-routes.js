const express = require('express');
const router = express.Router();
// middleware uniquement pour ce groupe de routes
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', function(req, res) {
    res.send('Admin home');
});
router.get('/user', function(req, res) {
    res.send('Admin user');
});
module.exports = router;