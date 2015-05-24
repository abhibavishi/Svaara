
//
// var imageStore = new FS.Store.GridFS("images");
//
// Images = new FS.Collection("images", {
//   stores: [imageStore],
//   filter: {
//     maxSize: 10048576, // in bytes
//     allow: {
//       contentTypes: ['audio/*']
//     },
//     onInvalid: function (message) {
//       if (Meteor.isClient) {
//         alert(message);
//       } else {
//         console.log(message);
//       }
//     }
//   }
// });

if (Meteor.isClient) {

Router.route('/', function () {
  this.render('Home', {
    data: function () { return Items.findOne({_id: this.params._id}); }
  });
});

$(document).ready(function(){
      $("#jquery_jplayer_1").jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", {
            title: "Test"
          });
        },
        cssSelectorAncestor: "#jp_container_1",
        swfPath: "/js",
        supplied: "m4a, oga",
        useStateClassSkin: true,
        autoBlur: true,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true
      });

      $("#songFile").on('change',function(){

          alert("Yo bitch!");
          audioElement = document.getElementById("songFile");
          var files = audioElement.files;
      //		console.log(files);
          var fReader = new FileReader();
          fReader.readAsDataURL(files[0]);
          fReader.onloadend = function(ev){
      //			var aud = document.getElementById("song");
      //			aud.src = ev.target.result;
      //      console.log(ev.target.result);
            $("#jquery_jplayer_1").jPlayer("destroy");
            $("#jquery_jplayer_1").jPlayer({
              ready: function () {
                $(this).jPlayer( "clearMedia" );
                $(this).jPlayer("setMedia", {
                  mp3: ev.target.result,
                  title: files[0].name
                });
              },
              swfPath: "/js",
              supplied: "mp3"
            });
          }
      });



    });

  // counter starts at 0
  Session.setDefault('counter', 0);

//  Meteor.subscribe("images");

  var peer = new Peer({key: 'jjn30rr3d7bke29'});
  var conn = peer.connect("");

  peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    Session.set("peerId",id);
  });

  peer.on('connection', function(conn) {
  conn.on('data', function(data){
    // Will print 'hi!'
   // alert(data);
   var p= data.toString();

   var inputs= document.querySelectorAll('audio')
   console.log(inputs);

   if(data.indexOf('P')===0){
  //  alert('The user played a song');
    var time = data.toString().split(' ');
    console.log(time);
    inputs[1].currentTime = time[1];
    inputs[1].play();
   }
   else if(data.indexOf('F')===0){
  //  alert('The user paused a song');
    var time = data.toString().split(' ');
    console.log(time);
    inputs[1].currentTime = time[1];
    inputs[1].pause();
   }
    else if(data.indexOf('S')===0){
//    alert('The user seeked a song');
    var time = data.toString().split(' ');
    console.log(time);
    inputs[1].currentTime = time[1];
  //  inputs[1].play();

   }
    else if(data.indexOf('O')===0){
   // alert('The user changed the volume');
    var vol = data.toString().split(' ');
    console.log(vol);
    inputs[1].volume = vol[1];
   }

  });
 });

  Template.fileUpload.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });


  Template.body.helpers({
   peerId: function () {
      return Session.get('peerId');
    }
  });

  Template.body.events({

   "submit .new-task ": function (event) {
      // This function is called when the new task form is submitted

      var text = event.target.text.value;
        // replace Tasks.insert( ... ) with:

      conn = peer.connect(text);
   //   var strConn = peer.connect(text, json);
      Session.set('connection',text);


        conn.on('open', function(){
           conn.send('Way to go baby. You just connected your first peer!');
           alert("connected");
        });

      return false;

    },

    "click .btn ": function (event) {

      var call = peer.call(Session.get('hostId'), mediaStream);
      return false;

    }

  });

  // Template.imageView.events({
  //
  //   "seeked audio": function (event) {
  //     conn = peer.connect(Session.get('connection'));
  //     conn.on('open', function(){
  //        //  conn.send('Audio seeked');
  //           conn.send('S' + ' ' + event.target.currentTime);
  //           console.log(event.target.currentTime);
  //
  //     });
  //   },
  //
  //
  //    "play audio": function (event) {
  //     conn = peer.connect(Session.get('connection'));
  //     conn.on('open', function(){
  //       //   conn.send('Play button clicked');
  //            conn.send('P' + ' ' + event.target.currentTime);
  //           console.log(event.target.currentTime);
  //     });
  //   },
  //
  //   "pause audio": function (event) {
  //    conn = peer.connect(Session.get('connection'));
  //     conn.on('open', function(){
  //       //   conn.send('Pause button clicked');
  //            conn.send('F' + ' ' + event.target.currentTime);
  //           console.log(event.target.currentTime);
  //     });
  //   },
  //
  //
  //
  //   "volumechange audio": function (event) {
  //     conn = peer.connect(Session.get('connection'));
  //     conn.on('open', function(){
  //       //   conn.send('Volume changed');
  //            conn.send('O' + ' ' + event.target.volume);
  //            console.log(event);
  //            console.log(event.target);
  //     });
  //   }
  //
  // });
  //
  //
  //
  // Template.imageView.helpers({
  // images: function () {
  //   return Images.find(); // Where Images is an FS.Collection instance
  // },
  //
  // remindPeer: function () {
  //   alert ('Yo'); // Where Images is an FS.Collection instance
  // }
  // });

  Template.fileUpload.events({
    'change .myFileInput': function(event, template) {

      alert("I bet $1 million this will not pop up!");
      audioElement = document.getElementById("songFile");
      var files = audioElement.files;
  //		console.log(files);
      var fReader = new FileReader();
      fReader.readAsDataURL(files[0]);
      fReader.onloadend = function(ev){
  //			var aud = document.getElementById("song");
  //			aud.src = ev.target.result;
        $("#jquery_jplayer_1").jPlayer("destroy");
        $("#jquery_jplayer_1").jPlayer({
          ready: function () {
            $(this).jPlayer( "clearMedia" );
            $(this).jPlayer("setMedia", {
              mp3: ev.target.result,
              title: files[0].name
            });
          },
          swfPath: "/js",
          supplied: "mp3"
        });
      }

    //   Images.remove();
    // FS.Utility.eachFile(event, function(file) {
    //   Images.insert(file, function (err, fileObj) {
    //     if (err){
    //       // handle error
    //     } else {
    //
    //
    //
    //         // handle success depending what you need to do
    //   //    var userId = Meteor.userId();
    //    //   var imagesURL = {
    //    //     "profile.image": "/cfs/files/images/" + fileObj._id
    //     //  };
    //     //  Meteor.users.update(userId, {$set: imagesURL});
    //     }
    //   });
    // });
  }
  });

  // At the bottom of the client code
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // Meteor.publish("images", function(){
    //   return Images.find();
    // });

    // code to run on server at startup
  });
}
