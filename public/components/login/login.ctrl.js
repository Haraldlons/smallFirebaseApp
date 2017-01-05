(function(){
	'use strict'

      /*I want to initialize the firebase UI just once, if not lots of errors appear*/
    var ui;
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

   
app.controller("loginCtrl", ["$scope", "Auth", "$rootScope", function($scope, Auth, $rootScope){


  var vm = this;
  vm.auth = Auth;
  /*Update the navbar so the red underline sets correctly*/
  $rootScope.$broadcast('navBarUpdate', "login");
  
  /*Varibles used*/
  vm.user;
  vm.firebaseUser;
  vm.userRandomID;
  vm.loggedInMessage = "Du er ikke logget inn."
  vm.isSignedIn;
  /*Functions used*/


  /*Initialize value of variables*/
  vm.userRandomID = 44;
  vm.isSignedIn = false;


  vm.message = "loginCtrl Message";


  vm.auth.$onAuthStateChanged(function(firebaseUser) {
        vm.firebaseUser = firebaseUser;
      // console.log("FirebaseUser in loginCtrl: ", firebaseUser);
      if(firebaseUser){
        console.log("logget in");
        if(firebaseUser.displayName){
          vm.user = firebaseUser.displayName;
        }else {
          vm.user = firebaseUser.email;
        }
        console.log("User: ", vm.user);
        vm.loggedInMessage = "Hei "+ vm.user + "! Du er innlogget"
        vm.isSignedIn = true; 
      }else {
          vm.user = vm.userRandomID;
          console.log("logged out");
          vm.loggedInMessage = "Du er ikke logget inn.";
          vm.isSignedIn = false;
          $rootScope.$broadcast('isLoggedIn', "false");
      }
    });

}]); //loginCtrl ctrl end



app.controller("FirebaseUI", ["$scope", function($scope){
  // FirebaseUI config.
      var uiConfig = {
        signInSuccessUrl: '/#!/profile',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>' /*TODO: Change this*/
      };


      ui.start('#firebaseui-auth-container', uiConfig);


      
      
  }]); //FirebaseUI ctrl end

})(); //function scope end


    /*This is the 'normal' configuration for FirebaseUI, but since I'm using angularJS and routing I have to fiddle around abit so I only do this configuration once.*/

  // FirebaseUI config.
      // var uiConfig = {
      //   signInSuccessUrl: '/#!/chat',
      //   signInOptions: [
      //     // Leave the lines as is for the providers you want to offer your users.
      //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //     firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //     firebase.auth.EmailAuthProvider.PROVIDER_ID
      //   ],
      //   // Terms of service url.
      //   tosUrl: '<your-tos-url>'
      // };

      // // Initialize the FirebaseUI Widget using Firebase.
      // var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // // The start method will wait until the DOM is loaded.
      // ui.start('#firebaseui-auth-container', uiConfig);
            // FirebaseUI config.
