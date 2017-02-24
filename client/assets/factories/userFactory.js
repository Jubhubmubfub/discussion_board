console.log('User Factory');
app.factory('userFactory', ['$http', function($http) {
  var users = [];
  var user = {};
  var userSession = {}
  function UsersFactory(){
    var _this = this;
    this.create = function(user,callback){
      $http.post('/users',user).then(function(returned_data){
        userSession = returned_data.data
        callback(returned_data)
      })
    }
    this.user = function(userId,callback){
      console.log('userID is ',userId);
      $http.get(`/users/${userId}`).then(function(returned_data){
        callback(returned_data)
      })
    }
    this.getSessionUser = function(callback){
      console.log('this is getSessionUser',userSession);
      callback(userSession)
    }
    this.addTopic = function(topic,user,callback){
      user.topic = topic
      console.log('this is addTopic',user);
      $http.post(`/users/addTopic`,user).then(function(returned_data){
        userSession=returned_data.data
        callback(returned_data)
      })
    }
    this.addPost = function(post,user,callback){
      console.log('this is addPost in userFactory',post,user);
      user.post = post
      $http.post('/users/addPost',user).then(function(returned_data){
        userSession=returned_data.data
        callback(returned_data)
      })
    }
    this.addComment = function(comment,user,callback){
      console.log('this is addComment',comment);
      user.comment = comment
      $http.post(`/users/addComment`,user).then(function(returned_data){
        console.log('returned to the userFactory from the server with user',returned_data);
        userSession=returned_data.data
        callback(returned_data)
      })
    }
  }
  console.log(new UsersFactory());
  return new UsersFactory();
}]);
