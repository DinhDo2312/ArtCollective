$(document).ready(function() {
  console.log("{{mediaObj.createdAt}}");
  $("#commentSubmit").on("click",function(event){
    event.preventDefault();
    var newComment = {
      //Author is passed in from the session in req.params
      text: $("#commentBox").val(),
      mediaID: "{{mediaObj.ID}}",
      collectiveID: "{{mediaObj.collectiveID}}",
      type: "collective",
    };

    $.post("/api/comments",newComment).then(function(){
      location.reload();
    });
  });


});
