angular.module('beer.contacts', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $.getJSON("./js/auth.json", function(data) {
    auth=data;
  });
})

.controller('myContacts', function($scope) {
  $scope.mates={};
  var testContacts=[{name: 'Anthony'}, {name: 'Julia'}, {name: 'Austen'}, {name: 'Scott'}, {name: 'Susan'}];
  $scope.loadContacts = function() {
    $scope.people=testContacts;
  }
  $scope.toggleContacts = function(person) {
    if (!$scope.mates[person.name]) {
      $scope.mates[person.name]=true;
    } else { 
      delete $scope.mates[person.name];
    } 
  }
  $scope.sendRequest = function() {
    // for (var mate in $scope.mates) {
    //   //need to write this function to send email
    //   sendMessage(mate);
    // }
    console.log('sending!');
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': auth.mandrillKey,
        'message': {
          'from_email': 'BEER@beer.beer',
          'to': [
              {
                'email': 'austentalbot@gmail.com',
                'name': 'Austen',
                'type': 'to'
              }
              // },
              // {
              //   ‘email’: ‘RECIPIENT_NO_2@EMAIL.HERE’,
              //   ‘name’: ‘ANOTHER RECIPIENT NAME (OPTIONAL)’,
              //   ‘type’: ‘to’
              // }
            ],
          'autotext': 'true',
          'subject': 'BEER?',
          'html': 'DETAILS: '
        }
      }
    });
  }
});






