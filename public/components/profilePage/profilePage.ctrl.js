(function(){
	'use strict'

	app.controller("profilePageCtrl", ["$scope", "$mdDialog", "$rootScope","Auth","$firebaseObject", "$mdToast", 
							  function( $scope,   $mdDialog,   $rootScope,  Auth,  $firebaseObject,   $mdToast){
		console.log("Inside profilePageCtrl");
		var vm = this;
		var rootRef = firebase.database().ref();
		vm.auth = Auth; //$firebaseAuth()
		console.log("rootRef:",rootRef);
		/*Define all variables used*/
		vm.topWelcomeName = "";
		vm.showToast = showToast;

		vm.message = "Message from profilePage Controller";
		/*Define all functions used*/
  		vm.saveToFirebase = saveToFirebase;


  /*So the navbar red underline sets correctly*/
$rootScope.$broadcast('navBarUpdate', "profile");

/*From DemoCtrl*/

vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
'WY').split(' ').map(function(state) {
    return {abbrev: state};
  });



  	/*Checking for updates on the authentication state*/
  	vm.auth.$onAuthStateChanged(function(firebaseUser){
  		if(firebaseUser){
  			/*Logged in*/

  	// 			/*Founds your name or email to show as a welcome*/
			// if(firebaseUser.displayName){
		 //          vm.topWelcomeName = firebaseUser.displayName;
		 //        }else {
		 //          vm.topWelcomeName = firebaseUser.email;
		 //        }



  			vm.userID = firebaseUser.uid;
  			var Id = vm.userID;
  			console.log("uid:", vm.userID);
		  	vm.profile = $firebaseObject(rootRef.child("users").child(Id));
		  	/*To get live changes from the database pluss initial load from profile data from firebase*/
		  	vm.profile.$loaded()
		  		.then(function(data){
		  			// console.log("data: ",data);
		  			vm.user = vm.profile;

						/*To update 'Profileside til ...' in real time*/
					$scope.$watch('vm.user.firstName', function(firstName){
						// console.log("vm.user.firstName changed!");
						if(vm.user.firstName){
							vm.topWelcomeName = " til "+ vm.user.firstName;
						}else {
							vm.topWelcomeName = "n din";
						}
					})


		  		})
		  		.catch(function(error){
		  			// console.log("Error:",error);
		  			console.log("Gikk ikke");
		  			/*Tries to get profile data from database, but if not logged in show sample information*/
					vm.user = {
					      title: '',
					      email: 'ipsum@lorem.com',
					      firstName: 'Ola',
					      lastName: 'Nordmann',
					      address: '1600 Amphitheatre Pkwy',
					      address2: '',
					      city: 'Mountain View',
					      state: 'CA',
					      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
					      postalCode: '94043'
					    };
		  		})
  		}else {
  			/*Logget out*/
  			vm.userID = null;
  		}
  	})
  		var	userSpesificRef = rootRef.child("/users/" +vm.userID);
  		console.log("userSpesificRef:", userSpesificRef);


      userSpesificRef.on('value', function(snapshot) {
        // console.log("snapshot: ",snapshot.val());
        if(snapshot.val()){
          var obj = snapshot.val(); 
          console.log("Update from user data: snapshot: ", obj);
          vm.user = {
		      title: obj.title,
		      email: obj.email,
		      firstName: obj.firstName,
		      lastName: obj.lastName,
		      address: obj.address,
		      address2: obj.address2,
		      city: obj.city,
		      state: obj.state,
		      biography: obj.biography,
		      postalCode: obj.postalCode,
		      university: obj.university,
		    };
        }
    })


  		/*To save updates from form to firebase*/
  function saveToFirebase(){

  	if(vm.userID){
  		/*Logged in*/
  		var updates = {};
  		if(vm.user.title){
  			updates["/users/"+vm.userID+"/title/"] = vm.user.title;
  		}
  		if(vm.user.email){
  		updates["/users/"+vm.userID+"/email/"] = vm.user.email;
  		}
  		if(vm.user.firstName){
  		updates["/users/"+vm.userID+"/firstName/"] = vm.user.firstName;
  		}
  		if(vm.user.lastName){
  		updates["/users/"+vm.userID+"/lastName/"] = vm.user.lastName;
  		}
  		if(vm.user.address){
  		updates["/users/"+vm.userID+"/address/"] = vm.user.address;
  		}
  		if(vm.user.address2){
  		updates["/users/"+vm.userID+"/address2/"] = vm.user.address2;
  		}
  		if(vm.user.city){
  		updates["/users/"+vm.userID+"/city/"] = vm.user.city;
  		}
  		if(vm.user.state){
  		updates["/users/"+vm.userID+"/state/"] = vm.user.state;
  		}
  		if(vm.user.biography){
  		updates["/users/"+vm.userID+"/biography/"] = vm.user.biography;
  		}
  		if(vm.user.postalCode){
  		updates["/users/"+vm.userID+"/postalCode/"] = vm.user.postalCode;
  		}
  		if(vm.user.university){
  		updates["/users/"+vm.userID+"/university/"] = vm.user.university;
  		}
  		
  		rootRef.update(updates);
  		showToast("Du har gjort endringer til informasjonsfelt");
  		// $rootScope.$broadcast("showToast", "Du har gjort endringer til informasjonsfelt")
  		// console.log("Updates has been saved to firebase");
  		
  	} else {
  		/*Logget out*/
  		console.log("Logged out so didnt save updates. vm.userID: ", vm.userID);
  	}
  }
  

  	function showToast(message){
		$mdToast.show(
			$mdToast.simple()
					.content(message)
					.position('top, right')
					.hideDelay(2000)
			);
	}


	}]) /*End profilePage Ctrl*/

})(); /*End entire thing*/