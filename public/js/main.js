$(document).ready(function(){
  $.get("/api/user_data").then(function(data) {
    if(data.id){
      var userLink = $("<a></a>")
      var userUrl = "/user/" + data.id
      var span = $("<span></span>")
      $(userLink).attr('href', userUrl)
      $(span).text(data.username);
      $(userLink).attr('class', "member-name")
      $(userLink).append(span);
      $("#username").append(userLink);
      $('#logout').removeAttr('hidden')
      $('#login').hide();
      $('#join').hide();     

    }
  });
});