var api = new Api(),
  hyper = new Hyper();

function initWatcher(){
  var drawings = [],
    timer;
  function showDrawing(drawing){
    hyper.play(drawing);
  };

  api.getDrawings(function(elems){
    drawings = elems;
    playRandom()
  });

  api.listenToNew(function(elem){
    clearTimeout(timer);
    showDrawing(elem);
    setTimeout(playRandom, 20000);
  })

  function playRandom(){
    timer = setTimeout(function(){
      var elem = drawings[Math.floor(Math.random()*drawings.length)];
      showDrawing(elem);
      playRandom();
    }, 10000)
  }
}
$(document).ready(initWatcher)
