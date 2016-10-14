function Hyper(hyperDocument){
  
  function play(choice){
    $('body').append(getHTML(choice));
  }

  return {
    play: play
  }
}
