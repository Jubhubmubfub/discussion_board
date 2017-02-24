console.log('Comment Factory');
app.factory('commentFactory', ['$http', function($http) {
  var comments = [];
  var comment = {};
  function CommentsFactory(){
    var _this = this;
    this.index = function(callback){
      $http.get('/comments').then(function(returned_data){
        console.log(`returned data is: ${returned_data}`);
        callback(returned_data)
      })
    }
    this.comment = function(id,callback){
      $http.get('/comments/'+id).then(function(returned_data){
        console.log(`returned data is: ${returned_data}`);
        callback(returned_data)
      })
    }
    this.create = function(comment,callback){
      console.log('about to go to the routes/server with comment',comment);
      $http.post('/comments',comment).then(function(comment_data){
        console.log(`returned data: ${comment_data}`);
        callback(comment_data)
      })
    }
  }
  console.log(new CommentsFactory());
  return new CommentsFactory();
}]);
