var express = require('express');
var router = express.Router();
var request = require('superagent');

function getData(callback) {
  // var token = require('../config').token;
  request.get("https://api.instagram.com/v1/tags/CapitalOne/media/recent?access_token=1322982215.b444b9d.0092e464ee594fa3b069c37d38870203")
    .set('Accept', 'application/json')
    .end(function(err, result) {
      if (err) {
        return err;
      } else {
        // var data = result.body;
        // res.send(data.data[0]);
        callback(result.body);
      }
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  getData(function (stuff) {
    res.send(stuff);
  });
});

  router.get('/recent20', function(rew, res, next) {
    // var obj = createObject("");
    //
    // obj.getStuff();
    getData(function (stuff) {
      var data = stuff.data;
      var result = [];
      var i = 0;
      while (i < 20 || i < data.length) {
        result.push(data[i]);
        i++;
      }
      res.send(result);
    });
  });

  // var createObject = function (privateStuff) {
  //   return {
  //     getStuff:function () {
  //       return privateStuff;
  //     }
  //   }
  // }

module.exports = router;
