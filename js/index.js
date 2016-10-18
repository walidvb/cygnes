var api = new Api(), hyper = new Hyper();
function initPage(){
  var listContainer = $('.list-container')
  function showDrawing(drawing){
    preserveAspect();
    hyper.play(drawing);
  };

  var isotoped = false;
  listContainer.isotope({
    itemSelector: '.drawing-item',
  });

  api.listenToNew(function(elem){
    var img = new Image();
    img.onload = function(){
      var domElem = drawing2DOM(elem);
      listContainer.append(domElem).isotope('appended', domElem).isotope('layout');
      domElem.on('click', function(){
        showDrawing(elem);
      });
    }
    img.elem = elem
    img.src = elem.imagePath;
  }, true);

  function drawing2DOM(d){
    console.log(d);
    var elem = $(`<div class="drawing-item ${d.duck}">
      <img width="534px" height="780px" class="drawing-image" src="${d.imagePath}">
      <div class="name"> ${d.name || 'Anonyme'}</div>
    </div>`);
    return elem;
  };

  $('#result-background').on('click', function(){
    $('body').removeClass('on-screen');
  })
};
$(document).ready(initPage);
function preserveAspect() {
  var scaled = $("#result");

  scaled.css("box-sizing", "border-box");
  var ratio = 16/9;
  var w = $(window).width()*0.9;
  var h = $(window).height()*0.8;

  if (w > ratio*h) {
    scaled.css({
      width: ratio*h,
      height: h,
      margin: 'auto',
    });
    // horizontal centering is done using margin:auto in CSS
  } else if (h > w/ratio) {
    var newHeight = w/ratio;
    scaled.height(newHeight);
    // for vertical centering:
  }
  scaled.css({
    top: ($(window).height()-scaled.height())/2,
    left: ($(window).width()-scaled.width())/2,
  });

}
$(document).ready(function() {
    preserveAspect();
    $(window).resize(preserveAspect);
});
