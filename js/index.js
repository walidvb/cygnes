var api = new Api(), hyper = new Hyper();
function initPage(){
  var listContainer = $('.list-container')
  function showDrawing(drawing){
    preserveAspect();
    replaceShareUrls(drawing);
    hyper.play(drawing);
  };

  var isotoped = false;
  listContainer.isotope({
    itemSelector: '.drawing-item',
  });

  api.listenToNew(function(elem){
    var img = new Image();
    var domElem = drawing2DOM(elem);
    listContainer.append(domElem).isotope('appended', domElem).isotope('layout');
    img.onload = function(){
      domElem.toggleClass('loading ready')
      domElem.on('click', function(){
        showDrawing(elem);
      });
    }
    img.elem = elem
    img.src = elem.imagePath;
  }, true);

  function drawing2DOM(d){
    var elem = $(`<div class="drawing-item loading ${d.duck}">
      <img width="534px" height="780px" class="drawing-image" src="${d.imagePath}">
      <div class="info">
        <div class="name"> ${d.name || 'Anonyme'}</div>
        <div class="birthday"> ${d.day} ${d.month} ${d.year}</div>
      </div>
    </div>`);
    return elem;
  };

  $('#result-background').on('click', function(){
    $('body').removeClass('on-screen');
  })

  function replaceShareUrls(drawing){
    var rawUrl = `http://cygnes.vbbros.net?${$.param(drawing)}`;
    var url = encodeURIComponent(rawUrl);
    $('.download').attr('href', drawing.imagePath);
    var twitterStatus = encodeURI(`Viens voir le cygne que j'ai dessiné pour les 25 ans des #cygnes! ${rawUrl}`);
    $('.twitter').attr('href', `https://twitter.com/home?status=${twitterStatus}`);
    $('.pinterest').attr('href', `https://pinterest.com/pin/create/button/?url=${url}`);
    $('.facebook').attr('href', `https://www.facebook.com/sharer/sharer.php?u=${url}`);
  }
  
  window.hypeLoaded = function(){
    if(requestedDrawing){
      showDrawing(requestedDrawing);
    }
  }
};
$(document).ready(initPage);
$(document).on('click', '.sharers a.share', popup)
function popup(e){
  var height, left, top, url, width;
  e.preventDefault();
  url = e.target.href;
  width = 626;
  height = 336;
  top = (window.innerHeight - height) / 2 + window.screenTop;
  left = (window.innerWidth - width) / 2 + window.screenLeft;
  return window.open(url, "", 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);
}
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
