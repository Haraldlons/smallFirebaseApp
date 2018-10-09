(function(){
	'use strict'

app.controller("cvCtrl", ["$scope", "Auth", function($scope, Auth){
	console.log("cvCtrl loaded");
	var vm = this;  // Capture variable
	var rootRef = firebase.database().ref();
	var storage = firebase.storage();

	vm.userID;

	vm.testMessage = "Denne kommer fra cvCtrl";
	vm.auth = Auth;
	vm.anotherMessage = "Ny melding";
	vm.yourCvMessage = "Hei";


	/*This will get the download link of one of the elements and then you can do whatever you would like to.*/
    var refToPDF = storage.ref('cv/miZXtWG2yNSr0VE4oN3PBnHbt4l2/gloeshaugen.jpg');
    var refToPDFDownloadURL = refToPDF.getDownloadURL().then(function(url){
        // Or inserted into an <img> element:
        var img = document.getElementById('myimg');
      // img.src = url; //Uncomment this and the img will be the one from the firebase.
                /*This way we can show pictures stored in the firebase*/
    }).catch(function(error) {
      // Handle any errors
      console.log("Noe galt med downloadURL'en");
    });


	vm.auth.$onAuthStateChanged(function(firebaseUser){
		if(firebaseUser){
			/*logged in and get uid*/
			vm.userID = firebaseUser.uid;
			console.log("Get vm.userID in cvCtrl: ", vm.userID);
		}else {
			/*Not logged in*/
			vm.userID = "00guest";
		}
	});


	var uploader = document.getElementById("uploader");
  	var fileButton = document.getElementById("fileButton");

 	// Listen for file selection
	fileButton.addEventListener("change", function(event){

        // Get file
        var file = event.target.files[0];

        // Create a storage ref
        var storageRef = firebase.storage().ref("cv/" + vm.userID +"/" + file.name);

        // Upload file
        var task = storageRef.put(file);/*Put method returns a TASK*/

        // Update progress bar
        task.on("state_changed",
            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                uploader.value = percentage;
            },

            function error(err){

            },

            function complete() {
                console.log("Ferdig med å laste opp")
                var finishedMessage = "Du er ferdig med å laste opp filen"
                /*Even tho I upate vm.yourCvMessage here it wont update on the page*/
                /*Unsure of why*/
                // console.log(vm.yourCvMessage);
                vm.yourCvMessage = "Du er ferdig med å laste opp filen";
                // console.log(vm.yourCvMessage);
                vm.anotherMessage = "IGJJJASDJSAJD";
            }
        );
  });
}]) /*End cvCtrl*/
})(); /*End entire function scope*/