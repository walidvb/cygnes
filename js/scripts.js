var CHOOSE_DUCK = 0,
    PAINT = 1,
    CHOOSE_SCENE = 2,
    ENTER_DETAILS = 3,
    VIEW_RESULT = 4;
var statesCount = 5;
function init(){


  var currentState = 1,
    $steps = $('.step'),
    $next = $('#next'),
    drawing = drawingApp.init({
      outlineImageSrc: '/assets/duck/neutre.png'
    })
    ;

  function storeImage(url){
    var img = $('<img src="'+url+'"/>');
    img.appendTo($('body'))
  }

  $next.on('click', goToNextState);
  function goToNextState(){
    if(currentState == PAINT){
      drawing.getDrawing(storeImage)
    }
    if(++currentState <= statesCount){
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
