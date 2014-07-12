var app = angular.module('beer', ['beer.home', 'beer.places', 'beer.contacts', 'beer.login', 'ionic', 'firebase']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'html/home.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'html/login.html'
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

