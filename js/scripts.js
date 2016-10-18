(function(){
  var PAINT = 0,
      CHOOSE_SCENE = 1,
      ENTER_DETAILS = 2,
      VIEW_RESULT = 3;
  var statesCount = 4;

  var api = new Api();
  var hyper = new Hyper();
  var base64;
  var formData = {
    duck: 'neutre'
  }
  function init(){
    $('input').keyboard({
      usePreview : false,
    });

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

    $('input[name="name"]').on('keyup', function(){
      if($('input[name="name"]').val().length >= 2){
        $('#next-form, #no-contest').removeClass('disabled')
      }
    })
    $(document).on('click', '#next-form:not(.disabled)',function(){
      $('.modal #form-step-1').animate({'marginLeft': "-100%"})
    });
    $(document).on('click', '.submit:not(.disabled)', submitForm);
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
      $('.step').fadeOut(800, function(){
        hyper.play(formData, base64);
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
      if(currentState < statesCount -2){
        $steps.addClass('hidden');
        $($steps[currentState]).removeClass('hidden');
      }
    }

  }
  $(document).ready(init);
})()
