console.log("app.js loaded");

// define our app and dependencies (remember to include firebase!)
var app = angular.module("sampleApp", [
	"ui.router", 
	"ngMaterial",
	"ngMessages",
    "ngAria",
	]);


// for ui-router
// app.run(["$rootScope", "$state", function($rootScope, $state) {
//   $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
//     // We can catch the error thrown when the $requireSignIn promise is rejected
//     // and redirect the user back to the home page
//     if (error === "AUTH_REQUIRED") {
//       $state.go("home");
//     }
//   });
// }]);

app.config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider",
  function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    console.log("stateProvider loaded");

 $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.when('/#!/', '/home');
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state("home", {
    	url: "/home",
      // the rest is the same for ui-router and ngRoute...
      controller: "mainController as vm",
      templateUrl: "components/home.html",
    });
    // .state("chat", {
    // 	url: "/chat",
    // 	controller: "chatRoomCtrl as vm",
    // 	templateUrl: "components/chatRoom/chatRoom.html",
    // });
   
    // .state("login", {
    // 	url: "/login",
    //   // the rest is the same for ui-router and ngRoute...
    //   controller: "loginCtrl as vm",
    //   templateUrl: "components/login/login.html",
    //   resolve: {
    //     // controller will not be loaded until $waitForSignIn resolves
    //     // Auth refers to our $firebaseAuth wrapper in the factory below
    //     "currentAuth": ["Auth", function(Auth) {
    //       // $waitForSignIn returns a promise so the resolve waits for it to complete
    //       return Auth.$waitForSignIn();
    //     }]
    //   }
    // })
    // .state("cv",{ /*For uploading of CV PDF*/
    //   url:"/cv",
    //   controller: "cvCtrl as vm",
    //   templateUrl: "components/cv/cv.html",
    //   resolve: {
    //     // controller will not be loaded until $waitForSignIn resolves
    //     // Auth refers to our $firebaseAuth wrapper in the factory below
    //     "currentAuth": ["Auth", function(Auth) {
    //       // $waitForSignIn returns a promise so the resolve waits for it to complete
    //       return Auth.$waitForSignIn();
    //     }]
    //   }
    // })
}]);

// app.controller("HomeCtrl", ["currentAuth", "$scope", function(currentAuth, $scope) {
//   // currentAuth (provided by resolve) will contain the
//   // authenticated user or null if not signed in
//   var vm = this;
//   vm.nyMelding;
//   vm.nyMelding = "Dette er en ny melding fra HomeCtrl";

// }]);



// app.factory("Auth", ["$firebaseAuth",
//   function($firebaseAuth) {
//     return $firebaseAuth();
//   }
// ]);


//   /*This returns a firebaseArray which we can $add to add more messages*/
// app.factory("chatMessages", ["$firebaseArray",
//   function($firebaseArray) {
//     // create a reference to the database location where we will store our data
//     var ref = firebase.database().ref().child("messages");

//     // this uses AngularFire to create the synchronized array
//     return $firebaseArray(ref);
//   }
// ]);

// var signInWithPopup = function() {
//   window.open('/widget', 'Sign In', 'width=985,height=735');
// };

// var initApp = function(){
//   document.getElementById('sign-in-with-popup').addEventListener(
//       'click', signInWithPopup);

// }