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