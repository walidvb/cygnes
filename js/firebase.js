function Api(){
  var config = {
      apiKey: "AIzaSyA7Erzi9ch10Ochnd56qv94xBolQBWYoAc",
      authDomain: "cygnes-8fced.firebaseapp.com",
      databaseURL: "https://cygnes-8fced.firebaseio.com",
      storageBucket: "cygnes-8fced.appspot.com",
      messagingSenderId: "953624553996"
    };
  firebase.initializeApp(config);
  var db = firebase.database(),
    storage = firebase.storage();

  var storeImage = function(data, cb){
    var now = new Date();
    var fileName = data.name + '_' + [now.getDay(), now.getMonth()].join('-') + '_' + [now.getHours(), now.getMinutes(), now.getSeconds()].join('-');
    fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    var uploadTask = storage.ref().child('images/'+fileName).put(data.image)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    function(){}, // state changed
    function(){}, // error
    function(){   // success
      cb(uploadTask.snapshot.downloadURL);
    })
  }
  return {
    firebase: firebase,
    save: function(data, cb){
      storeImage(data, function(dlUrl){
        data.imagePath = dlUrl;
        db.ref('drawing/').push(data);
        cb();
      });

    },
  }
}
