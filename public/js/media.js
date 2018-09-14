$(document).ready(function() {
    var queryURL = "/api/media/2" //The mediaID will be passed from the previous page
    $.get(queryURL).then(function(data) {
        result = data
        console.log(result)
        buildMedia(result.mediaObj, result.userObj)
      });
    });
    // buildComments(mediaObj.comments,mediaObj.commentUsers)

//Loops through the comments array and formats the data

function buildMedia(media,user){
    var newTitle = $('<div>').html(media.title);
    var newContent = $('<div>').html(media.description);
    var newAuthor = $('<div>').html(user.username);
    newAuthor.attr('id',user.ID)
    var newDate = $('<div>').html(media.title);

    $('#media').append(newTitle,newContent,newAuthor,newDate)
}

function buildComments(comments,users){
    for (var i = 0; i < comments.length; i++){
        var newComment = $('<div>');
        newComment.addClass('comment');

        var commentUser = $('<div>').attr('id',users[i].ID);
        commentUser = $('<div>').html(users[i].ID);

        var commentContent = $('<div>').html(comments[i].text);
        var commentDate = $('<div>').html(comments[i].createdAt);

        newComment.append(commentUser, commentContent, commentDate)
    $('#comments').append(newComment)
    }
}
