console.log('Post Factory');
app.factory('postFactory', ['$http', function($http) {
  var posts = [];
  var post = {};
  function PostsFactory(){
    var _this = this;
    this.index = function(callback){
      $http.get('/posts').then(function(returned_data){
        console.log(`returned data is: ${returned_data}`);
        callback(returned_data)
      })
    }
    this.post = function(id,callback){
      $http.get('/posts/'+id).then(function(returned_data){
        console.log(`returned data is: ${returned_data}`);
        callback(returned_data)
      })
    }
    this.create = function(post,user,callback){
      post.user = user
      console.log('this is post at the post factory',post);
      $http.post('/posts',post).then(function(returned_data){
        console.log(`returned data: ${returned_data}`);
        callback(returned_data)
      })
    }
    this.addComment = function(comment,post,callback){
      post.comment = comment
      console.log('addComment: got to postFactory after creating comment',comment,post);
      $http.post('/posts/addComment',post).then(function(returned_data){
        console.log(`returned data is: ${returned_data}`);
        callback(returned_data)
      })
    }
  }
  console.log(new PostsFactory());
  return new PostsFactory();
}]);
