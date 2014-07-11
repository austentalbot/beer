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
});






