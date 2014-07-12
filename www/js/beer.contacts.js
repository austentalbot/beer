angular.module('beer.contacts', ['ionic', 'beer.bar'])
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

.controller('myContacts', function($scope, Bar) {
  $scope.mates={};
  $scope.Bar=Bar;

  var testContacts=[{name: 'Austen', email: 'austentalbot@gmail.com'}, {name: 'Austen2', email: 'austentalbot@gmail.com'}];
  $scope.loadContacts = function() {
    $scope.people=testContacts;
    console.log($scope.Bar.selected);
  }
  $scope.toggleContacts = function(person) {
    if (!$scope.mates[person.name]) {
      $scope.mates[person.name]=person;
    } else { 
      delete $scope.mates[person.name];
    } 
  }
  $scope.sendRequest = function() {
    sendTo=[];
    for (var m in $scope.mates) {
      var mate=$scope.mates[m];
      var recipient={
        email: mate.email,
        name: mate.name,
        type: 'to'
      };
      sendTo.push(recipient);
    }

    var user='Austen'
    var details=[user,'sent you a BEER request for',$scope.Bar.selected].join(' ');

    console.log('sending!');
    console.log(sendTo);
    console.log(user);
    console.log($scope.Bar.selected)
    console.log(details);
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': auth.mandrillKey,
        'message': {
          'from_email': 'BEER@beer.beer',
          'to': sendTo,
          'autotext': 'true',
          'subject': 'BEER!',
          'html': details
        }
      }
    });
  }
});






