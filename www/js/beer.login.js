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
  var elFuego = new Firebase('https://prost.firebaseio.com/');

  var auth = new FirebaseSimpleLogin(elFuego, function(error, user) {
    if (error) {
      throw error;
    }
    console.log(user);
    if (user!== null && user!==undefined) {
      $rootScope.user=user;

      var elFuego = new Firebase('https://prost.firebaseio.com/user/'+user.id);
      $rootScope.elFuego=$firebase(elFuego);
      $state.go('home');
    }
  });
  $scope.login = function() {
    $rootScope.user=undefined;
    auth.login('google', {preferRedirect: true, rememberMe: true});
  };
});