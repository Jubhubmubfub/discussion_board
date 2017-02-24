var path = require('path');
var users = require('./../controllers/users.js');
var topics = require('./../controllers/topics.js');
var posts = require('./../controllers/posts.js');
var comments = require('./../controllers/comments.js');

module.exports = function(app){
  app.post('/users', users.create);
  app.post('/users/addTopic', users.addTopic);
  app.post('/topics', topics.create);
  app.post('/topics/addPost', topics.addPost);
  app.post('/users/addPost', users.addPost);
  app.post('/posts', posts.create);
  app.post('/posts/addComment', posts.addComment);
  app.post('/users/addComment', users.addComment);
  app.post('/comments', comments.create);
  app.get('/topics',topics.index)
  app.get('/posts',posts.index)
  app.get('/users/:id',users.user)
  app.get('/topics/:id',topics.topic)
};
