angular.module('beer.home', ['ionic'])
.run(function($ionicPlatform, $rootScope, $state) {
  console.log($rootScope.user);
  if ($rootScope.user===undefined) {
    $state.go('login');
  }

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
}).
controller('check', function($scope, $rootScope, $state) {
  $scope.checkLogin = function () {
    console.log($rootScope.user);
    if ($rootScope.user===undefined) {
      console.log('going to login');
      $state.go('login');
    }  
  };
});