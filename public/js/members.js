$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $("body").text(data.email);
    var userId = data.userID
  }).then(function(){
    $.get("/api/collective")
  }).then(function(data){
    // get joined collective data
    //store collective id data
  });



  $("#create").on('click', function(e){
    
  })
  
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





  // $("#sexySlick").slick({
  //   slide: '.slider-item',
  //   arrows: true,
  //   appendArrows: '.slider-container .slider-nav',
  //   prevArrow: '<span class:"slick-prev"></span>',
  //   nextArrow: '<span class="slick-next"></span>'


  // })


    $('#sexySlick').each(function() {
      var _this = $(this);
    $(this).slick({
      slide: '.slider-item',
      arrows: true,
      prevArrow: 'prev-slide',
      nextArrow: 'next-slide',
      appendArrows: ($(_this).hasClass('no-append')) ? '' : $('.slider-nav', _this),
    });
    });

    $('.prev-slide').on('click', function (e) {
      e.preventDefault();
      $('.#sexySlick').slick('slickPrev');
    });
  
    $('.next-slide').on('click', function (e) {
      e.preventDefault();
      $('#sexySlick').slick('slickNext');
    });

    $('#exampleModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })

});

