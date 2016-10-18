(function(){
  var PAINT         = 0,
      CHOOSE_SCENE  = 1,
      ENTER_DETAILS = 2,
      CONTEST       = 3,
      VIEW_RESULT   = 4;
  var statesCount   = 5;

  var api = new Api();
  var hyper = new Hyper();
  var base64;
  var formData = {
    duck: 'neutre'
  }
  function init(){
    $('input[type="text"], input[type="email"]').keyboard({
      usePreview : false,
      autoAccept : true,
      autoAcceptOnValid: true,
    });
    $('input[name="name"]').on('change', function(){
      if($('input[name="name"]').val().length >= 2){
        $('#next-form, #no-contest').removeClass('disabled')
      }
    })

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

    $('.duck-list .duck').on('click', duckSelected)
    function duckSelected(){
      var selected = $(this).hasClass('selected');
      $('.duck').removeClass('selected');
      var selection;
      if(selected){
        selection = 'neutre';
      }else{
        selection = $(this).data('duck');
        $(this).addClass('selected');
      }
      formData.duck = selection;
      drawingApp.setOutlineImage('/assets/duck/'+selection+'.png')
    };


    // Story
    function finishPaint(){
      drawingApp.getDrawing(formData);
    };
    function sceneSelected(){
      formData.scene = $('input[name="scene"]').val();
    };
    $('input[name="scene"]').on('change', function(){
      $('body').removeClass('hide-next')
    });
    $('input[name="name"]').on('change keyup keydown', function(){
      if($(this).val().length > 3){
        $('body').removeClass('hide-next')
      }
    })
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
      hideNext();
    };
    $('#submit').on('click', submitForm);
    $next.on('click', goToNextState);
    function goToNextState(){
      console.log(currentState);
      switch(currentState){
        case PAINT:
          finishPaint();
          goToNext();
          hideNext();
          break;
        case CHOOSE_SCENE:
          sceneSelected();
          goToNext();
          hideNext();
          break;
        case ENTER_DETAILS:
          if($('#contest').is(':checked')){
            $('#form-step-1').animate({'marginLeft': "-100%"})
          }else{
            submitForm();
          }
          break;
        case CONTEST:
          submitForm();
          break;
        default:
          console.error('wtf?');
      }
    }

    function goToNext(){
      currentState++;
      $steps.addClass('hidden');
      $($steps[currentState]).removeClass('hidden');
    }

  }
  $(document).ready(init);
})()


function hideNext(){
  $('body').addClass('hide-next');
}
