function Hyper(){
  function getHTML(choice){
    return $('<div id="'+ choice +'_hype_container" style="margin:auto;position:relative;width:100%;height:100%;overflow:hidden;" aria-live="polite"> \
    <script type="text/javascript" charset="utf-8" src="'+choice+'.hyperesources/'+choice+'_hype_generated_script.js?86704"></script> \
    </div>');
  }

  function play(choice){
    $('body').append(getHTML(choice));
  }

  return {
    play: play
  }
}
