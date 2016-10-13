(function(){
  var CHOOSE_DUCK = 0,
      PAINT = 1,
      CHOOSE_SCENE = 2,
      ENTER_DETAILS = 3,
      VIEW_RESULT = 4;
  var statesCount = 5;

  var api = new Api();
  var hyper = new Hyper();
  var formData = {}
  function init(){
    var currentState = 0,
      $steps = $('.step'),
      $next = $('#next')
      ;

    function storeImage(url){
      var img = $('<img src="'+url+'"/>');
      img.appendTo($('body'))
    }
    function duckSelected(){
      formData.duck = $('input[name="duck"]').val();
      drawing = drawingApp.init({
        outlineImageSrc: '/assets/duck/'+formData.duck+'.png'
      });
    };
    function finishPaint(){
      drawing.getDrawing(formData);
    };
    function sceneSelected(){
      formData.scene = $('input[name="scene"]').val();
    };
    function submitForm(){
      var data = $('form').serializeArray();
      for(var i = 0; i < data.length; i++){
        var val = data[i];
        formData[val.name] = val.value
      }
      api.save(formData, displayResult());
    };
    function displayResult(){
      console.log('image uploaded!');
      hyper.play(formData.scene);
    };
    $next.on('click', goToNextState);
    function goToNextState(){
      switch(currentState++){
        case CHOOSE_DUCK:
          duckSelected();
          break;
        case PAINT:
          finishPaint();
          break;
        case CHOOSE_SCENE:
          sceneSelected();
          $('#contact-details').modal();
          break;
        case ENTER_DETAILS:
          submitForm();
          break;
        default:
          console.error('wtf?');
      }
      if(currentState < statesCount){
        $steps.addClass('hidden');
        $($steps[currentState]).removeClass('hidden');
      }
    }
    $($steps[currentState]).removeClass('hidden');
  }
  $(document).ready(init);
})()
