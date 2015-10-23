var express = require('express');
var router = express.Router();
var request = require('superagent');
var async = require('async');
var token = require('../config').token; //replace with your instagram token
var alchemyKey = require('../config').alchemyKey; //replace with your Alchemy API key

function getData(foo) {
  // var token = require('../config').token;
  var data = [];
  async.waterfall([
    function(callback) {
      request.get("https://api.instagram.com/v1/tags/CapitalOne/media/recent?access_token=" + token)
        .end(function(err, result) {
          if (err) {
            callback(null, data, null);
          } else {
            data.push(result.body.data);
            callback(null, data, result.body.pagination.next_url);
          }
        });
    },
    function(data, url, callback) {
      if (url) {
        request.get(url)
          .end(function(err, result) {
            data.push(result.body.data);
            callback(null, data, result.body.pagination.next_url);
          });
      } else {
        callback(null, data, url);
      }
    },
    function(data, url, callback) {
      if (url) {
        request.get(url)
          .end(function(err, result) {
            data.push(result.body.data);
            callback(null, data, result.body.pagination.next_url);
          });
      } else {
        callback(null, data, url);
      }
    },
    function(data, url, callback) {
      if (url) {
        request.get(url)
          .end(function(err, result) {
            data.push(result.body.data);
            callback(null, data, result.body.pagination.next_url);
          });
      } else {
        callback(null, data, url);
      }
    }
  ], function(err, result, url) {
    foo(result);
  });

  // request.get("https://api.instagram.com/v1/tags/CapitalOne/media/recent?access_token=" + token)
  //   .end(function(err, result) {
  //     if (err) {
  //       return err;
  //     } else {
  //       // var data = result.body;
  //       // res.send(data.data[0]);
  //       var data = result.body.data;
  //       for (i = 0; i < 3; i++) {
  //         request.get(result.body.pagination.next_url)
  //           .end(function(err, result) {
  //             data.push(result.body.data);
  //           });
  //       }
  //       callback(data);
  //     }
  //   });
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
      //console.log(stuff.length);
      var data = stuff[0];
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

  router.post('/sentiment', function(req, res, next) {
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
