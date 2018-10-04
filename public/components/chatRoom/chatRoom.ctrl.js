(function(){
	'use strict'


app.controller("chatRoomCtrl", ["$scope","Auth", "$state", "$rootScope", "chatMessages", function($scope, Auth, $state, $rootScope, chatMessages){
    console.log("chatRoomCtrl loaded");
    var vm = this; // Capture variable

    // Initialize Variables from Factories
    vm.auth = Auth;
    vm.messages = chatMessages;
    // Initialize Variables
    vm.message = "";
    vm.random_0_to_100 = Math.floor(Math.random()*100); // Number from 0 to 99
    vm.isLoggedInOrNot = "Siden du ikke er logget inn vil du vises som 'Guest: " +  vm.random_0_to_100+"'";

    // Functions
    vm.addMessage = addMessage;


    //For $broadcast til alle kontrollere må man bruk $rootScope(husk å inkludere som parameter til funksjonen)
    $rootScope.$broadcast('navBarUpdate', "chat");


    vm.auth.$onAuthStateChanged(function(firebaseUser){
        if(firebaseUser){
            if(firebaseUser.displayName){
                vm.userName = firebaseUser.displayName;
            }else {
                vm.userName = firebaseUser.email;
            }
            console.log("User: ", vm.userName);

            vm.isLoggedInOrNot = "Du vil vises som '" + vm.userName + "'";
        }else {
            if(!vm.userName){
                vm.userName = "Guest "+ vm.random_0_to_100;
            }
            $rootScope.$broadcast('isLogged', "chat");
        }
    });


    function addMessage(){
        vm.messages.$add({
            from: vm.userName,
            content: vm.message,
        });
        vm.message = "";
    }


    /*If no messages in the list makes on entry*/
    vm.messages.$loaded(function() {
        if (vm.messages.length === 0) {
            vm.messages.$add({
            from: "Firebase Docs",
            content: "Hello world!"
            });
        }
    });
}]);/*End chatRoomCtrl*/
})(); /*End function thingy*/