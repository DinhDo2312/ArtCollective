  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $(document).ready(function(){
    var accId;
    $.get("/api/user_data").then(function(data) {
      $("#username").text(data.email);
    })

    // console.log(resultObj)
    // make a get for a junction table?
  // .then(function(data){
  //      var collectId = data.collective.id
  //      var queryUrl = "/api/collective/" + collectId;
  //   $.get(queryUrl)
  // }).then(function(data){
    // get joined collective data
    //store collective id data
  //       populateSlides(collectiveMediaData);
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



    $("#txtSlick").slick({
      slide: '.slider-item',
      arrows: true,
      prevArrow: 'prev-slide',
      nextArrow: 'next-slide',
      appendArrows: ($(this).hasClass('no-append')) ? '' : $('.slider-nav', this),
    });

    $("#imgSlick").slick({
      slide: '.slider-item',
      arrows: true,
      prevArrow: 'prev-slide',
      nextArrow: 'next-slide',
      appendArrows: ($(this).hasClass('no-append')) ? '' : $('.slider-nav', this),
    });

    $("#audioSlick").slick({
      slide: '.slider-item',
      arrows: true,
      prevArrow: 'prev-slide',
      nextArrow: 'next-slide',
      appendArrows: ($(this).hasClass('no-append')) ? '' : $('.slider-nav', this),
    });


  

    $('#prev-slide-1').on('click', function (e) {
      e.preventDefault();
      $('#imgSlick').slick('slickPrev');
    });
  
    $('#next-slide-1').on('click', function (e) {
      e.preventDefault();
      $('#imgSlick').slick('slickNext');
    });

    $('#prev-slide-2').on('click', function (e) {
      e.preventDefault();
      $('#txtSlick').slick('slickPrev');
    });
  
    $('#next-slide-2').on('click', function (e) {
      e.preventDefault();
      $('#txtSlick').slick('slickNext');
    });

    $('#prev-slide-3').on('click', function (e) {
      e.preventDefault();
      $('#audioSlick').slick('slickPrev');
    });
  
    $('#next-slide-3').on('click', function (e) {
      e.preventDefault();
      $('#audioSlick').slick('slickNext');
    });



    $(".slider-item").on("click", function(e){
      console.log('clicked');
      var id = $(this).data("id");
      $.get("api/media/" + id, function(r){
        
        
        
      })
    });

    // $("#create-button").on("click", function(e){
    //   console.log("clicked");
    //   $.get("create", function(r){

    //   })
    // })

  });
