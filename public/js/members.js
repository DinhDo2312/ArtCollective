$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  $("#create").on('click', function(e){
    
  })

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

