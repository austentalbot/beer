var app = angular.module('beer', ['beer.home', 'beer.places', 'beer.contacts', 'ionic']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'html/home.html'
  })
  .state('places', {
    url: '/places',
    templateUrl: 'html/places.html'
  })
  .state('contacts', {
    url: '/contacts',
    templateUrl: 'html/contacts.html'
  });
});