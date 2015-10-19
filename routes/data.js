var express = require('express');
var router = express.Router();
var request = require('superagent');
var token = "1322982215.b444b9d.0092e464ee594fa3b069c37d38870203";
var alchemyKey = "84a11305e55465ffe6ea5c73d42600188ec23c0f";

function getData(callback) {
  // var token = require('../config').token;
  request.get("https://api.instagram.com/v1/tags/CapitalOne/media/recent?access_token=" + token)
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

  router.get('/recent20', function(req, res, next) {
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

  router.get('/userInfo/:id', function(req, res, next) {
    var id = req.params.id;
    request.get("https://api.instagram.com/v1/users/"+id+"/?access_token=" + token)
    .set('Accept', 'application/json')
    .end(function(err, result) {
      res.send(JSON.parse(result.text).data);
    });
  });

  router.post('/sentiment/', function(req, res, next) {
    var param = req.body.text;
    // console.log(param);
    // console.log("Before " + param);
    var text = encodeURIComponent(param);
    // console.log("After " + text);
    // var regexp = new RegExp('#([^\\s]*)','g');
    // var text = param.replace(regexp, ' ');
    // var text = param.replace(/^#/, '');
    // console.log(text);
    // console.log(text);
    //var text = "I love my life";
    // console.log(text);
    request.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey="+alchemyKey+"&text="+text+"&outputMode=json")
    .end(function(err, result) {
      // console.log(result);
      // res.send(JSON.stringify(result));
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        if (JSON.parse(result.text).status == "OK") {
          res.send(JSON.parse(result.text).docSentiment);
        } else {
          res.send(JSON.parse(result.text));
        }
      }
    });
    // res.send("good job");
  });

  // var createObject = function (privateStuff) {
  //   return {
  //     getStuff:function () {
  //       return privateStuff;
  //     }
  //   }
  // }

module.exports = router;
