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

.controller('myContacts', function($scope, $rootScope, Bar, $state) {
  $scope.mates={};
  $scope.Bar=Bar;

  console.log($scope.Bar.selected);

  $scope.checkLogin = function () {
    console.log($rootScope.user);
    if ($rootScope.user===undefined) {
      console.log('going to login');
      $state.go('login');
    }  
  };

  $scope.saveContact = function() {
    var name=$('#name').val();
    var email=$('#email').val();
    if (name!=='' && email!=='') {
      console.log($rootScope.user);
      var contact={userId: $rootScope.user.id, name: name, email: email};
      console.log(contact);
      $rootScope.elFuego.$add(contact);
      $('#name').val('');
      $('#email').val('');
    }
  };

  $scope.loadContacts = function() {
    $scope.people=$rootScope.elFuego;
    console.log($scope.Bar.selected);
  };
  $scope.toggleContacts = function(person) {
    if (!$scope.mates[person.name]) {
      $scope.mates[person.name]=person;
    } else { 
      delete $scope.mates[person.name];
    } 
  };
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

    var bar='<a href="'+$scope.Bar.selected.url+'">'+$scope.Bar.selected.name +', '+$scope.Bar.selected.location.address[0]+', '+$scope.Bar.selected.location.city+': '+$scope.Bar.selected.rating + ' stars</a>'
    console.log(bar);

    var details=['<html><body>', $rootScope.user.displayName,'sent you a BEER request for',bar, '</body></html>'].join(' ');

    console.log('sending!');
    console.log(sendTo);
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
    $state.go('home');
  };
});






