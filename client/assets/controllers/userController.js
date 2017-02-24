var app = angular.module('app');

app.controller('userController',
  [
    '$scope',
    '$location',
    'userFactory',
    '$routeParams',
    function($scope,$location,userFactory,$routeParams){
      console.log('userController loaded');
      var self = this;
      console.log('user id is ',$routeParams._id);
      userFactory.user($routeParams._id,function(result){
        $scope.user = result.data
      })
      userFactory.getSessionUser(function(user){
        $scope.userSession = user
      })
      if(!$scope.userSession.name){
        console.log('not logged in!');
        $location.url('/')
      }
    }
  ]
);
