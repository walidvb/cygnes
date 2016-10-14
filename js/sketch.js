var drawingApp = (function () {
  var
    colors = ["#cb3594", "#659b41", "#ffcf33", "#986928"],
    sketch,
    duck = new Image(),
    container;


  function initInterface(canvas){
    var colorPicker = $('<div class="color-picker"/>')
    function addMarker(color, crayonType){
      var marker = $('<a href="#'+canvas.id+'" data-color="'+color+'"><img src="/assets/sketcher/'+crayonType+'-outline.png"/></a>');
      marker.css('backgroundColor', color);
      marker.appendTo(container)
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
      duck.onload = function(){
        canvas.width = duck.width
        canvas.height = duck.height;
      }
      duck.src = outlineImageSrc;
			// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
			canvasWidth = target.clientWidth;
			canvasHeight = target.clientHeight;
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);

			canvas.setAttribute('id', 'canvas');
      container.append(initInterface(canvas));
			target.appendChild(canvas);

      sketch = $(canvas).sketch({
        outlineImageSrc: outlineImageSrc,
      }).data('sketch');
      sketch.redraw();
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
