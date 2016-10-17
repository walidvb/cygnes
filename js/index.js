var api = new Api(), hype = new Hyper();
function initPage(){
  var listContainer = $('.list-container')
  function showDrawing(drawing){
    hyper.play(drawing);
  };


  var isotoped = false;
  api.getDrawings(function(elems){
    for (var i = 0; i < elems.length; i++) {
      var elem = elems[i];
      var img = new Image();
      img.onload = function(){
        if(!isotoped){
          listContainer.isotope({
            itemSelector: '.drawing-item',
          });
          isotoped = true;
        }
        listContainer.append(drawing2DOM(this.elem)).isotope('layout');
      }
      img.elem = elem
      img.src = elem.imagePath;
    }

  });

  api.listenToNew(function(elem){
    listContainer.append(drawing2DOM(elem)).isotope('layout');
  });

  function drawing2DOM(d){
    var elem = $(`<div class="drawing-item">
      <img class="drawing-image" src="${d.imagePath}">
      <div class="name"> ${d.name}</div>
    </div>`);
    return elem;
  };

  function filterList(){
    listContainer.isotope({
      filter: function() {
        var name = $(this).find('.name').text().toLowerCase();
        query.indexOf(name) >= 0
        return
      }
    })
  }
};
$(document).ready(initPage);
