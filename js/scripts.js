(function(){


  var CHOOSE_DUCK = 0,
      PAINT = 1,
      CHOOSE_SCENE = 2,
      ENTER_DETAILS = 3,
      VIEW_RESULT = 4;
  var statesCount = 5;

  var formData = new FormData();
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
      var duck = $('input[name="duck"]').val();
      formData.append('duck', duck);
      drawing = drawingApp.init({
        outlineImageSrc: '/assets/duck/'+duck+'.png'
      });
    };
    function finishPaint(){
      drawing.getDrawing(formData);
    };
    function sceneSelected(){
      var scene = $('input[name="scene"]').val();
      formData.append('scene', scene)
    };
    function submitForm(){
      var data = $('form').serializeArray();
      for(var i = 0; i < data.length; i++){
        var val = data[i];
        formData.append([val.name], val.value)
      }
      $.ajax({
        url: '/test',
        data: formData,
        type: 'POST',
        method: 'POST',
        processData: false,
        success: function(data, e){
          console.log('success:', data, e);
        },
        error: function(data, e){
          console.log('error:', data, e);
        },
        contentType:"application/x-www-form-urlencoded"
      })
    }
    $next.add('#submit').on('click', goToNextState);
    function goToNextState(){
      switch(++currentState){
        case PAINT:
          duckSelected();
          break;
        case CHOOSE_SCENE:
          finishPaint();
          break;
        case ENTER_DETAILS:
          sceneSelected();
          $('#contact-details').modal();
          break;
        case VIEW_RESULT:
          submitForm();
          displayResult();
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
