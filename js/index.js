var hyper = new Hyper(), api = new Api();


function initPage(){
  var listContainer = $('.list-container')
  var fb = new Firebase('https://cygnes-8fced.firebaseio.com/drawing');
  var pageRef = new Firebase.util.Paginate(fb, 'dateId', {pageSize: 10});
  pageRef.on('child_added', addElem);

  pageRef.page.next();

  var searchTimer;
  $('#search').on('input', function(){
    function search(query, cb){
      $('.drawing-item').hide();
      fb.orderByChild("name").startAt(query).endAt(query+'\uf8ff').on('value', cb);
    };
    clearTimeout(searchTimer);
    var query = $(this).val();
    if(query.length){
      searchTimer = setTimeout(function(){search(query, showResult)}, 300)
    }
    else{
      pageRef.page.setPage(2);
      pageRef.page.next();
    }

    function showResult(elems){
      elems = elems.val()
      var results = []
      for(key in elems){
        var ee = elems[key];
        ee.key = key;
        results.push(ee);
      }
      results = results.sort(function(a, b){a.dateId < b.dateId})
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        addElem(results[i]);
      }

    };
  });
  $('.next').click(function(){
    listContainer.find('.drawing-item').hide().addClass('remove');
    pageRef.page.next();
  });
  $('.previous').click(function(){
    listContainer.find('.drawing-item').hide().addClass('remove');
    pageRef.page.prev();
  });

  window.showDrawing = function(drawing){
    preserveAspect();
    replaceShareUrls(drawing);
    hyper.play(drawing);
  };

  var isotoped = false;

  function checkPaging(){
    $('.next').toggleClass('disabled', !pageRef.page.hasNext());
    $('.previous').toggleClass('disabled', !pageRef.page.hasPrev());
  }
  function addElem(elem, key){
    checkPaging();
    $('.loader').hide();
    if(elem.val){
      var key = elem.key();
      elem = elem.val();
      elem.key = key;
    }
    var img = new Image();
    var domElem = drawing2DOM(elem);
    listContainer.append(domElem);
    img.onload = function(){
      domElem.toggleClass('loading ready')
      domElem.on('click', function(){
        showDrawing(elem);
      });
    }
    img.elem = elem
    img.src = elem.imagePath;
  }
  function drawing2DOM(d){
    console.log(d);
    var elem = $(`<div class="drawing-item loading ${d.duck} ">
      <div class="img-container">
        <img width="534px" height="780px" class="drawing-image" src="${d.imagePath}" />
      </div>
      <div class="info">
        <div class="name"> ${d.name || 'Anonyme'}</div>
        <div class="birthday"> ${d.day} ${d.month} ${d.year}</div>
      </div>
    </div>`);
    if(authorisedUser){
      var deleter = $('<div class="delete">effacer</div>');
      elem.find('.info').append(deleter);
      deleter.on('click', function(e){
        e.stopPropagation();
        api.delete(d.key);
      });
    }
    return elem;
  };

  $('#result-background').on('click', function(){
    $('body').removeClass('on-screen');
  })

  function replaceShareUrls(drawing){
    var rawUrl = `http://www.lescygnes.ch/picky2016?${$.param(drawing)}`;
    var url = encodeURIComponent(rawUrl);
    $('.link').attr('href', rawUrl);
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
