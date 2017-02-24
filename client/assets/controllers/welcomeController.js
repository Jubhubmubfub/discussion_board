var app = angular.module('app');

app.controller('welcomeController',
  [
    '$scope',
    '$location',
    'userFactory',
    function($scope,$location,userFactory){
      console.log('welcomeController loaded');
      var self = this;
      this.create = function(){
        console.log('create clicked');
        userFactory.create($scope.user,function(user){
          console.log('user is ',user.data);
          $scope.userSession = user.data
          console.log('scope usersession is ',$scope.userSession);
          $location.url('/dashboard')
        })
      }
    }
  ]
);
