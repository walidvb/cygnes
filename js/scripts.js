(function(){
  var PAINT         = 0,
      CHOOSE_SCENE  = 1,
      ENTER_DETAILS = 2,
      THANKS       = 3,
      VIEW_RESULT   = 4;
  var statesCount   = 5;

  var api = new Api();
  var hyper = new Hyper();
  var base64;
  var formData = {
    duck: 'neutre'
  };
  var privateData = {};
  function init(){
    $('input[type="text"], input[type="email"]').keyboard({
      usePreview : false,
      autoAccept : true,
      autoAcceptOnValid: true,
      layout : 'custom',
      customLayout: {
        'normal': ["1 2 3 4 5 6 7 8 9 0 ' {b}", 'q w e r t z u i o p è {a}', 'a s d f g h j k l é à $', '{s} y x c v b n m , . - {s}', '{space} @'],
        'shift': ['+ " * ç % & / ( ) = {b}', 'Q W E R T Z U I O P ü {a}', 'A S D F G H J K L ö ä £', '{s} Y X C V B N M ; : _ {s}', '{space} @'],
      }

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

    $('input[name="scene"]').on('change', function(){
      $('body').removeClass('hide-next')
      formData.scene = $('input[name="scene"]:checked').val();
      console.log(formData);
    });
    $('input[name="name"]').on('change keyup keydown', function(){
      if($(this).val().length >= 3){
        $('body').removeClass('hide-next')
      }
    })
    function submitForm(contest){
      base64 = formData.base64.valueOf();
      formData.name = $('[name="name"]').val();
      formData.day = $('[name="day"]').val();
      formData.month = $('[name="month"]').val();
      formData.year = $('[name="year"]').val();
      delete formData.base64;
      api.save(formData, function(key){
        if(contest){
          privateData.foreignKey = key
          api.contest(privateData);
        }
      });
    };
    function displayResult(){
      $('.step').fadeOut(800, function(){
        hyper.play(formData, base64);
        setTimeout(function(){
          goToNextState();
          setTimeout(reset, 10000);
        }, 20000)
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
          $('body').removeClass('hide-previous');
          goToNext();
          if(!formData.scene){
            hideNext();
          }
          break;
        case CHOOSE_SCENE:
          goToNext();
          hideNext();
          break;
        case ENTER_DETAILS:
          submitForm();
          hideNext();
          displayResult();
          currentState++;
          $('body').addClass('hide-previous')
          break;
        case THANKS:
          $('body').removeClass('on-screen');
          $($steps[currentState]).removeClass('hidden');
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
    $('#previous').click(function goToPrev(){
      $('body').removeClass('hide-next');
      if(currentState-- == THANKS){
        $('#form-step-1').animate({'marginLeft': "0%"});
      }
      else{
        $steps.addClass('hidden');
        $($steps[currentState]).removeClass('hidden');
      }
      currentState = Math.max(0, currentState);
      if(currentState == PAINT){
        $('body').addClass('hide-previous')
      }
    });

    $('#reset').click(function(){
      reset();
    });
  }
  $(document).ready(init);
})()

function reset(){
  window.location.reload();
}
function hideNext(){
  $('body').addClass('hide-next');
}
