var app = angular.module('app');

app.controller('topicController',
  [
    '$scope',
    'userFactory',
    'topicFactory',
    'postFactory',
    'commentFactory',
    '$location',
    '$routeParams',
    function($scope,userFactory,topicFactory,postFactory,commentFactory,$location,$routeParams){
      console.log('topicController loaded');
      var self = this;
      userFactory.getSessionUser(function(user){
        $scope.userSession = user
      })
      $scope.comment = {};
      var topic = function(){
        console.log($routeParams._id);
        topicFactory.topic($routeParams._id,function(topic){
          $scope.topic = topic.data
          console.log('scope topic is ',$scope.topic);
        })
      }
      topic()
      if(!$scope.userSession.name){
        console.log('not logged in!');
        $location.url('/')
      }
      //creates a post
      this.create = function(){
        console.log('post create clicked',$scope.post,$scope.userSession);
        postFactory.create($scope.post,$scope.userSession,function(post){
          console.log('data returned from a post create',post.data);
          topicFactory.addPost($scope.topic,post.data,function(topic_data){
            console.log('data returned from a topic update',topic_data.data);
            console.log('topic data id is ',topic_data.data._id);
          })
          userFactory.addPost(post.data,$scope.userSession,function(user_data){
            console.log('returned from userFactory with user_data',user_data.data);
            $scope.userSession = user_data.data
            console.log('usersession is now ',$scope.userSession);
            topic()
            $scope.post = {}
          })
        })
      }
      //creates a comment
      this.createComment = function(post){
        var comment = {}
        comment.text = $scope.comment[post._id]
        comment.user = $scope.userSession
        commentFactory.create(comment,function(comment_data){
          console.log('returned to TC.controller');
          console.log(comment_data.data);
          postFactory.addComment(comment_data.data,post,function(post_data){
            console.log('returned to TC.controller from postFactory',post_data);
          })
          userFactory.addComment(comment_data.data,$scope.userSession,function(user_data){
            console.log('returned to TC.controller from userFactory',user_data);
            $scope.userSession = user_data.data
            topic()
            $scope.comment[post._id] = {}
            console.log('scope topic is now ',$scope.topic);
            console.log('scope userSession is now ',$scope.userSession);
          })
        })
      }
    }
  ]
);
