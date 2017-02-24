var app = angular.module('app');

app.controller('dashboardController',
  [
    '$scope',
    'userFactory',
    'topicFactory',
    '$location',
    function($scope,userFactory,topicFactory,$location){
      console.log('dashboardController loaded');
      var self = this;
      $scope.errors = []
      $scope.categories = ['HTML','JavaScript','UI/UX']
      var getuser = function(){
        userFactory.getSessionUser(function(user){
          $scope.userSession = user
        })
      }
      getuser()
      console.log('scope is ',$scope);
      if(!$scope.userSession.name){
        console.log('not logged in!');
        $location.url('/')
      }
      else {
        console.log('You are logged in',$scope.userSession);
      }
      var index = function(){
        topicFactory.index(function(data){
          $scope.topics = data.data
          console.log($scope.topics);
        })
      }
      index()
      this.create = function(){
        $scope.errors = []
        if(!$scope.topic){
          $scope.errors.push({message:'please fill out all forms'})
          return
        }
        console.log('topic create clicked',$scope.topic);
        if (!$scope.topic.title){
          $scope.errors.push({message:'must have a title'})
        }
        if (!$scope.topic.description){
          $scope.errors.push({message:'must have a description'})
        }
        if (!$scope.topic.category){
          $scope.errors.push({message:'must have a category'})
        }
        if($scope.errors.length>0){
          return
        }
        topicFactory.create($scope.topic,$scope.userSession,function(topic){
          console.log('maybe there are errors here======',topic);
          console.log('returned topic',topic.data);
          userFactory.addTopic(topic.data,$scope.userSession,function(data){
            console.log('returned user',data.data);
            $scope.userSession = data.data
            index()
            $scope.topic = {}
          })
        })
      }
    }
  ]
);
