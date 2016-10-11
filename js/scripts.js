function init(){
  var states = [1, 2, 3];
  var currentState = 0;

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
  $('#contact-details').modal();
  $($steps[currentState]).removeClass('hidden');
}

$(document).ready(init);
