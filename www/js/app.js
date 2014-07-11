var app = angular.module('beer', ['beer.home', 'beer.places', 'ionic']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'html/home.html'
  })
  .state('places', {
    url: '/places',
    templateUrl: 'places.html'
  });
});