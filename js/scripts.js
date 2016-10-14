(function(){
  var PAINT = 0,
      CHOOSE_SCENE = 1,
      ENTER_DETAILS = 2,
      VIEW_RESULT = 3;
  var statesCount = 4;

  var api = new Api();
  var hyper = new Hyper();
  var base64;
  var formData = {}
  function init(){
    var currentState = 0,
      $steps = $('.step'),
      $next = $('#next')
      ;

    drawingApp.init({
      outlineImageSrc: '/assets/duck/neutre.png',
      target: document.getElementById('canvasDiv')
    })
    function storeImage(url){
      var img = $('<img src="'+url+'"/>');
      img.appendTo($('body'))
    }

    $('input[name= "duck"]').on('change', duckSelected)
    function duckSelected(e){
      formData.duck = $(this).val();
      console.log(formData);
      drawingApp.setOutlineImage('/assets/duck/'+formData.duck+'.png')

    };


    // Story
    function finishPaint(){
      drawingApp.getDrawing(formData);
    };
    function sceneSelected(){
      formData.scene = $('input[name="scene"]').val();
    };
    $('#submit').on('click', submitForm);
    function submitForm(){
      var data = $('form').serializeArray();
      for(var i = 0; i < data.length; i++){
        var val = data[i];
        formData[val.name] = val.value
      }
      console.log('image uploaded!', formData);


      base64 = formData.base64.valueOf();
      delete formData.base64;
      api.save(formData, function(){});
      displayResult();
    };
    function displayResult(){

      hyper.play(formData.scene);
      $('.HYPE_element.fond').css({
        backgroundImage: 'url(/assets/fonds/'+formData.duck+'.png)',
      })
      console.log(base64);
      $('.HYPE_element.dessin').css({
        backgroundImage: 'url('+base64+')',
      });
      $('#contact-details').modal('hide');
    };
    $('#submit').on('click', submitForm);
    $next.on('click', goToNextState);
    function goToNextState(){
      switch(currentState++){
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

  }
  $(document).ready(init);
})()
