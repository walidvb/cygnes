function init(){
  var states = [1, 2, 3];
  var currentState = 1;

  var $steps = $('.step');

  var $next = $('#next');
  $next.on('click', goToNextState);
  function goToNextState(){
    if(++currentState <= states.length - 1){
      $steps.addClass('hidden');
      $($steps[currentState]).removeClass('hidden');
    }
    else{
      $('#contact-details').modal();
    }
  }
  $($steps[currentState]).removeClass('hidden');
  window.drawing = drawingApp.init({
    outlineImageSrc: '/assets/duck/neutre.png'
  });
}

$(document).ready(init);
