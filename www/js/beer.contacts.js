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

  $scope.deleteContact = function() {
    if (Object.keys($scope.mates).length){
      for (var m in $scope.mates) {
        var mate=$scope.mates[m];
        console.log(mate);
        $rootScope.elFuego.$remove(mate.$id);
      }
      $scope.mates={};
    }
  };

  $scope.loadContacts = function() {
    $scope.people=$rootScope.elFuego;
    console.log($scope.Bar.selected);

    //set up size of ol
    var height = $(document).height();
    var topH = $('#sendRequest').outerHeight();
    var formH = $('form').outerHeight();

    $('ol').height(height-topH-formH);
    // $('ol').top(topH+formH+contH);

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
    sendTo.push({
      email: $rootScope.user.email,
      name: $rootScope.user.displayName,
      type: 'cc'
    })
    for (var m in $scope.mates) {
      var mate=$scope.mates[m];
      var recipient={
        email: mate.email,
        name: mate.name,
        type: 'to'
      };
      sendTo.push(recipient);
    }

    if (sendTo.length>1) {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10) {
          dd='0'+dd
      } 
      if(mm<10) {
          mm='0'+mm
      } 
      today = mm+'/'+dd+'/'+yyyy;

      var bar='<a href="https://foursquare.com/v/'+$scope.Bar.selected.venue.id+'">'+$scope.Bar.selected.venue.name +', '+$scope.Bar.selected.venue.location.formattedAddress[0]+', '+$scope.Bar.selected.venue.location.formattedAddress[1]+': '+$scope.Bar.selected.venue.rating + '/10.</a>'
      console.log(bar);

      var details=['<html><body><div>', $rootScope.user.displayName,'sent you a BEER request for',bar,' Reply all to finalize the details.<br><br>Make happy hour easier with <a href="https://prost.firebaseapp.com/">PROST</a><br><br>PROST!</body></html>'].join(' ');

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
            'subject': $rootScope.user.displayName+' wants to grab a drink today ('+today+')!',
            'html': details
          }
        }
      });
      $state.go('home');
    }
  };
});






