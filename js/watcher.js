var api = new Api(),
  hyper = new Hyper,
  drawings = [];

function initWatcher(){
  function showDrawing(drawing){
    console.log(drawing);
    hyper.play(drawing)
  };

  api.getDrawings(function(elems){
    drawings = elems;
  });

  api.listenToNew(function(elem){
    showDrawing(elem)
  })

}
$(document).ready(initWatcher)
