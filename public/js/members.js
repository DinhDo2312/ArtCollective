
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $(document).ready(function(){
    $.get("/api/user_data").then(function(data) {
      $("#username").text(data.email);
    });
  // .then(function(){
      //  var collectId = data.collective.id
      //  var queryUrl = "/api/collective/" + collectId;
  //   $.get(queryUrl)
  // }).then(function(data){
  //   // get joined collective data
  //   //store collective id data
        // populateSlides(collectiveMediaData);
  // });



  // $("#create").on('click', function(e){
    
  // })
  
function populateSlides(collectiveMediaData){
  for (var i=0; i<collectiveMediaData.length; i++){
    switch (collectiveMediaData.type){
      case ("img"):
        //create slide element
        //push into corresponding carousel
      break;
      case ("txt"):
        //create slide element
        //push into corresponding carousel
      break;
      case ("audio"):
        //create slide element
        //push into corresponding carousel
      break;
    }
  }
}



    $("#sexySlick").slick({
      slide: '.slider-item',
      arrows: true,
      prevArrow: 'prev-slide',
      nextArrow: 'next-slide',
      appendArrows: ($(this).hasClass('no-append')) ? '' : $('.slider-nav', this),
    });
  

    $('.prev-slide').on('click', function (e) {
      e.preventDefault();
      $('#sexySlick').slick('slickPrev');
    });
  
    $('.next-slide').on('click', function (e) {
      e.preventDefault();
      $('#sexySlick').slick('slickNext');
    });

    $('#exampleModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    });

  });
