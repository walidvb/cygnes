function Api(){
  var config = {
      apiKey: "AIzaSyA7Erzi9ch10Ochnd56qv94xBolQBWYoAc",
      authDomain: "cygnes-8fced.firebaseapp.com",
      databaseURL: "https://cygnes-8fced.firebaseio.com",
      storageBucket: "cygnes-8fced.appspot.com",
      messagingSenderId: "953624553996"
    };
  var initialItemsFetched = false;
  firebase.initializeApp(config);
  var db = firebase.database(),
    storage = firebase.storage();

  var drawingsRef = db.ref('drawing/');
  var contestRef = db.ref('contest/');

  function storeImage(data, cb){
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
    getDrawings: function(cb){
      drawingsRef.once('value', function(snapshot){
        var elems = []
        var values = snapshot.val();
        for(key in values){
          elems.push(values[key])
        }
        cb(elems)
        initialItemsFetched = true;
      })
    },
    listenToNew: function(cb, hearAll){
        drawingsRef.on('child_added', function(elem){
          if(hearAll || initialItemsFetched){
            cb(elem.val());
          }
        })
    },
    save: function(data, cb){
      storeImage(data, function(dlUrl){
        data.imagePath = dlUrl;
        var now = new Date();
        var dateId = Date.UTC(2017, 1, 1, 1, 1, 1) - Date.UTC(now.getFullYear(), now.getMonth(), now.getDay(), now.getHours(), now.getMinutes(), now.getSeconds());
        data.dateId = dateId;
        var key = drawingsRef.push(data).then(function(res){
          cb(res.key)
        });
      });
    },
    contest: function(privateData){
      contestRef.push(privateData)
    }
  }
}
