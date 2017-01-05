(function(){
	'use strict'


      var ui;
              var ui = new firebaseui.auth.AuthUI(firebase.auth());


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
   
      // The start method will wait until the DOM is loaded.

// app.controller("loginCtrl", ["$scope", "$firebaseObject", function($scope,$firebaseObject){
// 	var ref = firebase.database().ref();
// 	var vm = this;


// 	vm.number = $firebaseObject(ref.child("profiles").child("number"));
// 	console.log(vm.number);

// 	console.log(ref);

// }]) /*End loginCtrl*/
app.controller("loginCtrl", ["$scope", "Auth", "$rootScope", function($scope, Auth, $rootScope){
	//Auth is a factory returning firebas auth().
console.log("login.ctr loaded")

	var vm = this;
	vm.auth = Auth;
	/*Varibles used*/
	vm.user;
	vm.firebaseUser;
	vm.userRandomID = 44;
  vm.loggedInMessage = "Du er ikke logget inn."
  /*Functions used*/
  vm.isSignedIn = false;


  vm.message = "loginCtrl Message";


  vm.auth.$onAuthStateChanged(function(firebaseUser) {
        vm.firebaseUser = firebaseUser;
      console.log("FirebaseUser in loginCtrl: ", firebaseUser);
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

$rootScope.$broadcast('navBarUpdate', "login");


        // ui.start('#firebaseui-auth-container', uiConfig);




//        firebase.auth().onAuthStateChanged(function(user) {


}]); //FirebaseUI ctrl end

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
        tosUrl: '<your-tos-url>'
      };
      var tall = 0;
      console.log("Sjekker ui: ", ui);
      if(ui == null){
        // var ui = new firebaseui.auth.AuthUI(firebase.auth());
        console.log("hei")
        for(var i = 0; i<100000;i++){
          tall++;
        }
        console.log("tei")

      
      }else {
        
      }
        ui.start('#firebaseui-auth-container', uiConfig);

      // Initialize the FirebaseUI Widget using Firebase.
      
      // The start method will wait until the DOM is loaded.

      
      
}]); //FirebaseUI ctrl end


      // initApp = function() {
      //   firebase.auth().onAuthStateChanged(function(user) {
      //     if (user) {
      //       // User is signed in.
      //       var displayName = user.displayName;
      //       var email = user.email;
      //       var emailVerified = user.emailVerified;
      //       var photoURL = user.photoURL;
      //       var uid = user.uid;
      //       var providerData = user.providerData;
      //       user.getToken().then(function(accessToken) {
      //         document.getElementById('sign-in-status').textContent = 'Signed in';
      //         document.getElementById('sign-in').textContent = 'Sign out';
      //         document.getElementById('account-details').textContent = JSON.stringify({
      //           displayName: displayName,
      //           email: email,
      //           emailVerified: emailVerified,
      //           photoURL: photoURL,
      //           uid: uid,
      //           accessToken: accessToken,
      //           providerData: providerData
      //         }, null, '  ');
      //       });
      //     } else {
      //       // User is signed out.
      //       document.getElementById('sign-in-status').textContent = 'Signed out';
      //       document.getElementById('sign-in').textContent = 'Sign in';
      //       document.getElementById('account-details').textContent = 'null';
      //     }
      //   }, function(error) {
      //     console.log(error);
      //   });
      // };

      // window.addEventListener('load', function() {
      //   initApp()
      // });

      // var uiConfig


})(); //function scope end

