angular.module('beer.login', ['ionic', 'firebase'])
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
.controller('fireBase', function($firebase, $scope, $rootScope, $state) {
  var elFuego = new Firebase('https://luminous-fire-8550.firebaseio.com/');
  // var auth = new FirebaseSimpleLogin(elFuego, function(error, user) {
  //   console.log(user);
  // });
  var auth = new FirebaseSimpleLogin(elFuego, function(error, user) {
    console.log(user);
    if (user!== null && user!==undefined) {
      $state.go('home');
    }
  });
  $scope.login = function() {
    auth.login('google');
  };
  $rootScope.elFuego=$firebase(elFuego);
});