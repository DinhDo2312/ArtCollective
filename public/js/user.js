$(document).ready(function(){
    // $.get("/api/user_data").then(function(data) {

    // })
    $("#edit-user").on("click", function(e){
        $.get("/user/edit")
    })
});