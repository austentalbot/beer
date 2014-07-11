angular.module('beer.places', ['ionic'])
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

.controller('queryYelp', function($scope, $http) {
  var auth;
  $.getJSON("./js/auth.json", function( data ) {
    auth=data;
  });

  $scope.getLocalBusinesses = function() {
    //get location first
    navigator.geolocation.getCurrentPosition(function(data) {
      var coords=data.coords;
      var latlng=(coords.latitude).toFixed(5)+','+(coords.longitude).toFixed(5);

      var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
      };
      parameters = [];
      parameters.push(['term', 'beer']);
      parameters.push(['ll', latlng]);
      parameters.push(['sort', 1]);
      parameters.push(['distance', 500]);
      parameters.push(['callback', 'cb']);
      parameters.push(['oauth_consumer_key', auth.consumerKey]);
      parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
      parameters.push(['oauth_token', auth.accessToken]);
      parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

      var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
      };

      OAuth.setTimestampAndNonce(message);
      OAuth.SignatureMethod.sign(message, accessor);

      var parameterMap = OAuth.getParameterMap(message.parameters);
      console.log(parameterMap);

      $.ajax({
        'url': message.action,
        'data': parameterMap,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': function(data, textStats, XMLHttpRequest) {
          // console.log(data);
          $scope.nearby = data.businesses;
          $scope.$apply();
        }
      });
    });
  };
});








