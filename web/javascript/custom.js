// to top btn
const toTopBtn = document.getElementById('to-top-btn');
// scrolls to top
toTopBtn.addEventListener("click",function(){
  $('html, body').animate({
    scrollTop: 0
  }, 800, function () {
  });
})
// checks browser size and decides weather or not to display to top button
window.addEventListener("scroll",function(){
  if (window.pageYOffset >= 400) {
    toTopBtn.classList.add('d-block')
  }
  else
    toTopBtn.classList.remove('d-block')
})

// Navbar scroll down

$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $(".menu-bar").addClass("bg-dark");
    } else {
      $(".menu-bar").removeClass("bg-dark");
    }
  });
});
 

// Gallery

$(document).ready(function () {

  $(".filter-button").click(function () {
    var value = $(this).attr('data-filter');

    if (value == "all") {
      $('.filter').show('1000');
    }
    else {
      $(".filter").not('.' + value).hide('3000');
      $('.filter').filter('.' + value).show('3000');

    }
  });

  if ($(".filter-button").removeClass("active1")) {
    $(this).removeClass("active1");
  }
  $(this).addClass("active1");

});



$(document).ready(function () {
  // Add scrollspy to <body>
  $('body').scrollspy({ target: ".navbar", offset: 50 });
  // Add smooth scrolling on all links inside the navbar
  $("#navbarNavAltMarkup a").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  // End if
  });
});

$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 670) {
      $('.port').addClass("bounce");
    } else {
      $('.port').removeClass("bounce");;
    }
  });
});

$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 2800) {
      $('.port1').addClass("bounce");
    } else {
      $('.port1').removeClass("bounce");;
    }
  });
});