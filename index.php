<!DOCTYPE html>
<html>
  <head>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
    <?php
      error_reporting(0);
      if(count($_GET) > 0){
        $img_url = $_GET["imagePath"];
        $duck = $_GET["duck"];
        $scene = $_GET["scene"];
        $name = $_GET["name"];
        $day = $_GET["day"];
        $month = $_GET["month"];
        $year =  $_GET["year"];
        $birthday = $_GET["day"] . "." . $_GET["month"] . "." . $_GET["year"];
      }
      else{
        $img_url = '/assets/logo.png';
      }
    ?>
    <?php if(count($_GET) > 0): ?>
      <script>
        var requestedDrawing = {
          duck: "<?php print $duck?>",
          scene: "<?php print $scene?>",
          imagePath: "<?php print $img_url?>",
          day: "<?php print $day?>",
          month: "<?php print $month?>",
          year: "<?php print $year?>",
          name: "<?php print $name?>",
        };
      </script>
    <?php endif; ?>
    <title>Les Cygnes</title>
    <meta content="" property="og:site_name">
    <meta content="&lt;?php print $name?&gt; est passé au Centre Commercial des Cygnes!" name="description">
    <meta content="&lt;?php print $name?&gt; est passé au Centre Commercial des Cygnes!" property="og:description">
    <meta content="&lt;?php print $img_url?&gt;" property="og:image">
    <meta content="&lt;?php print $img_url?&gt;" property="og:url">
    <meta content="entertainment" property="og:type">
    <meta content="Le Centre Commercial des Cygnes fête ses 25ans!" property="og:title">
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="https://cdn.firebase.com/js/client/2.3.2/firebase.js"></script>
    <script src="https://cdn.firebase.com/js/client/2.3.2/firebase.js"></script>
    <script src="//www.gstatic.com/firebasejs/3.4.1/firebase.js"></script>
    <script src="https://cdn.firebase.com/libs/firebase-util/0.2.5/firebase-util.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.1/isotope.pkgd.min.js"></script>
    <!-- Latest compiled and minified CSS -->
    <link crossorigin="anonymous" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" rel="stylesheet">
    <!-- Optional theme -->
    <link crossorigin="anonymous" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" rel="stylesheet">
    <!-- Latest compiled and minified JavaScript -->
    <script crossorigin="anonymous" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
    <script>
      document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')
    </script>
    <script src="/js/firebase.js"></script>
    <script src="/js/hypeHandler.js"></script>
    <script src="/js/index.js"></script>
    <link href="/index.css" rel="stylesheet">
    <script src="anims2.hyperesources/snowfall.min.js" type="text/javascript"></script>
  </head>
  <body>
    <header>
      <img alt="" class="logo" src="assets/logo.png">
      <div class="search-container">
        <input id="search" type="search">
      </div>
    </header>
    <div class="list-container">
      <div class="loader fa fa-icon fa-spinner fa-spin"></div>
    </div>
    <div class="pager">
      <div class="pager-item previous disabled">
        <div class="fa fa-icon fa-caret-left"></div>
      </div>
      <div class="pager-item next disabled">
        <div class="fa fa-icon fa-caret-right"></div>
      </div>
    </div>
    <div id="result-background">
      <div class="close fa fa-icon fa-times"></div>
    </div>
    <div id="result">
      <div aria-live="polite" id="anims2_hype_container" style="margin:auto;position:relative;width:100vw;height:100vh;overflow:hidden;">
        <script async charset="utf-8" src="anims2.hyperesources/anims2_hype_generated_script.js?13002" type="text/javascript"></script>
      </div>
      <div id="kid-name"></div>
      <div class="sharers">
        <div class="fa fa-icon fa-share"></div>
        <a class="fa fa-icon fa-facebook share facebook" href="#" target="_blank"></a>
        <a class="fa fa-icon fa-twitter share twitter" href="#" target="_blank"></a>
        <a class="fa fa-icon fa-pinterest share pinterest" href="#" target="_blank"></a>
        <a class="fa fa-icon fa-download download" href="#" target="_blank"></a>
      </div>
    </div>
  </body>
</html>
