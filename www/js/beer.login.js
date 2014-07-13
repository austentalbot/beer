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

  var auth = new FirebaseSimpleLogin(elFuego, function(error, user) {
    console.log(user);
    if (user!== null && user!==undefined) {
      $rootScope.user=user;

      var elFuego = new Firebase('https://luminous-fire-8550.firebaseio.com/user/'+user.id);
      $rootScope.elFuego=$firebase(elFuego);
      $state.go('home');
    }
  });
  $scope.login = function() {
    $rootScope.user=undefined;
    auth.login('google', {preferRedirect: true, rememberMe: true});
  };
  // $rootScope.elFuego=$firebase(elFuego);
  // console.log($rootScope.elFuego);

  // $rootScope.elFuego.$add({userId: "114401772005505929091", name: "Austen Talbot", email: "austentalbot@gmail.com"});
  // console.log('added');
});