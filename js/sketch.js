var drawingApp = (function () {
  var
    colors = ["#0074D9", "#3D9970", "#FFDC00", "#FF851B", "#FF4136", "#F012BE"],
    canvas,
    sketch,
    duck = new Image(),
    container;


  function initInterface(canvas){
    var colorPicker = $('<div class="color-picker"/>')
    function addMarker(color, crayonType){
      var marker = $('<a href="#'+canvas.id+'" data-color="'+color+'"><img src="/assets/sketcher/'+crayonType+'-outline.png"/></a>');
      marker.css('backgroundColor', color);
      marker.appendTo(colorPicker)
    }
    for (var i = 0; i < colors.length; i++) {
      addMarker(colors[i], 'marker')
    }
    return colorPicker;
  }

  return {
    init: function(options){
      options = options || {}
      var target = options.target || document.getElementById('canvasDiv');
      container = $(target);
			var outlineImageSrc = options.outlineImageSrc;
      canvas = document.createElement('canvas');
      duck.onload = function(){
        canvas.width = duck.width
        canvas.height = duck.height;
  			// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
  			var canvasWidth = target.clientWidth;
  			var canvasHeight = duck.height;
        container.css('height', canvasHeight)



  			canvas.setAttribute('id', 'canvas');
        container.append(initInterface(canvas));

  			target.appendChild(canvas);

        sketch = $(canvas).sketch({
          outlineImageSrc: outlineImageSrc,
        }).data('sketch');
        sketch.context.drawImage(duck, 0, 0, duck.width, duck.height);
      }
      duck.src = outlineImageSrc;
    },
    getDrawing: function(formData){
      var url = canvas.toBlob(function(blob){
        formData.image = blob;
      });
      formData.base64 = canvas.toDataURL();
    },
    setOutlineImage: function(newSrc){
      sketch.setOutlineImage(newSrc);

    },
  }
})()
