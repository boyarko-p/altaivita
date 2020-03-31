//Polyfill object-fit-images
$(function () {
  objectFitImages()
})

//Preloader
$(window).on('load', function () {
  var $preloader = $('#preloader')
  $preloader.delay(500).fadeOut('slow')
})

