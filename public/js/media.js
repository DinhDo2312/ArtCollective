var mediaObj = {
    media: {
      ID: 1,
      title: 'Title',
      file: null,
      description: 'Lorem Ipsum',
      type: 'text',
      userID: 1,
      collectiveID: 1,
      createdAt: '5 PM'
  
    },
    
    postUser:{
        ID: 1,
        username: 'MyUsername',
        avatar: 'avatar1.png'
    },

    comments: [{
      ID: 1,
      userID: 2,
      type: "media",
      collectiveID: "null",
      mediaID: 1,
      text: "Lorem Ipsum",
      createdAt: '5:01 PM'
    },{
      ID: 2,
      userID: 2,
      type: "media",
      collectiveID: "null",
      mediaID: 1,
      text: "Lorem Ipsum",
    }],
  
    commentUsers: [{
      ID: 1,
      username: 'user2',
      avatar: 'placeholder.jpg'
    },{
        ID: 2,
        username: 'user2',
        avatar: 'placeholder.jpg'
    }]
};

$(document).ready(function() {
    buildMedia(mediaObj.media,mediaObj.postUser)
    buildComments(mediaObj.comments,mediaObj.commentUsers)
    
    
})

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
