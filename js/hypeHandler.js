function Hyper(){

  function play(drawing, base64){
    var url = base64 || drawing.imagePath
    if(base64){
      actuallyPlay()
    }
    else{
      var img = new Image();
      img.onload = actuallyPlay;
      img.src = url;
    }
    function actuallyPlay(){
      $('body').addClass('on-screen');
      hypeDocument.showSceneNamed(drawing.scene)
      $('.HYPE_element.dessin').css({
        backgroundImage: 'url('+url+')',
      });
      $('.HYPE_element.fond').css({
        backgroundImage: 'url(anims2.hyperesources/'+drawing.duck+'_fond.png)',
      });
      $('#kid-name').text(drawing.name || 'Anonyme')
    }
  }

  return {
    play: play
  }
}
