$(document).ready(function() {
  $.get("data/recent20", function(data) {
    for (i = 0; i < data.length; i++) {
      var username = data[i].user.username;
      var profile_picture = data[i].user.profile_picture;
      var mainImage = data[i].images.low_resolution.url;
      var caption = '';
      var likes = '';
      if (data[i].caption) {
        caption = data[i].caption.text;
      }
      if (data[i].likes) {
        likes = data[i].likes.count;
      }
      $("#twenty").append("<div class='jumbotron'><div class='thumbnail'><h2 style='text-align:center;'>@"+username+"</h2><img src='"+profile_picture+"'></div><img src='"+mainImage+"'><h4>"+caption+"</h4><h3>"+likes+" - Likes</h3></div>");
    }
  });
});
