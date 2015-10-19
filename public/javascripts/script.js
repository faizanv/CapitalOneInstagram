$(document).ready(function() {
  $.get("data/recent20", function(data) {
    for (i = 0; i < data.length; i++) {
      var helper = function (index) {
        var username = "<h2>@"+data[index].user.username+"</h2>";
        var profile_picture = "<img src='"+data[index].user.profile_picture+"'>";
        var mainImage = data[index].images.low_resolution.url;
        var caption = '';
        var likes = '';
        var fullName = '';
        var totalPosts = '';
        var followers = '';
        var follows = '';

        if (data[i].caption) {
          caption = data[index].caption.text;
          var cap = {"text":caption};
          var helper2 = function (caption) {
            $.ajax({
              url: "data/sentiment",
              type: "POST",
              data: JSON.stringify(caption),
              dataType: "json",
              contentType: "application/json; charset=UTF-8",
              success: function(res) {
                // console.log(res);
                var sent = '';
                console.log(res);
                if (res.type == "positive") {
                  sent = "<span style='color:green;'>"+res.type+"</span>";
                } else if (res.type == "negative") {
                  sent = "<span style='color:red;'>"+res.type+"</span>";
                } else {
                  sent = "<span style='color:yellow;'>"+res.type+"</span>";
                }
                $("#bar" + index).after("<h2><strong>Sentiment: </strong>"+sent+  " (Score: "+res.score+")</h2>")
              }
            });
          }(cap);
        }
        if (data[index].likes) {
          likes = data[index].likes.count;
        }
        var id = data[index].user.id;
        $("#twenty").append("<div class='jumbotron' id='foo"+index+"'><div class='thumbnail' id='bar"+index+"'>"+username+profile_picture+"</div><img src='"+mainImage+"'><h4>"+caption+"</h4><h3>"+likes+" - Likes</h3></div>");

        $.get("data/userInfo/" + id, function(res) {
          fullName = res.full_name;
          totalPosts = res.counts.media;
          followers = res.counts.followed_by;
          follows = res.counts.follows;
          $('#foo' + index).append("<div class='thumbnail'><h2>More Info About @"+res.username+"</h2><h3><strong>Full Name:</strong> \""+fullName+"\"</h3><h3><strong>Total Post:</strong> "+totalPosts+"</h3><h3><strong>Followers: </strong>"+followers+"</h3><h3><strong>Following: </strong>"+follows+"</h3></div>");
        });
      }(i);
    }
  });
});
