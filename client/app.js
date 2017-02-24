var app = angular.module('app', ['ngRoute','angularMoment']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: 'partials/welcome.html',
      controller: 'welcomeController',
      controllerAs:'WC'
    })
    .when('/dashboard',{
      templateUrl: 'partials/dashboard.html',
      controller: 'dashboardController',
      controllerAs:'DC'
    })
    .when('/topic/:_id',{
      templateUrl: 'partials/topic.html',
      controller: 'topicController',
      controllerAs:'TC'
    })
    .when('/user/:_id',{
      templateUrl: 'partials/user.html',
      controller: 'userController',
      controllerAs:'UC',
    })
    .otherwise('/')
  }
);
