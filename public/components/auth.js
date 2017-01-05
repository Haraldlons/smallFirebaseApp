(function(){



  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyDTWWiCnPrOHqSjkhFd2Xbcmtxjpm9XRkY",
  //   authDomain: "angularfire-synchronized.firebaseapp.com",
  //   databaseURL: "https://angularfire-synchronized.firebaseio.com",
  //   storageBucket: "angularfire-synchronized.appspot.com",
  //   messagingSenderId: "457622260259"
  // };
  // firebase.initializeApp(config);

  console.log("auth.js loaded")


// define our app and dependencies (remember to include firebase!)
var app = angular.module("sampleApp", ["firebase", "ngMaterial","ngMessages"]); //Tror ikke jeg kan definere flere angular-moduler
// inject $firebaseObject into our controller
app.controller("ProfileCtrl", ["$scope", "$firebaseObject",
  function($scope, $firebaseObject) {
    var ref = firebase.database().ref();
    // download physicsmarie's profile data into a local object
    // all server changes are applied in realtime
    $scope.profile = $firebaseObject(ref.child('profiles').child('physicsmarie'));
    $scope.number = $firebaseObject(ref.child("profiles").child("number"));
    // console.log($scope.number);

    $scope.incrementNumber = function(){
      console.log($scope.number.$value);
      $scope.number.$value++;

      // var refToNumber = ref.child("profiles").child("number").key;
      // console.log("ReftoNumber",refToNumber)
      var updates = {};
      updates["profiles/number"] = $scope.number.$value;
      ref.update(updates);

      // firebase.database().ref('profiles').set({
      //   number: $scope.number.$value
      // });
    }

   

   $scope.writeUserData = function(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
}
]);

app.controller("DemoCtrl", ["$scope", "AuthFac", function($scope, AuthFac) {
    $scope.user = {
      first_name: 'John Doe',
      last_name: "",
      email: '',
      phone: '',
      address: 'Mountain View, CA',
      donation: 19.99,
      imageUrl: "http://img.lum.dolimg.com/v1/images/character_mickeymouse_donaldduck_d79720c3.jpeg"
    };
    var userId = {};


    $scope.writeUserData = function() {
    var userId = AuthFac.$getAuth().uid; //Kan ikke plassere denne utenfor funksjonen. Vet ikke hvorfor
    var updates = {};
      updates['/users/'+userId+"/username/"] = $scope.user.first_name;
      updates['/users/'+userId+"/username/"] = $scope.user.first_name;
      updates['/users/'+userId+"/first_name/"] =  $scope.user.first_name;
      updates['/users/'+userId+"/last_name/"] =  $scope.user.last_name;
      updates['/users/'+userId+"/email/"] = $scope.user.email;
      updates['/users/'+userId+"/profile_picture/"] =  $scope.user.imageUrl;
      firebase.database().ref().update(updates);
      console.log("Writted to database with UID: ", userId, "And Updates: ", updates);


    // firebase.database().ref('users/' + userId).set({
    //   username: $scope.user.first_name,
    //   first_name: $scope.user.first_name,
    //   last_name: $scope.user.last_name,
    //   email: $scope.user.email,
    //   profile_picture: $scope.user.imageUrl
    // });

      $scope.user.first_name = "";
      $scope.user.last_name = "";
      $scope.user.email = '';
      $scope.user.imageUrl = "";
}


  }]);

app.factory("chatMessages", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database location where we will store our data
    var ref = firebase.database().ref().child("messages");

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages","AuthFac", "$timeout",
  // we pass our new chatMessages factory into the controller
  function($scope, chatMessages, AuthFac, $timeout) {

    $scope.userRandomID = "Guest " + Math.round(Math.random() * 100);
        $scope.user = $scope.userRandomID; //Setter denne til open etter litt tid, om jeg har forstått riktig...
    // $timeout(function() { //Pga Javascript asynkronsk. 
    // });


    // we add chatMessages array to the scope to be used in our ng-repeat
    $scope.messages = chatMessages;

    $scope.auth = AuthFac;

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
      console.log("FirebaseUser in ChatCtrl: ", firebaseUser);
      if(firebaseUser){
        if(firebaseUser.displayName){
          $scope.user = firebaseUser.displayName;
        }else {
          $scope.user = firebaseUser.email;
        }
      }else {
            $scope.user = $scope.userRandomID;
      }
    
    });

    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {

      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.messages.$add({
        from: $scope.user,
        content: $scope.message
      });

      // reset the message input
      $scope.message = "";
    };

    // if the messages are empty, add something for fun!
    $scope.messages.$loaded(function() {


      if ($scope.messages.length === 0) {
        $scope.messages.$add({
          from: "Firebase Docs",
          content: "Hello world!"
        });
      }
    });
  }
]);

// a factory to create a re-usable profile object
// we pass in a username and get back their synchronized data
app.factory("Profile", ["$firebaseObject",
  function($firebaseObject) {
    return function(username) {
      // create a reference to the database node where we will store our data
      var ref = firebase.database().ref("rooms").push();
      var profileRef = ref.child(username);

      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
]);

app.controller("ProfileCtrl2", ["$scope", "Profile",
  function($scope, Profile) {
    // put our profile in the scope for use in DOM
    $scope.profile = Profile("physicsmarie");

    // calling $save() on the synchronized object syncs all data back to our database
    $scope.saveProfile = function() {
      $scope.profile.$save().then(function() {
        alert('Profile saved!');
      }).catch(function(error) {
        alert('Error!');
      });
    };
  }
]);

app.controller("ProfileCtrl3", ["$scope", "Profile",
  function($scope, Profile) {
    // create a three-way binding to our Profile as $scope.profile
    Profile("physicsmarie").$bindTo($scope, "profile");
  }
]);



// inject $firebaseArray into our controller
app.controller("ProfileCtrl4", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    var messagesRef = firebase.database().ref().child("messages");
    // download the data from a Firebase reference into a (pseudo read-only) array
    // all server changes are applied in realtime
    $scope.messages = $firebaseArray(messagesRef);
    // create a query for the most recent 25 messages on the server
    var query = messagesRef.orderByChild("timestamp").limitToLast(25);
    // the $firebaseArray service properly handles database queries as well
    $scope.filteredMessages = $firebaseArray(query);
  }
]);

