var drawingApp = (function () {
  var
    colors = ["#0074D9", "#3D9970", "#FFDC00", "#FF851B", "#FF4136", "#F012BE"],
    canvas,
    sketch,
    duck = new Image(),
    container;


  function initInterface(canvas){
    var colorPicker = $('.color-picker');
    function addMarker(color, crayonType){
      var marker = $('<a href="#'+canvas.id+'" data-color="'+color+'" class="color" />');
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
        canvas.setAttribute('class', 'shadow');
        target.appendChild(canvas);
        initInterface(canvas);


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
if (!HTMLCanvasElement.prototype.toBlob) {
 Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
  value: function (callback, type, quality) {

    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (var i=0; i<len; i++ ) {
     arr[i] = binStr.charCodeAt(i);
    }

    callback( new Blob( [arr], {type: type || 'image/png'} ) );
  }
 });
}
