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
      hypeDocument.showSceneNamed(drawing.scene)
      $('.HYPE_element.dessin').css({
        backgroundImage: 'url('+url+')',
      });
      $('.HYPE_element.fond').css({
        backgroundImage: 'url(/anims2.hyperesources/'+drawing.duck+'_fond.png)',
      })
    }
  }

  return {
    play: play
  }
}
