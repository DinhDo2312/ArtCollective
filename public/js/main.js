$(document).ready(function(){
    var accId;
    $.get("/api/user_data").then(function(data) {
      $("#username").text(data.email);
    })
});