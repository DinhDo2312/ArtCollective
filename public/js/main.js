$(document).ready(function(){
    var accId;
    $.get("/api/user_data").then(function(data) {
      // $("#username").text(data.username)
      // $("username").attr('data-id', data.id)
      var userLink = $("<a></a>")
      var userUrl = "/user/" + data.id
      var span = $("<span></span>")
      $(userLink).attr('href', userUrl)
      $(span).text(data.username);
      $(userLink).attr('class', "member-name")
      $(userLink).append(span);
      $("#username").append(userLink);
    })

});