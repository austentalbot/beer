angular.module('beer.bar', [])
.service('Bar', function () {
  return {
    selected: 'test',
    getProperty: function () {
      return this.selected;
    },
    setProperty: function(value) {
      this.selected = value;
    }
  };
});

angular.module('beer.places', ['ionic', 'beer.bar'])
.run(function($ionicPlatform, $rootScope, $state) {
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

.controller('query4sq', function($scope, Bar, $rootScope, $state, $http) {

  $scope.checkLogin = function () {
    console.log($rootScope.user);
    if ($rootScope.user===undefined) {
      console.log('going to login');
      $state.go('login');
    }  
  };

  var auth;
  $.getJSON("./js/auth.json", function( data ) {
    auth=data;
  });    

  $scope.Bar=Bar;

  //check for 4sq results to load and stop checking after they display
  $scope.loadResults = function () {   
    var count=0;
    var loadNearby=setInterval(function() {
      //if 2 seconds pass and still no results, check again
      if (count===4) {
        $scope.getLocalBusinesses();
        count=0;
      }
      count++;
      $scope.nearby=$rootScope.nearby;
      $scope.$digest();
      if ($scope.nearby!==undefined) {
        clearInterval(loadNearby);
      }
    }, 500);
  };

  $scope.findDirection = function (lat2, lng2) {
    var lat1 = $rootScope.coords.latitude;
    var lng1 = $rootScope.coords.longitude;

    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    var dLng = (lng2-lng1) * Math.PI / 180;
    var y = Math.sin(dLng) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    var bearing = Math.atan2(y, x) * 180 / Math.PI;
    if (bearing < 0){
      bearing = bearing + 360;
    }

    var bearings = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"];

    var index = bearing - 22.5;
    if (index < 0) {
      index += 360;  
    }

    index = parseInt(index / 45);

    return(bearings[index]);
  };

  $scope.getLocalBusinesses = function() {
    //get location first
    navigator.geolocation.getCurrentPosition(function(data) {
      var coords=data.coords;
      $rootScope.coords=coords;
      var latlng=(coords.latitude).toFixed(5)+','+(coords.longitude).toFixed(5);

      parameters = {
        'section': 'drinks',
        'll': latlng,
        'limit': 30,
        'radius': 4000,
        'intent': 'browse',
        'client_id': auth.FsqClientId,
        'client_secret': auth.FsqClientSecret,
        'v': '20140701'
      };

      $http.get('https://api.foursquare.com/v2/venues/explore', {params: parameters}).success(function(data) {
        console.log(data.response);
        console.log(data.response.groups[0].items);
        $rootScope.nearby=data.response.groups[0].items;

      }); 
      
    });
  };

})


.controller('queryYelp', function($scope, Bar, $rootScope, $state) {

  $scope.checkLogin = function () {
    console.log($rootScope.user);
    if ($rootScope.user===undefined) {
      console.log('going to login');
      $state.go('login');
    }  
  };

  var auth;
  $.getJSON("./js/auth.json", function( data ) {
    auth=data;
  });    


  $scope.Bar=Bar;

  //check for yelp results to load and stop checking after they display
  var loadNearby=setInterval(function() {
    $scope.nearby=$rootScope.nearby;
    $scope.$digest()
    if ($scope.nearby!==undefined) {
      clearInterval(loadNearby);
    }
  }, 1000);

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
      // parameters.push(['limit', 10]);
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
          console.log(data);
          $rootScope.nearby=data.businesses;
        }
      });
    });
  };
});