app.controller("AuthCtrl", ["$scope", "$firebaseAuth",
  function($scope, $firebaseAuth) {
    var auth = $firebaseAuth();

    $scope.signIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      auth.$signInAnonymously()
        .then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
      })
        .catch(function(error) {
        $scope.error = error;
      });
    };
  }
]);

// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("AuthFac", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.controller("AuthCtrl2",["$scope","AuthFac", function($scope, AuthFac){

  $scope.createUser = function(){
    $scope.message = null;
    $scope.error = null;


      // Create new User
    AuthFac.$createUserWithEmailAndPassword($scope.email, $scope.password)
      .then(function(user) {
        console.log("Logged in: ", user)
        $scope.message = "User created with ID: " + user.uid;
      })
      .catch(function(error){
        console.log("Something went wrong: " + error);
        $scope.error = error;
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === 'auth/wrong-password'){
          alert("Wrong Password");
        } else {
          alert(errorMessage);
        }
      });
  };

  $scope.deleteUser = function(){
    $scope.message = null;
    $scope.error = null;

    AuthFac.$deleteUser()
      .then(function(){
        $scope.message = "User deleted";
      })
      .catch(function(error){
        $scope.error = error;
      });
  };

  $scope.signIn = function(){
    var mail = $scope.email;
    var password = $scope.password;
    var firebaseUser = null;
    var error = null;

    AuthFac.$signInWithEmailAndPassword(mail,password)
      .then(function(firebaseUser){
        console.log("Signed in. Printing user: ", firebaseUser);
      })
      .catch(function(error){
        console.log("Something went wrong when signing in. Error: ", error);
      })
  }
}]); //AuthCtrl2 end

app.controller("AuthCtrl3", ["$scope", "AuthFac",
  function($scope, AuthFac) {
    $scope.auth = AuthFac;

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
      
    });
  }
]); //AuthCtrl3 end


app.controller('AppCtrl', ["$scope", "AuthFac","$firebaseAuth", function($scope,AuthFac, $firebaseAuth) {
  var vm = this;
  vm.hobby = "";
  vm.city = "";
  vm.userId = null;
  var auth = AuthFac;
  vm.printUserInfo = printUserInfo;
  var userSpesificRef = null;
  // Get referance to Firebase Detabase root
  var rootRef = firebase.database().ref();

  AuthFac.$onAuthStateChanged(function(firebaseUser){
    console.log("onAuthStateChanged updated in AppCtrl: ", firebaseUser);
    // console.log(firebaseUser);
    if(firebaseUser){

      vm.userId = firebaseUser.uid;

      userSpesificRef = rootRef.child("/users/" +vm.userId);

      userSpesificRef.on('value', function(snapshot) {
        // console.log("snapshot: ",snapshot.val());
        if(snapshot.val()){
          var obj = snapshot.val(); 
          vm.hobby = obj.hobby;
          vm.city = obj.city;
          vm.userState = obj.state;
        }
      });
      $scope.firebaseUser = null;
      $scope.error = null;
    } else {
      vm.userID = null;
      vm.hobby = null;
      vm.city = null;
      vm.userState = null;
    }
  })


  vm.userState = 'AL';
  vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function (state) { return { abbrev: state }; });

      // Printer User info lagret i skjemaet på siden.
  function printUserInfo(){
    console.log("Hobby: "+ vm.hobby+ ", City: " + vm.city + ", UserState: " + vm.userState);
    if(vm.userId){
      if(!vm.hobby){
        vm.hobby = "";
      }
      if(!vm.city){
        vm.city = "";
      }
      if(!vm.state){
        vm.userState = "";
      }
      var updates = {};
      updates["/users/"+vm.userId+"/hobby/"] = vm.hobby;
      updates["/users/"+vm.userId+"/city/"] = vm.city;
      updates["/users/"+vm.userId+"/state/"] = vm.userState;
      rootRef.update(updates);



    //   rootRef.child('users/' + vm.userId).set({
    //     hobby: vm.hobby,
    //     city: vm.city,
    //     state: vm.userState,

    //     // email: auth.token.email,
    //     // email_verified : auth.token.email_verified,
        
    // });
      console.log("updated profile");
      console.log(auth.$getAuth());
    } else {
      console.log("userID == 0, so didnt update")
    }
  }

}]); //AppCtrl End


app.controller("FirebaseUI", ["$scope", function($scope){
  // FirebaseUI config.
      var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
}]); //FirebaseUI ctrl end


      initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function(accessToken) {
              document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('sign-in').textContent = 'Sign out';
              document.getElementById('account-details').textContent = JSON.stringify({
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
              }, null, '  ');
            });
          } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
          }
        }, function(error) {
          console.log(error);
        });
      };

      window.addEventListener('load', function() {
        initApp()
      });

      var uiConfig

})(); //function scope end