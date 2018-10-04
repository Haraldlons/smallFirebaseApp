(function(){
	'use strict'

	//Trenger ikke initialisere firebase på bytt igjen siden vi har gjort det i app.js
	//kan da bruke rett fram 
	//var ref = firebase.database().ref();

app.controller("mainController", ["$scope","$mdToast", "$mdDialog", "Auth", "$state", function($scope,$mdToast,$mdDialog, Auth,$state){

	/*Dette er en såkalt 'Capture Variable'. Kan bruke vm i steden for $scope*/
	var vm = this;
  vm.auth = Auth;

	/*Definerer alle variabler brukt*/
	vm.currentNavItem;
	vm.message;
  vm.nyMelding;
  vm.isLoggedIn = false;
	vm.showAccount = true;
  vm.currentNavItem = 'homeName';
	vm.message = "Melding fra mainController";
  vm.nyMelding = "Dette er en ny melding fra HomeCtrl"
  /*Definerer alle funksjoner brukt*/
  vm.showToast = showToast;
  vm.signOut = signOut;


	
  /*Blir alt for mange Toast'er*/
// vm.auth.$getAuth(function(firebaseUser){
//   if(firebaseUser){
//     showToast("Du er logget!\nfirebaseUser.email");
//   }else{
//     showToast("Du er ikke logget inn");
//   }
// })

var user = firebase.auth().currentUser;

if (user != null) {
  // showToast("Du er logget inn");
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });
}
  /*When we go to different states we need to update the red line under the tabs*/
  /*Cause this wil not persist during reload of page*/
$scope.$on("navBarUpdate", function(event, data){
    // console.log("$on detected data: ", data);
    vm.currentNavItem = data;
  })
$scope.$on("showToast", function(event, data){
  showToast(data);
  console.log("Data showToast: ", data);
})

 vm.auth.$onAuthStateChanged(function(firebaseUser) {
        vm.firebaseUser = firebaseUser;
      if(firebaseUser){
        if(firebaseUser.displayName){
          vm.user = firebaseUser.displayName;
        }else {
          vm.user = firebaseUser.email;
        }
        vm.isLoggedIn = true;
      }else {
          vm.isLoggedIn = false;
      }
    });

  /*Handling the sign out process*/
 function signOut(){
  $state.go("home");
  vm.auth.$signOut();
  showToast("Du logget ut");
    vm.currentNavItem = 'homeName';
 }


	function showToast(message){
		$mdToast.show(
			$mdToast.simple()
					.content(message)
					.position('top, right')
					.hideDelay(1000)
			);
	}

	/*Start Icon greier*/
 var originatorEv;

    vm.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    vm.notificationsEnabled = true;
    vm.toggleNotifications = function() {
      vm.notificationsEnabled = !vm.notificationsEnabled;
    };

    vm.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );

      originatorEv = null;
    };

    vm.checkVoicemail = function() {
      // vm never happens.
    };
	/*Slutt Icon greier*/

}]); /*End mainController*/







app.controller("AccountCtrl", ["currentAuth","$scope", function(currentAuth,$scope) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not signed in

  /*Capture variable, vm= view model, bare enklere å bruke enn $scope*/
  var vm = vm;
  
  /*Definerer variabler brukt*/
  vm.message = "Melding fra AccountCtrl";
  vm.currentNavItem = 'accountName';
  /*Definerer funksjoner brukt*/


}]);



})(); /*End hele shiten*/