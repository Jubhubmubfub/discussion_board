console.log('Topic Factory');
app.factory('topicFactory', ['$http', function($http) {
  var topics = [];
  var topic = {};
  function TopicsFactory(){
    var _this = this;
    this.index = function(callback){
      $http.get('/topics').then(function(returned_data){
        callback(returned_data)
      })
    }
    this.topic = function(id,callback){
      $http.get('/topics/'+id).then(function(returned_data){
        callback(returned_data)
      })
    }
    this.create = function(topic,user,callback){
      topic.user = user
      $http.post('/topics',topic).then(function(returned_data){
        callback(returned_data)
      })
    }
    this.addPost = function(topic,post,callback){
      console.log('in topicfactory, this is topic and post: ',topic,post);
      topic.post = post
      $http.post('/topics/addPost',topic).then(function(returned_data){
        callback(returned_data)
      })

    }
  }
  console.log(new TopicsFactory());
  return new TopicsFactory();
}]);
