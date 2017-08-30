var express = require('express');
var https = require('https');
var router = express.Router();

const checkTimes = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  https.get('https://mif.vu.lt/timetable/mif/groups/612i30001-programu-sistemos-4-k-4-gr-2017/', (resp) => {
    var response = '';

    resp.on('data', (d) => {
      response += d;
    });

    resp.on('end', () => {
      const isDown = response.includes("Error 404");  
      const currentTime = new Date().toString();

      checkTimes.unshift(currentTime);

      if(checkTimes.length > 5){
        checkTimes.pop();
      }

      const title = 'Status: ' + (isDown ? 'OFF' : 'ON')

      res.render('index', { title, isDown, currentTime, lastChecks: checkTimes});
    })
  })
  
});

module.exports = router;
