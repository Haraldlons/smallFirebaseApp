(function(){
	'use strict';

app.controller("mainController", ["$scope","$mdToast", "$mdDialog", "$state", "$http", function($scope, $mdToast, $mdDialog, $state, $http){
    console.log("mainController loaded");
    var vm = this; // Capture variable

    // Variables
    vm.system_id = "test";
    vm.education_choice = "University qualifying examination";
    vm.ethnicity = "White";
    vm.age = 24;
    vm.gender = "Male";
    vm.workoutTime = "30 minutes or more";
    vm.workoutFrequency = "Once a week";
    vm.hardness = "Little hard breathing and sweating";
    vm.restingPulse = 50;
    vm.maximumHeartRate = 190;
    vm.weight = 80;
    vm.height = 180;
    vm.isLoggedIn = false; // Is used in header
    vm.currentNavItem = 'homeName'; // Is used in header


	vm.showToast = function showToast(message){
		$mdToast.show(
			$mdToast.simple()
					.content(message)
					.position('top, right')
					.hideDelay(5000)
			);
	};


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


    function testGetResponseAPI() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/"; // https://tinyurl.com/y9p4bfl6
        const url = 'https://www.worldfitnesslevel.org/service/api/response';
        const data = {
            "userId": "asdf",
            "systemId": vm.system_id,
            "responseId": "",             //must be used if you want to update an existing response, or else remove or set blank
            "input": {
                "education": 12,            //see /types
                "ethnicity": 1,             //see /types
                "gender": 1,                //see /types
                "workoutFrequency": 2,      //see /types
                "workoutTime": 2,           //see /types
                "hardness": 3,              //see /types
                "restingPulse": 45,         //beats pr minute
                "maximumHeartRate": 189,    //beats pr minute
                "weight": 83,               //in kilograms
                "height": 187,              //in centimeters
                "age": 37,
                "latitude": 63.4305,        //optional
                "longitude": 10.3951,       //optional
                "city": "Trondheim",        //optional
                "country": "Norway",        //optional
                "group": ""                 //optional - only use group in agreement with API provider
            }
        };

        $http({
            url: proxyurl + url,
            method: 'POST',
            data: data,
            headers: {'Content-Type': 'application/json'},
        }).then(function (data) {
            console.log(data);
        }).catch(function (data, status, headers, config) {
            //todo: report to user
            console.log("Error while doing");
            $log.error({
                data: data,
                status: status,
                headers: headers,
                config: config
            });
        });
    }


    vm.callAPI = function () {
        console.log("Calling API with current variables");
        vm.input_string = parseInt(vm.input_string) + 1;
        // testGetResponseAPI();
    };


    vm.test_dialog = function changePassPrompt(event){
        var confirm = $mdDialog.confirm()
            .title('Bytt passord')
            .textContent("Trykk på 'Send email' for å endre passord." + vm.education_choice + " Vi vil da sende en mail til '"+ "deg" + "' med instruksjoner om hvordan du endrer passord.")
            .ariaLabel('deletePictureURL')
            // .initialValue('Buddy')
            .targetEvent(event)
            .ok('Send email')
            .cancel('Ikke endre');

        $mdDialog.show(confirm)
            .then(function() {
                /*User pressed OK*/
                /*result wil be what user inputted*/
                console.log("You pressed OK");
                showToast("You pressed OK");
                // var updates = {};
                //  updates["/users/"+uid+"/bilde"] = "";
                //  rootRef.update(updates);

                // showAlert("Profilbilde slettet", "Du slettet akkurat profilbildet ditt. Finn gjerne et annet bilde")
            }, function() {
                /*User pressed cancel*/
                console.log("You pressed CANCEL");
                showToast("You pressed CANCEL");
                // showToast("Du endret ikke passordet")
            });
    };

    vm.printAllData = function(){
        console.log()
    };

    vm.valueOptions = {
        education: [
            {
                id: 1,
                value: "1",
                text: "Primary school 7-10 years"
            },
            {
                id: 2,
                value: "2",
                text: "Continuation school"
            },
            {
                id: 3,
                value: "3",
                text: "Folk high school"
            },
            {
                id: 4,
                value: "4",
                text: "High school"
            },
            {
                id: 5,
                value: "5",
                text: "Intermediate school"
            },
            {
                id: 6,
                value: "6",
                text: "Vocational school"
            },
            {
                id: 7,
                value: "7",
                text: "1-2 years high school"
            },
            {
                id: 8,
                value: "8",
                text: "University qualifying examination"
            },
            {
                id: 9,
                value: "9",
                text: "Junior college"
            },
            {
                id: 10,
                value: "10",
                text: "A levels University or other post-secondary education"
            },
            {
                id: 11,
                value: "11",
                text: "Less than 4 years University/college"
            },
            {
                id: 12,
                value: "12",
                text: "4 years or more University/college"
            }
        ],
        ethnicity: [
            {
                id: 1,
                value: "white",
                text: "White"
            },
            {
                id: 2,
                value: "hispanic_or_latino",
                text: "Hispanic or Latino"
            },
            {
                id: 3,
                value: "black_or_african_american",
                text: "Black or African American"
            },
            {
                id: 4,
                value: "native_american_or_american_indian",
                text: "Native American or American Indian"
            },
            {
                id: 5,
                value: "asian_pacific_islander",
                text: "Asian / Pacific Islander"
            },
            {
                id: 6,
                value: "other",
                text: "Other"
            }
        ],
        gender: [
            {
                id: 1,
                value: "MALE",
                text: "Male"
            },
            {
                id: 2,
                value: "FEMALE",
                text: "Female"
            }
        ],
        workoutFrequency: [
            {
                id: 1,
                value: 0,
                text: "Almost never or less than once a week"
            },
            {
                id: 2,
                value: 1,
                text: "Once a week"
            },
            {
                id: 3,
                value: 2,
                text: "2-3 times a week"
            },
            {
                id: 4,
                value: 3,
                text: "Almost every day"
            }
        ],
        workoutTime: [
            {
                id: 1,
                value: 1,
                text: "Under 30 min"
            },
            {
                id: 2,
                value: 1.5,
                text: "30 minutes or more"
            }
        ],
        hardness: [
            {
                id: 1,
                value: 1,
                text: "I take it easy without breathing hard or sweating"
            },
            {
                id: 2,
                value: 5,
                text: "Little hard breathing and sweating"
            },
            {
                id: 3,
                value: 10,
                text: "I go all out"
            }
        ]
    };
}]); /*End mainController*/
})(); /*End hele shiten*/