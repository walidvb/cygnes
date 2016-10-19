var api = new Api(),
  hyper = new Hyper();

function initWatcher(){
  var drawings = [],
    notPlayed = [],
    timer;
  function showDrawing(drawing){
    hyper.play(drawing);
  };

  api.getDrawings(function(elems){
    drawings = elems.slice(0);
    notPlayed = elems.slice(0);
    playRandom();
    timer = setInterval(playRandom, 45000);
  });

  api.listenToNew(function(elem){
    drawings.push(elem);
    clearInterval(timer);
    showDrawing(elem);
    setTimeout(playRandom, 45000);
  })


  function playRandom(){
    var index = Math.floor(Math.random()*notPlayed.length);
    var elem = notPlayed.pop(index);
    showDrawing(elem);
    // refill array once all have been played
    if(notPlayed.length == 0){
      notPlayed = drawings.slice(0);
    }
  }
}
$(document).ready(initWatcher)
